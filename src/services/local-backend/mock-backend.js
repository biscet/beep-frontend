import { v4 as uuidv4 } from 'uuid';
import { storage } from 'src/lib/storage';
import { DEFAULT_RESEND_CODE } from 'src/dict/fields/models/user';
import { TOKENS } from 'src/dict/config';
import { crossPagination } from 'src/dict/pagination';
import { PRICE_INFO_FIELDS, PRICES_NAMES_FIELDS } from 'src/dict/fields/models/payment';
import {
  BACKEND_PROJECT_STATUS_FIELDS,
  CHUNK_UPLOAD_FIELDS,
  COMPLETE_UPLOAD_CHUNKS_FIELDS,
  GET_PROJECT_FILE_FIELDS,
  PROJECT_FIELDS,
  PROJECT_FILE_FIELDS,
  TYPES_FIELDS,
  VALIDATE_UNPLOAD_FIELDS,
} from 'src/dict/fields/models/projects';
import {
  STORE_NAMES, addRecord, getAllByIndex, getByIndex, getRecord, putRecord,
} from './database';

const { ACCESS } = TOKENS;

const PRICE_TABLE = [
  {
    [PRICE_INFO_FIELDS.SYSTEM_NAME]: PRICES_NAMES_FIELDS.TEN,
    [PRICE_INFO_FIELDS.QUANTITY]: 10,
    [PRICE_INFO_FIELDS.PRICE]: 99,
    [PRICE_INFO_FIELDS.TITLE]: 'Немного минут',
    [PRICE_INFO_FIELDS.BODY]: 'Подойдет для коротких видео',
    [PRICE_INFO_FIELDS.ID]: 'mock-ten',
  },
  {
    [PRICE_INFO_FIELDS.SYSTEM_NAME]: PRICES_NAMES_FIELDS.SIXTY,
    [PRICE_INFO_FIELDS.QUANTITY]: 60,
    [PRICE_INFO_FIELDS.PRICE]: 399,
    [PRICE_INFO_FIELDS.TITLE]: 'Продлевать будете?',
    [PRICE_INFO_FIELDS.BODY]: 'Забипать подкаст',
    [PRICE_INFO_FIELDS.ID]: 'mock-sixty',
  },
  {
    [PRICE_INFO_FIELDS.SYSTEM_NAME]: PRICES_NAMES_FIELDS.HUNDRED,
    [PRICE_INFO_FIELDS.QUANTITY]: 100,
    [PRICE_INFO_FIELDS.PRICE]: 699,
    [PRICE_INFO_FIELDS.TITLE]: 'Солидный пак минут',
    [PRICE_INFO_FIELDS.BODY]: 'Для хорошего домашнего видео',
    [PRICE_INFO_FIELDS.ID]: 'mock-hundred',
  },
];

const DEFAULT_USER_BALANCE = 220;

class MockBackendError extends Error {
  constructor(msg, extra = {}) {
    super(msg);
    this.name = 'MockBackendError';
    this.response = { data: { msg, ...extra } };
  }
}

const normalizeEmail = (email) => (email || '').trim().toLowerCase();

const createToken = (kind, userId) => `mock_${kind}_${userId}_${uuidv4()}`;

const mapProjectType = (payloadType) => (payloadType?.includes('mp3') ? TYPES_FIELDS.AUDIO : TYPES_FIELDS.VIDEO);

const mapFileType = (payloadType) => (payloadType?.includes('mp3') ? 'audio' : 'video');

const generatePeaks = (duration, length = 180) => Array.from({ length }, (_, index) => {
  const coeff = Math.abs(Math.sin((index + 1) / (length / 2)));
  const randomFactor = Math.random() * 0.4;
  return Math.min(1, coeff * (0.5 + randomFactor));
});

