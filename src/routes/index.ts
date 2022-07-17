import { Router, Request, Response } from "express";
import session_leads from "./api/session-leads.routes";
import sessions from "./api/sessions.routes";
import studemts_sessions from "./api/studemts_sessions.routes";
import students from "./api/students.routes";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  res.json({
    message: "hello, from api",
  });
});

routes.use("/students", students);
routes.use("/studemts_sessions", studemts_sessions);
routes.use("/sessions", sessions);
routes.use("/session_leads", session_leads);

export default routes;
