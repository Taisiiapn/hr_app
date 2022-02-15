create TABLE "department" (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
    name VARCHAR(100)
);

create TABLE employee(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
    name VARCHAR(100),
    salary INTEGER
);

CREATE TABLE logs(
  level character varying,
  message character varying,
  meta json,
  timestamp timestamp without time zone DEFAULT now()
);

-- create table column
ALTER TABLE "employee"
ADD COLUMN departmentid uuid;

-- create table column VALUE
ALTER TABLE "employee" 
ADD CONSTRAINT fk_departmentid FOREIGN KEY (departmentid) REFERENCES "department" (id);

CREATE TABLE department (
  id int NOT NULL SERIAL PRIMARY KEY,
  name varchar(50) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY name_UNIQUE (name)
)
CREATE TABLE employee (
  id int NOT NULL SERIAL PRIMARY KEY,
  birthday date NOT NULL,
  email varchar(50) NOT NULL,
  salary int NOT NULL,
  department_id int DEFAULT NULL,
  name varchar(50) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY email_UNIQUE (email),
  KEY fk_employee_1_idx (department_id),
  CONSTRAINT fk_employee_1 FOREIGN KEY (department_id) REFERENCES department (id) ON DELETE SET NULL ON UPDATE CASCADE
)



-- //////////////////////
SELECT 
    d.id, 
    d.name,
    e.id as e_id,
    e.name as e_name,
    e.salary as e_salary
FROM 
    department d
LEFT JOIN employee e ON e.departmentid = d.id
WHERE d.id = 'e022b0cb-c4c0-4b74-9acd-28d085929204';