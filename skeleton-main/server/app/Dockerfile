FROM node

ENV DATA_BASE=webDev
ENV USER_NAME=root
ENV PASSWORD=1234
ENV PORT=3306
ENV HOST=server-mysql

WORKDIR /app

COPY . /app
COPY ./wait-for-it.sh ./wait-for-it.sh

RUN npm install

RUN chmod +x wait-for-it.sh

EXPOSE 8001
