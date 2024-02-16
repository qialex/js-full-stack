

-- DROP TABLE IF EXISTS postgres;

-- CREATE DATABASE postgres
--     WITH
--     OWNER = postgres
--     ENCODING = 'UTF8'
--     LC_COLLATE = 'en_US.utf8'
--     LC_CTYPE = 'en_US.utf8'
--     TABLESPACE = pg_default
--     CONNECTION LIMIT = -1;

\connect postgres;

DROP TABLE IF EXISTS "user";

CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(1024) NOT NULL DEFAULT '',
  salt VARCHAR(1024) NOT NULL DEFAULT '',
  is_email_confirmed INT NOT NULL DEFAULT 0,
  ts_created TIMESTAMP DEFAULT NOW()
);

-- DROP TABLE IF EXISTS user_email_confirmations;

-- CREATE TABLE user_email_confirmations (
--   id SERIAL PRIMARY KEY,
--   user_id INT NOT NULL,
--   ts_created INT(15) NOT NULL,
--   ts_valid INT(15) NOT NULL,
--   token VARCHAR(255) NOT NULL,
--   is_already_used INT(1) NOT NULL,
-- );


