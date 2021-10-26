import { Request, Response } from "express";

import { Sale } from "../../../domain/sale";

import salesDB from "../../database/sales";

export async function webhook(req: Request, res: Response) {
    try {
        const request = req.query as any;

        const reference = request.data.payment.reference;
        const status = request.data.payment.status.text;

        const sale = await salesDB.findSale(reference);

        if (!sale) {
            return res.status(404);
        }

        sale.state = status;

        await salesDB.updatePayment(sale as Sale);

        res.status(200);
    } catch (error) {
        return res.status(500).json(error);
    }
}
