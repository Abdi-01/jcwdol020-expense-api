import { Request, Response } from "express";
import { readDB, writeDB } from "../config/db";
import { IExpense } from "../types/expense.type";

export const getData = (req: Request, res: Response) => {
    const data = readDB();
    res.status(200).send({
        success: true,
        result: data.expense
    });
}

export const addData = (req: Request, res: Response) => {
    const data = readDB();
    console.log(req.body);

    if (JSON.stringify(req.body) === "{}" || req.body === undefined) {
        res.status(400).send({
            success: false,
            message: "Data not exist"
        })
    } else {
        const newID = data.expense.length ? data.expense[data.expense.length - 1].id + 1 : 1;
        data.expense.push({ id: newID, ...req.body });

        writeDB(data); // menulis ulang database json

        res.status(201).send({
            success: true,
            message: "Add data success"
        })
    }
}

export const getByCategory = (req: Request, res: Response) => {
    const data = readDB();
    console.log(req.params);

    const filterData: IExpense[] = data.expense.filter((val: IExpense) => {
        return val.category === req.params.category;
    })

    res.status(200).send({
        success: true,
        result: filterData,
        total: filterData.reduce((sum: number, currentValue: IExpense) => sum + currentValue.nominal, 0)
    })
}

export const getByDate = (req: Request, res: Response) => {
    const data = readDB();

    const startDate = new Date(req.params.startDate);
    const endDate = new Date(req.params.endDate);
    const filterData: IExpense[] = data.expense.filter((val: IExpense) => {
        const valDate = new Date(val.date);
        return startDate.getTime() <= valDate.getTime() && endDate.getTime() >= valDate.getTime();
    })

    res.status(200).send({
        success: true,
        result: filterData,
        totalExpense: filterData.reduce((sum: number, currentValue: IExpense) => currentValue.type === "expense" ? sum + currentValue.nominal : sum, 0),
        totalIncome: filterData.reduce((sum: number, currentValue: IExpense) => currentValue.type === "income" ? sum + currentValue.nominal : sum, 0)
    })
}