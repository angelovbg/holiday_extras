#!/bin/bash
postgres_password=$1;

PGPASSWORD=$postgres_password psql -U postgres -c "DROP DATABASE \"holiday_extras\";"
PGPASSWORD=$postgres_password psql -U postgres -c "DROP ROLE test_user;"

PGPASSWORD=$postgres_password psql -U postgres -c "CREATE ROLE test_user PASSWORD 'password' LOGIN NOSUPERUSER INHERIT CREATEDB;"
PGPASSWORD=$postgres_password psql -U postgres -c "CREATE DATABASE \"holiday_extras\" WITH OWNER = test_user ENCODING = 'UTF8' CONNECTION LIMIT = -1;"
