FROM mongo

ENV MONGODB_URI mongodb://localhost/test

ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait


ADD import /bin/import

CMD /bin/import
