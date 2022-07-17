CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  session_lead INTEGER REFERENCES session_leads(id) NOT NULL,
);