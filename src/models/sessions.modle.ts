import database from "../database";
import Students from "../types/students.type";

type Session = {
  id: number;
  title: string;
  session_lead_id: number;
  students: Students[];
};

type Studemts_sessions = {
  id: number;
  student_id: number;
  session_id: number;
};

class SessionsModle {
  //create
  async create(s: Session): Promise<Session> {
    try {
      const con = await database.connect();
      const sql =
        "INSERT INTO sessions (title, session_lead_id) VALUES ($1, $2) RETURNING id, title, session_lead_id;";
      // i put the order status active as default becasue the order is created and it can change by "update order" method
      const session = await con.query(sql, [s.title, s.session_lead_id]);
      con.release();
      return session.rows[0];
    } catch (error) {
      throw new Error(`can not create session at err :${error as Error}`);
    }
  }
  //index
  async index(): Promise<Session[]> {
    try {
      const con = await database.connect();
      const sql = "SELECT * FROM sessions;";
      const Sessions = await con.query(sql);
      con.release();
      return Sessions.rows;
    } catch (error) {
      throw new Error(`can not get all Sessions at err :${error as Error}`);
    }
  }
  //show
  async show(id: number): Promise<Session> {
    try {
      const con = await database.connect();
      const sql = "SELECT * FROM sessions WHERE id=$1;";
      const Session = await con.query(sql, [id]);
      con.release();
      return Session.rows[0];
    } catch (error) {
      throw new Error(
        `can not get Session where id is: ${id} at err :${error as Error}`
      );
    }
  }
  //update
  async update(s: Session): Promise<Session> {
    try {
      const con = await database.connect();
      const sql =
        "UPDATE sessions SET title = $1, session_lead_id = $2  WHERE id=$3 RETURNING id, title, session_lead_id;";
      const Session = await con.query(sql, [s.title, s.session_lead_id]);
      con.release();
      return Session.rows[0];
    } catch (error) {
      throw new Error(
        `can not update Session where id is: ${s.id} at err :${error as Error}`
      );
    }
  }
  //delete
  async delete(id: number): Promise<Session> {
    try {
      const con = await database.connect();
      const sql =
        "DELETE FROM sessions WHERE id=$1 RETURNING id, title, session_lead_id;";
      const Session = await con.query(sql, [id]);
      con.release();
      return Session.rows[0];
    } catch (error) {
      throw new Error(
        `can not delete Session where id is: ${id} at err :${error as Error}`
      );
    }
  }
  // add student
  async addStudent(ss: Studemts_sessions): Promise<Studemts_sessions> {
    try {
      const con = await database.connect();
      const sql =
        "INSERT INTO studemts_sessions (student_id, session_id) VALUES ($1, $2) RETURNING id, student_id, session_id;";
      const studemts_sessions = await con.query(sql, [
        ss.student_id,
        ss.session_id,
      ]);
      con.release();
      return studemts_sessions.rows[0];
    } catch (error) {
      throw new Error(
        `can not create studemts_sessions at err :${error as Error}`
      );
    }
  }
  //deleteStudentFromSession
  async deleteStudentFromSession(
    Student_id: number,
    Session_id: number
  ): Promise<Studemts_sessions> {
    try {
      const con = await database.connect();
      const sql =
        "DELETE FROM studemts_sessions WHERE student_id=$1 AND session_id=$2 RETURNING id, student_id, session_id;";
      const Studemts_sessions = await con.query(sql, [Student_id, Session_id]);
      con.release();
      return Studemts_sessions.rows[0];
    } catch (error) {
      throw new Error(
        `can not delete Studemts_sessions at err :${error as Error}`
      );
    }
  }
  // addStudentsInSession
  async addStudentsInSession(id: number): Promise<Students[]> {
    try {
      const con = await database.connect();
      const sql1 =
        "SELECT student_id FROM studemts_sessions WHERE session_id=$1;";
      const student_id = await con.query(sql1, [id]);
      const Students: Students[] = [];
      for (let i = 0; i < student_id.rows.length; i++) {
        const sql = "SELECT * FROM students WHERE id=$1;";
        const student = await con.query(sql, [student_id.rows[i].student_id]);
        Students.push({
          ...(student.rows[0] as unknown as Students),
        });
      }
      con.release();
      return Students;
    } catch (error) {
      throw new Error(
        `can not get studemts_sessions at id ${id} at err :${error as Error}`
      );
    }
  }
}

export default SessionsModle;
