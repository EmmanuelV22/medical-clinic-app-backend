#!/bin/bash

export PGPASSWORD=1a2b3c
psql -U postgres -d postgres -h localhost -p 5432 \
    -c "CREATE SCHEMA clinic;"
psql -U postgres -d postgres -h localhost -p 5432 < scripts/tables.sql

cd back
sh runServer.sh

