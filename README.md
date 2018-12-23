# Holiday Extras
CRUD user API

npm install

Install --global typescript
Add to environment path if needed

Generate .env file in project folder with content form .env.dist

Install postgres DataBase
Add Postgres to env path for example - C:\Program Files\PostgreSQL\9.6\bin

Create server localhost 5432 with user postgres
run bash command for db and migrations with postgres password for example (bash setup-db.sh password)

bash setup-db.sh postgres_password

OR run from command line

psql -U postgres -c "CREATE ROLE test_user PASSWORD 'password' LOGIN NOSUPERUSER INHERIT CREATEDB;"
psql -U postgres -c "CREATE DATABASE \"holiday_extras\" WITH OWNER = test_user ENCODING = 'UTF8' CONNECTION LIMIT = -1;"

npm run migrate