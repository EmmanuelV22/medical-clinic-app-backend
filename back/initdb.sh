#!/bin/bash

export PGPASSWORD=RCmrwQF2IikvtSEdoNoSRW1Y3kxXWrC0 
psql -U postgres_bei4_user -d postgres_bei4 -h dpg-cn5nki8l5elc73e828mg-a.oregon-postgres.render.com -p 5432 \
    -c "CREATE SCHEMA clinic;"
psql -h dpg-cn5nki8l5elc73e828mg-a.oregon-postgres.render.com -U postgres_bei4_user -p 5432 < scripts/tables.sql

sh runServer.sh

