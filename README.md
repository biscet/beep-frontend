# Beep Frontend

#### Требования к установке

- Node.js (Допустимые версии для корректной работы от 18.x.x до 20.x.x)
- Yarn

#### Установка

1. Клонируйте репозиторий с помощью команды `git clone git@github.com:biscet/beep-frontend.git`
2. Перейдите в папку проекта с помощью команды `cd beep-frontend/`
3. Переключите git ветку на develop `git checkout dev`
4. Установите зависимости с помощью команды `yarn OR yarn install`
5. Создайте .env файл и переместите в него содержимое файла .env.example
6. В .env замените все нужны параметры для корректного запуска приложения
7. Запустите приложение в development режиме командой `yarn start OR yarn run start`

#### Скрипты проекта

- `yarn start` - запуск проекта в development режиме
- `yarn build` - сборка проекта в production режиме
- `yarn start:serve` - запуск собранной версии проекта на локальном сервере

#### Описание зависимостей ENV

- `FARM_BACKEND_API` - Ссылка для Backend API.
- `FARM_SITEMAP_HOST` - Ссылка на домен Fronend приложения для Sitemap.

#### Линтеры

- Eslint - для проверки синтаксиса JavaScript
- Prettier - для форматирования кода (Не обязателен)
- Stylelint - для проверки синтаксиса CSS