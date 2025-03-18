# Stage 1: Build the React app
FROM node:18 as react-build

WORKDIR /app
COPY . ./

RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && apt-get update \
    && apt-get install -y \
    libxshmfence1 \
    libxrender1 \
    libx11-xcb1 \
    libxtst6 \
    libnss3 \
    libxss1 \
    libasound2 \
    libatk1.0-0 \
    libcups2 \
    libgconf-2-4 \
    libglib2.0-0 \
    libnspr4 \
    libxrandr2 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN yarn

ARG GATEWAY_HOST
ARG SITEMAP_HOST

RUN echo "FARM_GATEWAY_HOST=$GATEWAY_HOST" >> .env
RUN echo "FARM_SITEMAP_HOST=$SITEMAP_HOST" >> .env

RUN yarn build:prod

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*
COPY --from=react-build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]