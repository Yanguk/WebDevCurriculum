FROM node

ENV DATA_BASE=webDev
ENV USER_NAME=root
ENV PASSWORD=1234
ENV PORT=3306
ENV HOST=server-mysql

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 8001

CMD ["npm", "start"]
