CREATE TABLE studemts_sessions (
  id SERIAL PRIMARY KEY,
  student INTEGER REFERENCES students(id) NOT NULL,
  session_lead INTEGER REFERENCES session_leads(id) NOT NULL,
);