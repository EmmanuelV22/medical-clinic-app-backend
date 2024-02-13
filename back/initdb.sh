#!/bin/bash
export PGPASSWORD=$DB_PASSWORD
export PGHOST=$DB_HOST
export PGUSER=$DB_USER
psql -h $PGHOST -U $PGUSER -c "CREATE SCHEMA clinic;"
psql -h $PGHOST -U $PGUSER < scripts/tables.sql
sh runServer.sh
