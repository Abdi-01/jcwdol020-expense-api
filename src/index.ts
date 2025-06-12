import dotenv from "dotenv";
dotenv.config();
import express, { Application, Request, Response } from "express";
// import router
import expenseRouter from "./routers/expense.router";

const PORT: string | number = process.env.PORT || 2500;

const app: Application = express();

// define main middleware
app.use(express.json());

// define routes
app.get("/", (req: Request, res: Response) => {
    res.status(200).send("<h1>Welcome to expense API</h1>");
})

app.use("/expense", expenseRouter);

app.listen(PORT, () => {
    console.log("EXPENSE API is RUNNING", PORT);
})