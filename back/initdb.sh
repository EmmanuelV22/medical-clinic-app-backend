#!/bin/bash

export PGPASSWORD=RCmrwQF2IikvtSEdoNoSRW1Y3kxXWrC0 
psql -h dpg-cn5nki8l5elc73e828mg-a.oregon-postgres.render.com -U postgres_bei4_user postgres_bei4 \
    -c "CREATE SCHEMA clinic;"
psql -h dpg-cn5nki8l5elc73e828mg-a.oregon-postgres.render.com -U postgres_bei4_user postgres_bei4 < scripts/tables.sql

sh runServer.sh

