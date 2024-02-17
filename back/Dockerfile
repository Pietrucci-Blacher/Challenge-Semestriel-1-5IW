#<<<<<<<<<<Start: PHP-FPM Image Target>>>>>>>>>>#
FROM php:8.2-fpm-alpine AS php
FROM composer/composer:2-bin AS composer_upstream

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

# https://getcomposer.org/doc/03-cli.md#composer-allow-superuser
ENV COMPOSER_ALLOW_SUPERUSER=1
ENV PATH="${PATH}:/root/.composer/vendor/bin"

COPY --from=composer_upstream --link /composer /usr/bin/composer

COPY --link composer.* symfony.* ./
RUN composer install --no-dev --no-scripts

COPY . /srv/app/

RUN mkdir -p /srv/app/var && \
    chown -R www-data:www-data /srv/app/var && \
    chmod -R 775 /srv/app/var

RUN mkdir -p /srv/app/public/media && \
  chown -R www-data:www-data /srv/app/public/media && \
  chmod -R 755 /srv/app/public/media

RUN set -eux; \
	mkdir -p var/cache var/log; \
	composer dump-autoload --classmap-authoritative --no-dev; \
	composer dump-env prod; \
	composer run-script --no-dev post-install-cmd; \
	chmod +x bin/console; sync;

#<<<<<<<<<<End: PHP-FPM Image Target>>>>>>>>>>#

#<<<<<<<<<<Start: PHP-FPM Image For the Dev Environment Target>>>>>>>>>>#
FROM php as php_dev

# xdebug
RUN apk add --update linux-headers
RUN apk --no-cache add pcre-dev ${PHPIZE_DEPS} && \
    pecl install xdebug && \
    docker-php-ext-enable xdebug

#<<<<<<<<<<End: PHP-FPM Image For the Dev Environment Target>>>>>>>>>>#

#<<<<<<<<<<Start: Nginx Image Target>>>>>>>>>>#
FROM nginx:alpine AS server

# Supprimer la configuration par défaut de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copier la configuration personnalisée de Nginx
COPY ./.docker/nginx/conf.d/app.conf /etc/nginx/conf.d/

# Copier le contenu public de l'application Symfony
COPY --from=php /srv/app/public /srv/app/public

# Définir le travailleur en tant qu'utilisateur non root pour des raisons de sécurité
RUN chown -R nginx:nginx /srv/app/public && chmod -R 755 /srv/app/public

#<<<<<<<<<<End: Nginx Image Target>>>>>>>>>>#

