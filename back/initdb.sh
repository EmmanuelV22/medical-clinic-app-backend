#!/bin/bash
export PGPASSWORD=$DB_PASSWORD
PGHOST=$DB_HOST
PGUSER=$DB_USER
PGDBNAME=$DB_NAME
psql -h $PGHOST -U $PGUSER $PGDBNAME -c "CREATE SCHEMA clinic;"
psql -h $PGHOST -U $PGUSER $PGDBNAME < scripts/tables.sql
sh runServer.sh