const generateTimestamps = (duration) => {
  const totalMs = Math.max(1, Math.round(duration * 1000));
  const baseSegments = Math.floor(duration / 12);
  const segments = Math.min(Math.max(3, baseSegments + 2), 10);
  const timestamps = [];

  for (let i = 0; i < segments; i += 1) {
    const sectionStart = Math.floor((totalMs / segments) * i);
    const jitter = Math.floor(Math.random() * 500);
    const start = Math.min(totalMs - 250, sectionStart + jitter);
    const length = Math.floor(Math.random() * 1200) + 800;
    const end = Math.min(totalMs, start + length);

    timestamps.push({
      start_time: start,
      end_time: Math.max(end, start + 200),
    });
  }

  return timestamps.sort((a, b) => a.start_time - b.start_time);
};

const formatCatalogItem = (project) => ({
  [PROJECT_FIELDS.ID]: project.id,
  [PROJECT_FIELDS.NAME]: project.name,
  [PROJECT_FIELDS.TYPE]: project.project_type,
  [PROJECT_FIELDS.STATUS]: project.status_name,
  [PROJECT_FIELDS.ESTIMATE]: project.estimate_finish,
  [PROJECT_FIELDS.PREVIEW_IMAGE]: project.thumbnail_s3_path,
  [PROJECT_FIELDS.OPERATION_ID]: project.operation_id,
});

const formatProjectDetails = (project) => ({
  [PROJECT_FIELDS.PROJECT]: ({
    [PROJECT_FIELDS.ID]: project.id,
    [PROJECT_FIELDS.NAME]: project.name,
    [PROJECT_FIELDS.TYPE]: project.project_type,
    [PROJECT_FIELDS.STATUS]: project.status_name,
    [PROJECT_FIELDS.ESTIMATE]: project.estimate_finish,
    [PROJECT_FIELDS.PREVIEW_IMAGE]: project.thumbnail_s3_path,
    [PROJECT_FIELDS.OPERATION_ID]: project.operation_id,
  }),
});

const buildHtml = (systemName) => `
  <html>
    <head><title>Покупка минут</title></head>
    <body style="font-family: sans-serif; padding: 24px;">
      <h1>Оплата пакета ${systemName}</h1>
      <p>Имитация платежного окна. Нажмите назад в приложении, чтобы вернуться.</p>
    </body>
  </html>
`;

const wait = (ms) => new Promise((resolve) => {
  const timer = setTimeout(() => {
    clearTimeout(timer);
    resolve();
  }, ms);
});

const ensureInitialUserBalance = async (user) => {
  const currentBalance = typeof user.balance === 'number' ? user.balance : 0;

  if (currentBalance > 0) {
    return currentBalance;
  }

  const updatedUser = { ...user, balance: DEFAULT_USER_BALANCE };
  await putRecord(STORE_NAMES.USERS, updatedUser);

  return DEFAULT_USER_BALANCE;
};

const sessions = new Map();

const getCurrentUserId = () => {
  const token = storage.get(ACCESS);
  if (!token || typeof token !== 'string') {
    return null;
  }

  const parts = token.split('_');
  return parts.length >= 3 ? parts[2] : null;
};

const ensureUser = () => {
  const userId = getCurrentUserId();
  if (!userId) {
    throw new MockBackendError('User is not authorized.');
  }

  return userId;
};

const formatCatalogResults = (filtered, limit, offset) => {
  const sorted = filtered.sort((a, b) => b.createdAt - a.createdAt);
  const paged = sorted.slice(offset, offset + limit);

  return {
    count: filtered.length,
    results: paged.map((project) => formatCatalogItem(project)),
  };
};

