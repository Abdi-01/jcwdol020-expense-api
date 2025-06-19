import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const getData = async (req: Request, res: Response) => {
  try {
    const filterData: any = {};
    if (req.query.categoryId) {
      filterData.categoryId = parseInt(req.query.categoryId as string);
    }
    if (req.query.title) {
      filterData.title = req.query.title;
    }
    const expense = await prisma.expense.findMany({
      where: filterData,
      include: {
        Categories: {
          omit: {
            id: true,
          },
        },
      },
    });

    res.status(200).send(expense);
  } catch (error: any) {
    console.log(error);
    res.status(error.rc || 500).send(error);
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const expense = await prisma.expense.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        Categories: { omit: { id: true } },
      },
    });

    if (!expense) {
      throw { rc: 404, message: "Data not found" };
    }
    res.status(200).send(expense);
  } catch (error: any) {
    console.log(error);
    res.status(error.rc || 500).send(error);
  }
};

export const addData = async (req: Request, res: Response) => {
  try {
    const { title, nominal, date, categoryId } = req.body;

    const expense = await prisma.expense.create({
      data: {
        title,
        nominal,
        date: new Date(date),
        categoryId,
      },
    });
    console.log(expense);

    res.status(201).send({
      success: true,
      message: "Add data success",
    });
  } catch (error: any) {
    console.log(error);
    res.status(error.rc || 500).send(error);
  }
};

export const updateData = async (req: Request, res: Response) => {
  try {
    const { title, nominal, date, categoryId } = req.body;

    const expense = await prisma.expense.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        title,
        nominal,
        date: new Date(date),
        categoryId,
      },
    });
    console.log(expense);

    res.status(201).send({
      success: true,
      message: "Update data success",
      result: expense,
    });
  } catch (error: any) {
    console.log(error);
    res.status(error.rc || 500).send(error);
  }
};

export const deleteData = async (req: Request, res: Response) => {
  try {
    await prisma.expense.delete({
      where: { id: parseInt(req.params.id) },
    });

    res.status(200).send({
      success: true,
      message: "Delete success",
    });
  } catch (error: any) {
    console.log(error);
    res.status(error.rc || 500).send(error);
  }
};

export const getTotalByCategory = async (req: Request, res: Response) => {
  try {
    const result = await prisma.expense.aggregate({
      _sum: {
        nominal: true,
      },
      where: {
        categoryId: parseInt(req.params.categoryId),
      },
    });

    res.status(200).send({
      categoryId: req.params.categoryId,
      total: result._sum.nominal,
    });
  } catch (error: any) {
    console.log(error);
    res.status(error.rc || 500).send(error);
  }
};

export const getByDate = (req: Request, res: Response) => {};
