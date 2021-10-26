import { Collection, MongoClient } from "mongodb";
import config from "config";

import { Sale } from "../../domain/sale";

let sales: Collection;

export default class salesDB {
    static async injectDB(conn: MongoClient) {
        if (sales) {
            return;
        }
        try {
            sales = conn.db(config.get("dbName")).collection("sales");
        } catch (e) {
            console.error(
                `Unable to establish collection handles in sales database: ${e}`
            );
        }
    }

    static async addSale(sale: Sale) {
        try {
            await sales.insertOne(sale);
        } catch (e) {
            console.error(`Error occurred while adding the sale, ${e}`);
            return { error: e };
        }
    }

    static async findSale(reference: string) {
        try {
            return await sales.findOne({ reference });
        } catch (e) {
            console.error(`Error occurred while finding sale, ${e}`);
            return { error: e };
        }
    }

    static async getSales() {
        try {
            return await sales.find().toArray();
        } catch (e) {
            console.error(`Error occurred while getting sales, ${e}`);
            return { error: e };
        }
    }

    static async updatePayment(sale: Sale) {
        try {
            return await sales.updateOne(
                { reference: sale.reference },
                {
                    $set: {
                        state: sale.state,
                    },
                }
            );
        } catch (e) {
            console.error(`Error occurred while getting sales, ${e}`);
            return { error: e };
        }
    }
}
