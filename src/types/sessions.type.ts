import Students from "./students.type"

type Session = {
  id: number;
  title: string;
  session_lead_id: number;
  students: Students[];
};

export default Session;
