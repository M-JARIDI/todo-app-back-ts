import express, { Application, Response, Request, NextFunction } from "express";
export const app: Application = express();

import fs from "fs";
import jsonReader from "./utils/utils";

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  jsonReader("./src/utils/data.json", (err: any, data: any) => {
    if (err) return res.status(500).json({ message: err });

    return res.status(200).json(data);
  });
});

app.post("/", (req: Request, res: Response) => {
  const todo: any = req.body.todo;
  jsonReader("./src/utils/data.json", (err: any, data: any) => {
    if (err) return res.status(500).json({ message: err });

    data.push(todo);
    fs.writeFile(
      "./src/utils/data.json",
      JSON.stringify(data, null, 2),
      (err) => {
        if (err) return res.status(500).json({ message: err });
      }
    );
  });
  res.status(200).json(todo);
});

app.delete("/:todo_id", (req: Request, res: Response) => {
  const todo_id: any = req.params.todo_id;
  jsonReader("./src/utils/data.json", (err: any, data: any) => {
    if (err) return res.status(500).json({ message: err });
    const newData = data.filter((item: any, index: number) => {
      return index != todo_id;
    });
    fs.writeFile(
      "./src/utils/data.json",
      JSON.stringify(newData, null, 2),
      (err) => {
        if (err) return res.status(500).json({ message: err });
      }
    );
  });
  res.status(200).json({ message: `todo deleted successfully` });
});

//delete all tasks
app.delete("/", (req: Request, res: Response) => {
 
  jsonReader("./src/utils/data.json", (err: any, data: any) => {
    if (err) return res.status(500).json({ message: err });
    data.splice(0, data.length);
    fs.writeFile(
      "./src/utils/data.json",
      JSON.stringify([], null, 2),
      (err) => {
        if (err) return res.status(500).json({ message: err });
      }
    );
  });
  res.status(200).json({ message: `all tasks are deleted succesfully` });
});
