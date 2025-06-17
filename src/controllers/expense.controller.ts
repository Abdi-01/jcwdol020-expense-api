import { Request, Response } from "express";
import { IExpense } from "../types/expense.type";
import poolDB from "../config/db";

export const getData = async (req: Request, res: Response) => {
    try {
        const data = await poolDB.query("select * from expense;");
        console.log(data);

        res.status(200).send(data.rows);
    } catch (error) {
        console.log(error);
    }
}

export const addData = (req: Request, res: Response) => {

}

export const getByCategory = (req: Request, res: Response) => {

}

export const getByDate = (req: Request, res: Response) => {

}