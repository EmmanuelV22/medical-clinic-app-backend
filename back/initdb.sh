#!/bin/bash

DB_USER=${DB_USER:-"postgres"}
DB_NAME=${DB_NAME:-"postgres"}
DB_HOST=${DB_HOST:-"localhost"}
DB_PORT=${DB_PORT:-5432}

export PGPASSWORD=${DB_PASSWORD:-"1a2b3c"}

psql -U "$DB_USER" -d "$DB_NAME" -h "$DB_HOST" -p "$DB_PORT" -c "CREATE SCHEMA IF NOT EXISTS clinic;"

psql -U "$DB_USER" -d "$DB_NAME" -h "$DB_HOST" -p "$DB_PORT" < scripts/tables.sql

sh runServer.sh
