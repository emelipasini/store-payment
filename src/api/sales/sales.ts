import { Request, Response } from "express";

import salesDB from "../../database/sales";

export async function sales(req: Request, res: Response) {
    try {
        const sales = await salesDB.getSales();

        res.render("sales", { sales });
    } catch (error) {
        return res.status(500).json(error);
    }
}
