<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
-- psql --u js_test --password

--   sudo service postgresql restart



<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
INSERT INTO "department" (id, name)
VALUES ('ab6e5194-3744-48d6-b6cc-bc6ad2ffc66c', 
'department1');

INSERT INTO "user" (id, email, role, password, departmentid)
VALUES ('821faf2c-6aaf-4fd8-8aa6-0226d913b959', 
'admin@admin.admin', 'ROLE_ADMIN', 
'$2a$12$2MI1v6vB5oCG4POYZektCeiZTzSFcFlOkxmur3Ly1Y/KSuX2yfF5O',
'ab6e5194-3744-48d6-b6cc-bc6ad2ffc66c');



-- create TABLE "department" (
--     id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
--     name VARCHAR(100)
-- );

-- create TABLE employee(
--     id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
--     name VARCHAR(100),
--     salary INTEGER
-- );

-- CREATE TABLE logs(
--   level character varying,
--   message character varying,
--   meta json,
--   timestamp timestamp without time zone DEFAULT now()
-- );

-- create table column
ALTER TABLE "employee"
ADD COLUMN departmentid uuid;

-- create table column VALUE
ALTER TABLE "employee" 
ADD CONSTRAINT fk_departmentid FOREIGN KEY (departmentid) REFERENCES "department" (id);

-- CREATE TABLE department (
--   id int NOT NULL SERIAL PRIMARY KEY,
--   name varchar(50) NOT NULL,
--   PRIMARY KEY (id),
--   UNIQUE KEY name_UNIQUE (name)
-- )
-- CREATE TABLE employee (
--   id int NOT NULL SERIAL PRIMARY KEY,
--   birthday date NOT NULL,
--   email varchar(50) NOT NULL,
--   salary int NOT NULL,
--   department_id int DEFAULT NULL,
--   name varchar(50) NOT NULL,
--   PRIMARY KEY (id),
--   UNIQUE KEY email_UNIQUE (email),
--   KEY fk_employee_1_idx (department_id),
--   CONSTRAINT fk_employee_1 FOREIGN KEY (department_id) REFERENCES department (id) ON DELETE SET NULL ON UPDATE CASCADE
-- )





-- .env

-- PORT=3000
-- HOST=localhost
-- SERVER_PORT=3000

-- JWT_KEY='secret_key'

-- DB_HOST='localhost'
-- DB_PORT=5432
-- DB_USER='js_test'
-- DB_PASSWORD='qwerty'
-- DB_DATABASE='js_test'