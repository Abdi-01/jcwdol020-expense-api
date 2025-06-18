import { Request, Response } from "express";
import { IExpense } from "../types/expense.type";
import poolDB from "../config/db";

export const getData = async (req: Request, res: Response) => {
  try {
    const sqlScript: string =
      "select e.*, c.category_name, c.type from expense e join categories c on e.categoryid = c.id;";
    const data = await poolDB.query(sqlScript);
    console.log(data);

    res.status(200).send(data.rows);
  } catch (error: any) {
    console.log(error);
    res.status(error.rc || 500).send(error);
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const sqlScript: string = `select e.*, c.category_name, c.type from expense e join categories c on e.categoryid = c.id where e.id=$1 ;`;
    console.log(sqlScript);
    const data = await poolDB.query(sqlScript, [req.params.id]);
    console.log(data.rowCount);

    if (!data.rowCount) {
      throw { rc: 404, message: "Data is not exist" };
    }
    res.status(200).send(data.rows[0]);
  } catch (error: any) {
    console.log(error);
    res.status(error.rc || 500).send(error);
  }
};

export const addData = async (req: Request, res: Response) => {
  try {
    // const sqlScript: string = "insert into expense (title, nominal, date, categoryid) values ($1, $2, $3, $4);";
    const sqlScript: string = `insert into expense (${Object.keys(
      req.body
    ).join()}) values ($1, $2, $3, $4) RETURNING *;`;
    console.log(sqlScript);
    const data = await poolDB.query(sqlScript, Object.values(req.body));

    res.status(201).send({
      success: true,
      message: "Tambah data berhasil",
      result: data.rows[0],
    });
  } catch (error: any) {
    console.log(error);
    res.status(error.rc || 500).send(error);
  }
};

export const updateData = async (req: Request, res: Response) => {
  try {
    const sqlScript: string = `update expense set title=$1, nominal=$2, date=$3, categoryid=$4 where id=$5 RETURNING *;`;
    const data = await poolDB.query(sqlScript, [
      ...Object.values(req.body),
      req.params.id,
    ]);

    res.status(200).send({
      success: true,
      message: "Pembaruan data berhasil",
      result: data.rows[0],
    });
  } catch (error: any) {
    console.log(error);
    res.status(error.rc || 500).send(error);
  }
};

export const deleteData = async (req: Request, res: Response) => {
  try {
    const sqlScript: string = `delete from expense where id=$1;`;
    await poolDB.query(sqlScript, [req.params.id]);

    res.status(200).send({
      success: true,
      message: "Hapus data berhasil",
    });
  } catch (error: any) {
    console.log(error);
    res.status(error.rc || 500).send(error);
  }
};

export const getByCategory = (req: Request, res: Response) => {};

export const getByDate = (req: Request, res: Response) => {};
