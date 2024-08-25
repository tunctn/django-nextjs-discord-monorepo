#!/bin/sh
# https://github.com/testdrivenio/django-on-docker/blob/main/app/entrypoint.prod.sh

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

exec "$@"
