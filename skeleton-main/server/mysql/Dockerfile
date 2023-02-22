FROM mysql

ENV MYSQL_ROOT_PASSWORD=1234

COPY ./initDb /docker-entrypoint-initdb.d/

EXPOSE 3306

CMD ["mysqld"]
