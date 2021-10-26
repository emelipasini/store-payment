import { Request, Response } from "express";
import config from "config";
import axios from "axios";

import { Sale } from "../../../domain/sale";

import salesDB from "../../database/sales";

export async function buyProduct(req: Request, res: Response) {
    try {
        const { total, description } = req.body;

        const sale = new Sale(Number(total), description);

        await salesDB.addSale(sale);

        const headers: any = {
            "x-api-key": config.get("api-key"),
            "x-access-token": config.get("access-token"),
            "x-lang": "es",
            "Content-Type": "application/json",
            "cache-control": "no-cache",
        };
        const params = {
            ...sale,
            return_url: `${config.get("page-url")}/return`,
            webhook: `${config.get("page-url")}/webhook`,
        };

        const response: Record<string, any> = await axios.post(
            "https://api.mobbex.com/p/payment_order",
            JSON.stringify(params),
            { headers }
        );

        return res.redirect(response.data.data.url);
    } catch (error) {
        return res.status(500).json(error);
    }
}
