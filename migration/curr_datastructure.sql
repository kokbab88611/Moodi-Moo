                                        Table "public.mood_log"
   Column   |            Type             | Collation | Nullable |               Default                
------------+-----------------------------+-----------+----------+--------------------------------------
 log_id     | integer                     |           | not null | nextval('mood_log_id_seq'::regclass)
 user_id    | integer                     |           | not null | 
 log_date   | date                        |           | not null | CURRENT_DATE
 mood       | character varying(50)       |           |          | 
 note       | text                        |           |          | 
 created_at | timestamp without time zone |           |          | CURRENT_TIMESTAMP
 hashtags   | text[]                      |           | not null | '{}'::text[]
Indexes:
    "mood_log_pkey" PRIMARY KEY, btree (log_id)
    
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

    
//docker exec -it database-db-1 psql -U user -d moodidb


