                                            Table "public.users"
    Column     |            Type             | Collation | Nullable |                Default                 
---------------+-----------------------------+-----------+----------+----------------------------------------
 user_id       | integer                     |           | not null | nextval('users_user_id_seq'::regclass)
 username      | character varying(20)       |           | not null | 
 password_hash | character varying(255)      |           |          | 
 email         | character varying(100)      |           |          | 
 joined_at     | timestamp without time zone |           |          | CURRENT_TIMESTAMP
 auth_provider | character varying(20)       |           |          | 'local'::character varying
Indexes:
    "users_pkey" PRIMARY KEY, btree (user_id)
    "users_email_key" UNIQUE CONSTRAINT, btree (email)
    "users_username_key" UNIQUE CONSTRAINT, btree (username)
    
CREATE TABLE mood_log (
  log_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  log_date DATE NOT NULL DEFAULT CURRENT_DATE,
  mood VARCHAR(50),
  mood_rate INT CHECK(mood_rate BETWEEN 0 AND 10),
  note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

//docker exec -it database-db-1 psql -U user -d moodidb


