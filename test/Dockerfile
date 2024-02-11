#<<<<<<<<<<Start: PHP-FPM Image Target>>>>>>>>>>#
FROM php:8.2-fpm-alpine as php

RUN apk update
RUN apk add curl

# Installing and enabling required PHP extension

# amqp
RUN apk --no-cache add pcre-dev ${PHPIZE_DEPS} && \
    apk add rabbitmq-c-dev \
    && pecl install amqp \
    && docker-php-ext-enable amqp

# yaml
RUN apk add --update yaml-dev \
    && apk add --no-cache --virtual .build-deps g++ make autoconf \
    && pecl channel-update pecl.php.net \
    && pecl install yaml && docker-php-ext-enable yaml

# pgsql
# pgsql
RUN apk add libpq-dev && \
    docker-php-ext-install pdo pdo_pgsql && \
    docker-php-ext-enable pdo_pgsql

# zip
RUN apk add libzip-dev && apk add zip && \
    docker-php-ext-install zip

# Installing Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN mkdir /srv/app/

RUN apk upgrade --update \
    && apk add -U tzdata \
    && cp /usr/share/zoneinfo/Europe/Paris /etc/localtime \
    && apk del tzdata \
    && rm -rf \
    /var/cache/apk/*

COPY ./.docker/php/conf.d/custom.ini /usr/local/etc/php/conf.d/custom.ini

WORKDIR /srv/app/

#USER prod

COPY ./composer.json ./composer.lock* /srv/app/
COPY ./symfony.lock /srv/app/

RUN composer install --no-dev --no-scripts

COPY . /srv/app/

RUN chown -R www-data:www-data /srv/app/var && \
    chmod -R 775 /srv/app/var

RUN mkdir -p /srv/app/public/media && \
  chown -R www-data:www-data /srv/app/public/media && \
  chmod -R 755 /srv/app/public/media

RUN APP_ENV=prod composer run auto-scripts

#<<<<<<<<<<End: PHP-FPM Image Target>>>>>>>>>>#

#<<<<<<<<<<Start: PHP-FPM Image For the Dev Environment Target>>>>>>>>>>#
FROM php as php_dev

# xdebug
RUN apk add --update linux-headers
RUN apk --no-cache add pcre-dev ${PHPIZE_DEPS} && \
    pecl install xdebug && \
    docker-php-ext-enable xdebug

#<<<<<<<<<<End: PHP-FPM Image For the Dev Environment Target>>>>>>>>>>#

#<<<<<<<<<<Start: Server Image Target>>>>>>>>>>#
FROM httpd:2 as server

# Copier la configuration Apache
COPY ./.docker/httpd/httpd.conf /usr/local/apache2/conf/httpd.conf

# Copier le contenu public de l'application Symfony
COPY --from=php /srv/app/public /srv/app/public

# Copier le script d'entrée et le rendre exécutable
COPY ./.docker/httpd/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Définir les variables d'environnement par défaut (ces valeurs peuvent être surchargées au démarrage du conteneur)
ARG SERVER_NAME
ARG PHP_CONTAINER_NAME

# Vous pouvez maintenant utiliser ces ARGs dans votre Dockerfile. Par exemple, définir des ENVs basées sur ces ARGs
ENV SERVER_NAME=${SERVER_NAME} \
    PHP_CONTAINER_NAME=${PHP_CONTAINER_NAME}

# Configurer le script d'entrée comme point d'entrée du conteneur
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

# Commande par défaut pour démarrer Apache
#<<<<<<<<<<End: Server Image Target>>>>>>>>>>#