export const localBackend = {
  async registerUser({ email, username, password }) {
    const normalizedEmail = normalizeEmail(email);
    const emailExists = await getByIndex(STORE_NAMES.USERS, 'email', normalizedEmail);
    if (emailExists) {
      throw new MockBackendError('Email already registered');
    }

    const usernameExists = await getByIndex(STORE_NAMES.USERS, 'username', username);
    if (usernameExists) {
      throw new MockBackendError('Username already registered');
    }

    const user = {
      id: uuidv4(),
      email: normalizedEmail,
      username,
      password,
      balance: DEFAULT_USER_BALANCE,
      frozen_balance: 0,
      isActive: true,
      createdAt: Date.now(),
    };

    await addRecord(STORE_NAMES.USERS, user);

    return { user };
  },

  async loginUser({ email, password }) {
    const normalizedEmail = normalizeEmail(email);
    const user = await getByIndex(STORE_NAMES.USERS, 'email', normalizedEmail);

    if (!user || user.password !== password) {
      throw new MockBackendError('Bad email or password');
    }

    if (!user.isActive) {
      throw new MockBackendError('User is not active. Please confirm your email.');
    }

    return {
      access_token: `Bearer ${createToken('access', user.id)}`,
      refresh_token: `Bearer ${createToken('refresh', user.id)}`,
    };
  },

  async getUserInfo() {
    const userId = ensureUser();
    const user = await getRecord(STORE_NAMES.USERS, userId);

    if (!user) {
      throw new MockBackendError('User not found');
    }

    const balance = await ensureInitialUserBalance(user);
    const frozenBalance = typeof user.frozen_balance === 'number' ? user.frozen_balance : 0;

    return {
      username: user.username,
      email: user.email,
      id: user.id,
      balance,
      frozen_balance: frozenBalance,
    };
  },

  async confirmUser({ email }) {
    const normalizedEmail = normalizeEmail(email);
    const user = await getByIndex(STORE_NAMES.USERS, 'email', normalizedEmail);

    if (!user) {
      throw new MockBackendError('User not found');
    }

    await putRecord(STORE_NAMES.USERS, { ...user, isActive: true });

    return { success: true };
  },

  async resendConfirmCode({ email }) {
    const normalizedEmail = normalizeEmail(email);
    const user = await getByIndex(STORE_NAMES.USERS, 'email', normalizedEmail);

    if (!user) {
      throw new MockBackendError('User not found');
    }

    return { seconds: DEFAULT_RESEND_CODE };
  },

  async createProject({ [PROJECT_FIELDS.NAME]: projectName }) {
    const ownerId = ensureUser();
    const project = {
      id: uuidv4(),
      ownerId,
      name: projectName,
      project_type: TYPES_FIELDS.VIDEO,
      status_name: BACKEND_PROJECT_STATUS_FIELDS.CREATED,
      estimate_finish: 0,
      thumbnail_s3_path: '',
      operation_id: uuidv4(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    await addRecord(STORE_NAMES.PROJECTS, project);

    return { [PROJECT_FIELDS.ID]: project.id };
  },

  async getCatalogProjects(params = {}) {
    const ownerId = ensureUser();
    const projects = await getAllByIndex(STORE_NAMES.PROJECTS, 'ownerId', ownerId);
    const searchQuery = params[PROJECT_FIELDS.NAME] || '';
    const filtered = projects.filter((project) => project.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const limit = Number(params.limit) || crossPagination;
    let offset = Number(params.offset) || 0;
    if (!offset && params.page) {
      offset = limit * (Number(params.page) - 1);
    }

    return formatCatalogResults(filtered, limit, offset);
  },

  async getProjectDetails({ [PROJECT_FIELDS.ID]: projectId }) {
    const ownerId = ensureUser();
    const project = await getRecord(STORE_NAMES.PROJECTS, projectId);

    if (!project || project.ownerId !== ownerId) {
      throw new MockBackendError('Project not found');
    }

    return formatProjectDetails(project);
  },

  async getFileDetails({ [PROJECT_FIELDS.ID]: projectId, [GET_PROJECT_FILE_FIELDS.FILE_TYPE]: fileType }) {
    const ownerId = ensureUser();
    const project = await getRecord(STORE_NAMES.PROJECTS, projectId);

    if (!project || project.ownerId !== ownerId) {
      throw new MockBackendError('Project not found');
    }

    const normalizedType = fileType === TYPES_FIELDS.FILE_AUDIO ? 'audio' : 'video';
    const files = await getAllByIndex(STORE_NAMES.FILES, 'projectId', projectId);
    const targetFile = files.find((file) => file.type === normalizedType);

    if (!targetFile) {
      throw new MockBackendError('Файл не найден');
    }

    const fileUrl = URL.createObjectURL(targetFile.blob);

    return {
      [PROJECT_FILE_FIELDS.TIMESTAMPS]: targetFile.timestamps,
      [PROJECT_FILE_FIELDS.URL]: fileUrl,
      [PROJECT_FILE_FIELDS.PEAKS]: targetFile.peaks,
    };
  },

  async validateForUpload(payload) {
    const ownerId = ensureUser();
    const project = await getRecord(STORE_NAMES.PROJECTS, payload[VALIDATE_UNPLOAD_FIELDS.PROJECT_ID]);
    if (!project || project.ownerId !== ownerId) {
      throw new MockBackendError('Project not found');
    }

    sessions.set(project.id, {
      projectId: project.id,
      duration: payload[VALIDATE_UNPLOAD_FIELDS.DURATION],
      projectType: mapProjectType(payload[VALIDATE_UNPLOAD_FIELDS.PROJECT_TYPE]),
      fileType: mapFileType(payload[VALIDATE_UNPLOAD_FIELDS.PROJECT_TYPE]),
      sessionId: uuidv4(),
      fileKey: uuidv4(),
    });

    return payload;
  },

  async uploadChunk(payload) {
    const session = sessions.get(payload[CHUNK_UPLOAD_FIELDS.PROJECT_ID]);
    if (!session) {
      throw new MockBackendError('Сессия загрузки не найдена');
    }

    return {
      [CHUNK_UPLOAD_FIELDS.USER_ID]: session.sessionId,
      [CHUNK_UPLOAD_FIELDS.ETAGS]: uuidv4(),
    };
  },

  async completeChunkUpload(payload) {
    const session = sessions.get(payload[CHUNK_UPLOAD_FIELDS.PROJECT_ID]);
    if (!session) {
      throw new MockBackendError('Сессия загрузки не найдена');
    }

    return {
      [COMPLETE_UPLOAD_CHUNKS_FIELDS.FILE_KEY]: session.fileKey,
    };
  },

  async confirmStt(payload) {
    const userId = ensureUser();
    const projectId = payload[CHUNK_UPLOAD_FIELDS.PROJECT_ID];
    const project = await getRecord(STORE_NAMES.PROJECTS, projectId);

    if (!project || project.ownerId !== userId) {
      throw new MockBackendError('Project not found');
    }

    const fileBlob = payload.file;
    const fileType = payload[CHUNK_UPLOAD_FIELDS.TYPE];
    const duration = payload[COMPLETE_UPLOAD_CHUNKS_FIELDS.DURATION] || 0;

    if (!fileBlob) {
      throw new MockBackendError('Файл не найден');
    }

    const normalizedProjectType = mapProjectType(fileType);
    const normalizedFileType = mapFileType(fileType);

    const fileRecord = {
      id: uuidv4(),
      projectId,
      type: normalizedFileType,
      blob: fileBlob,
      duration,
      timestamps: generateTimestamps(duration),
      peaks: generatePeaks(duration),
    };

    if (fileBlob) {
      fileRecord.name = fileBlob.name;
    }

    await addRecord(STORE_NAMES.FILES, fileRecord);

    const updatedProject = {
      ...project,
      project_type: normalizedProjectType,
      status_name: BACKEND_PROJECT_STATUS_FIELDS.IN_PROGRESS,
      estimate_finish: Math.max(1, Math.round(duration / 60)),
      updatedAt: Date.now(),
    };

    await putRecord(STORE_NAMES.PROJECTS, updatedProject);

    sessions.delete(projectId);

    await wait(8000);

    setTimeout(async () => {
      try {
        const finishedProject = {
          ...updatedProject,
          status_name: BACKEND_PROJECT_STATUS_FIELDS.DONE,
          estimate_finish: 0,
          updatedAt: Date.now(),
        };

        await putRecord(STORE_NAMES.PROJECTS, finishedProject);
      } catch {
        /* ignore */
      }
    }, 2500);

    return {
      [PROJECT_FIELDS.ID]: projectId,
    };
  },

  async getPaymentCards() {
    return PRICE_TABLE;
  },

  async buyPack(payload) {
    const { [PRICE_INFO_FIELDS.SYSTEM_NAME]: name, [PRICE_INFO_FIELDS.ID]: goodsId } = payload;
    return {
      goods_id: goodsId,
      html: buildHtml(name || 'пакет минут'),
    };
  },
};
