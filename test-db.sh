#!/bin/bash
postgres_password=$1;

PGPASSWORD=$postgres_password psql -U postgres -c "DROP DATABASE \"holiday_extras_test\";"
PGPASSWORD=$postgres_password psql -U postgres -c "CREATE DATABASE \"holiday_extras_test\" WITH OWNER = test_user ENCODING = 'UTF8' CONNECTION LIMIT = -1;"
npm run migrate:test