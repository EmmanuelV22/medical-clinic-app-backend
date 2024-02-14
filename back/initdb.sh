#!/bin/bash
export PGPASSWORD=$DB_PASSWORD
psql -U $DB_USER -d $DB_NAME -h $DB_HOST -p $DB_PORT \
    -c "CREATE SCHEMA IF NOT EXISTS clinic;"
psql -U $DB_USER -d $DB_NAME -h $DB_HOST -p $DB_PORT < scripts/tables.sql
sh runServer.sh