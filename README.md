# job-tracer

![image](https://user-images.githubusercontent.com/75869500/125496797-b383ccbd-588c-428f-a448-e0cfa440a5fd.png)

## LINTING MAKING YOUR COMMITS DIFFICULT?

Don't blame us, we just inherited the codebase.
If you want to commit code and don't wish to be bothered,
just add the flag '-n' after your commit command.

## CREATING YOUR DATABASE TABLES

1. Schema for your "applications" database:

CREATE TABLE applications (
\_id SERIAL PRIMARY KEY,
user_id INT NOT NULL,
company_name VARCHAR(100) NOT NULL,
job_title VARCHAR(100) NOT NULL,
salary INT,
description VARCHAR(1000),
post_source VARCHAR(200),
status_name VARCHAR(200),
notes VARCHAR(1000),
status_date DATE,
favorite BOOLEAN,
FOREIGN KEY (user_id)
REFERENCES users (\_id)
)

2. Schema for your "application history" database:

CREATE TABLE application_history (
application_id INT PRIMARY KEY NOT NULL,
applied_date DATE,
interview_date DATE,
offer_date DATE,
acceptance_date DATE,
rejected_date DATE,
dropped_date DATE,
FOREIGN KEY (application_id)
REFERENCES applications (\_id)
);

3. Schema for your "users" database:

CREATE TABLE users (
\_id SERIAL PRIMARY KEY,
login VARCHAR UNIQUE,
password VARCHAR,
authorized BOOLEAN,
authenticated BOOLEAN,
credentials VARCHAR,
key VARCHAR,
token VARCHAR
)
