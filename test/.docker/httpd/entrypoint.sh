#!/bin/bash

# Remplacer les placeholders dans httpd.conf par des variables d'environnement
sed -i 's|${SERVER_NAME}|'${SERVER_NAME:-localhost}'|g' /usr/local/apache2/conf/httpd.conf
sed -i 's|${PHP_CONTAINER_NAME}|'${PHP_CONTAINER_NAME:-php}'|g' /usr/local/apache2/conf/httpd.conf

# Démarrer Apache en arrière-plan
exec httpd-foreground "$@"
