FROM node:18 as react-build

WORKDIR /app
COPY . ./

# Установка зависимостей
RUN yarn

# Создание файла .env с заданными настройками
RUN echo "FARM_BACKEND_API=http://localhost:3001/api/" >> .env
RUN echo "FARM_SITEMAP_HOST=http://localhost/" >> .env

# Запуск команды для старта приложения
CMD yarn start:prod