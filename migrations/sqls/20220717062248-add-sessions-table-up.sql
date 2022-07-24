CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  session_lead_id INTEGER REFERENCES session_leads(id) NOT NULL
);