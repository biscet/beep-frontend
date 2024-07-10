# Front MDM 2.0 на React с использованием Yarn, Vite, Sass/Scss, Babel, PostCSS, Effector, Patronum и React Router v5

#### Основные функциональные возможности включают:

- Настройка сборки приложения с помощью Vite
- Использование React для создания интерфейса приложения
- Использование Sass/Scss для стилизации интерфейса
- Использование Babel и PostCSS для поддержки современного JavaScript и CSS
- Использование Effector и Patronum для написания бизнес логики
- Использование React Router v5 для роутинга

#### Требования к установке

- Node.js (Допустимые версии для корректной работы от 16.x.x до 17.x.x)
- Yarn

#### Установка

1. Клонируйте репозиторий с помощью команды `git clone git@gitlab.infra.7-tech.io:mdm/frontend/lkxfront.git`
2. Перейдите в папку проекта с помощью команды `cd lkxfront/`
3. Переключите git ветку на develop `git checkout develop`
4. Установите зависимости с помощью команды `yarn OR yarn install`
5. Создайте .env файл и переместите в него содержимое файла .env.example
6. В .env замените ссылку в VITE_API_URL на ссылку вашего LKX backend'а или LKX стенда. Пример: `VITE_API_URL=ССЫЛКА/api`
7. В .env замените ссылку в VITE_DEVICEETL_API_URL на ссылку вашего DeviceETL backend'а или DeviceETL стенда. Пример: `VITE_DEVICEETL_API_URL=ССЫЛКА/api`
8. Запустите приложение в development режиме командой `yarn start OR yarn run start`

#### Запуск проекта

- `yarn start` - запуск проекта в development режиме
- `yarn build` - сборка проекта в production режиме
- `yarn start:serve` - запуск собранной версии проекта на локальном сервере
- `yarn start:ssh` - открывает приложению доступ в интернет

#### Описание зависимостей ENV

- `VITE_APP_NAME` - Наименование приложения (react)
- `VITE_APP_VERSION` - Версия приложения (1)
- `VITE_API_URL` - Ссылка на LKX backend API (http://localhost:8000/api)
- `VITE_DEVICEETL_API_URL` - Ссылка на DeviceETL backend API (http://localhost:8001/api)
- `VITE_CURRENT_STAND` - Указывает на каком стенде работает frontend (dev | test | master)
- `VITE_API_SENTRY` - Ссылка на Sentry (http://localhost:8002)
- `VITE_FILE_API_URL` - Ссылка на File Uploader (http://localhost:8003/api)

#### Запуск Docker контейнера

1. Добавьте нужные Variables из .env файла в репозитории проекта `Settings -> CI/CD -> Variables (Expand) -> Add variable`
2. В .gitlab-ci.yml файле добавьте скрипт для запуска Dockerfile с аргументами из Gitlab`... --build-arg АРГУМЕНТ_ИЗ_ENV_ФАЙЛА=${АРГУМЕНТ_ИЗ_РЕПОЗИТОРИЯ} ...`

#### Пример скрипта для запуска Dockerfile

`docker build --build-arg VITE_APP_NAME=${VITE_APP_NAME} --build-arg VITE_APP_VERSION=${VITE_APP_VERSION} --build-arg VITE_API_URL=${VITE_API_URL} --build-arg VITE_DEVICEETL_API_URL=${VITE_DEVICEETL_API_URL} --build-arg VITE_CURRENT_STAND=${VITE_CURRENT_STAND} ... -t ${CI_REGISTRY_IMAGE} -f Dockerfile .`

#### Линтеры

- Eslint - для проверки синтаксиса JavaScript
- Prettier - для форматирования кода (Не обязателен)
- Stylelint - для проверки синтаксиса CSS

#### Версии используемых технологий

- Vite: 4.2.1
- React: 17.0.2
- Sass: 1.50.0
- Babel: 6.23.0
- PostCSS: 8.4.21
- Effector: 22.4.0
- Patronum: 1.10.0
- React Router 5: 5.2.0
