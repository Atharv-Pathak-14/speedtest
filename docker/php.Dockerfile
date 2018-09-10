FROM php:7-alpine

LABEL maintainer='Michaël "e7d" Ferrand <michael@e7d.io>'

WORKDIR /app
COPY server/php ./
COPY web/dist ./web

EXPOSE 80
CMD [ "php", "-S", "0.0.0.0:80", "server.php" ]
