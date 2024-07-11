export const storage = {
  get(key) {
    let value;

    try {
      value = localStorage.getItem(key);
    } catch {
      return false;
    }

    if (typeof value === 'string') {
      try {
        value = JSON.parse(value);
      } catch {
        storage.remove(key);
        return false;
      }
    }

    return value;
  },

  set(key, value) {
    const stringifiedValue = JSON.stringify(value);

    try {
      localStorage.setItem(key, stringifiedValue);
    } catch (error) {
      if (error instanceof Error && /quota/i.test(error.name)) {
        localStorage.clear();
      }
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch {
      /* Silent */
    }
  },

  clear() {
    localStorage.clear();
  },
};
