FROM node

ENV DATA_BASE=webDev
ENV USER_NAME=root
ENV PASSWORD=1234
ENV PORT=3306

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 80

CMD ["npm", "start"]
