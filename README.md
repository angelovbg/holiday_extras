## Holiday Extras
**CRUD user API**

###Installation instructions
npm install

install --global typescript

*Add to environment path if needed*

*Generate .env file in project folder with content form .env.dist*

*Install postgres DataBase*

*Add Postgres to env path for example - C:\Program Files\PostgreSQL\9.6\bin*

*Create server localhost 5432 with user postgres.*

*run bash command for db and migrations with postgres password for example (bash setup-db.sh password)*

bash setup-db.sh postgres_password

*OR run from command line*

psql -U postgres -c "CREATE ROLE test_user PASSWORD 'password' LOGIN NOSUPERUSER INHERIT CREATEDB;"

psql -U postgres -c "CREATE DATABASE \"holiday_extras\" WITH OWNER = test_user ENCODING = 'UTF8' CONNECTION LIMIT = -1;"

psql -U postgres -c "CREATE DATABASE \"holiday_extras_test\" WITH OWNER = test_user ENCODING = 'UTF8' CONNECTION LIMIT = -1;"

npm run migrate

**User API accept Content-Type form urlEncoded or application/json**

Get all users

**GET - http://localhost:3000/**

Get user by id

**GET - http://localhost:3000/1**

Create user

**POST - http://localhost:3000/**

*body = { email: "", given_name: "", family_name: "" }*

delete user by id

**DELETE - http://localhost:3000/1**

update user by id

**PUT - http://localhost:3000/1**

*body = { email: "", given_name: "", family_name: "" }*

###Testing:
npm run migrate:test

**For windows**

npm run start:test:win

**For mac/linux**

npm run start:test:linux

*In other terminal run:*

npm run test