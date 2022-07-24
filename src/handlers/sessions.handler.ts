import SessionsModle from "../models/sessions.modle";
import { Request, Response } from "express";
import Session from "../types/sessions.type";

const sessionsModle = new SessionsModle();

export const create = async (req: Request, res: Response) => {
  try {
    const session = await sessionsModle.create(req.body);
    res.json(session);
  } catch (error) {
    console.log(error);
  }
};

export const index = async (req: Request, res: Response) => {
  try {
    const sessions = await sessionsModle.index();
    let arr: Session[] = [];
    for (let i = 0; i < sessions.length; i++) {
      const students = await sessionsModle.addStudentsInSession(sessions[i].id);
      arr.push({
        ...sessions[i],
        students: students,
      });
    }
    res.json(arr);
  } catch (error) {
    console.log(error);
  }
};
// show session with products
export const show = async (req: Request, res: Response) => {
  try {
    const session = await sessionsModle.show(
      req.params.id as unknown as number
    );
    const students = await sessionsModle.addStudentsInSession(session.id);
    res.json({
      ...session,
      students: students,
    });
  } catch (error) {
    console.log(error);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const session = await sessionsModle.update(req.body);
    res.json(session);
  } catch (error) {
    console.log(error);
  }
};

export const deletee = async (req: Request, res: Response) => {
  try {
    const session = await sessionsModle.delete(
      req.params.id as unknown as number
    );
    res.json(session);
  } catch (error) {
    console.log(error);
  }
};

export const addStudent = async (req: Request, res: Response) => {
  try {
    const ss = await sessionsModle.addStudent(req.body);
    res.json(ss);
  } catch (error) {
    console.log(error);
  }
};

export const deleteStudentFromSession = async (req: Request, res: Response) => {
  try {
    const { Student_id, Session_id } = req.body;
    const ss = await sessionsModle.deleteStudentFromSession(
      Student_id as unknown as number,
      Session_id as unknown as number
    );
    res.json(ss);
  } catch (error) {
    console.log(error);
  }
};
