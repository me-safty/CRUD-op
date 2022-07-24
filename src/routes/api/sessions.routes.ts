import express, { Router } from "express";
import * as handlers from "../../handlers/sessions.handler";

const sessions = Router();

sessions.use(express.json());

sessions.post("/", handlers.create);
sessions.get("/", handlers.index);
sessions.get("/:id", handlers.show);
sessions.put("/:id", handlers.update);
sessions.delete("/:id", handlers.deletee);
sessions.post("/addStudent", handlers.addStudent);
sessions.get("/deleteStudentFromSession", handlers.deleteStudentFromSession);

export default sessions;
