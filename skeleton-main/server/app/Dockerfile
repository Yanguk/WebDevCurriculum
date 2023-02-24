FROM node

ENV DATA_BASE=webDev
ENV USER_NAME=root
ENV PASSWORD=1234
ENV PORT=3306
ENV HOST=server-mysql

WORKDIR /app

COPY ./wait-for-it.sh ./wait-for-it.sh

COPY ./package.json /app

RUN npm install

COPY . /app

RUN chmod +x wait-for-it.sh

EXPOSE 8001
