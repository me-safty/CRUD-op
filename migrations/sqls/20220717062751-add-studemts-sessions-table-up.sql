CREATE TABLE studemts_sessions (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id) NOT NULL,
  session_id INTEGER REFERENCES sessions(id) NOT NULL
);