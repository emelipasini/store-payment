import { MongoClient } from "mongodb";
import express from "express";
import http from "http";
import config from "config";
import path from "path";

import salesDB from "./src/database/sales";

import { salesController } from "./src/api/sales";

export const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "../views"));

app.get("/sales", salesController.sales);

app.get("/return", (req, res) => res.render("sold"));

app.get("/", (req, res) => res.render("home"));

app.post("/buy", salesController.buyProduct);

app.post("/webhook", salesController.webhook);

MongoClient.connect(config.get("dbURI"))
    .then(async (client) => {
        await salesDB.injectDB(client);
        server.listen("4200", () => {
            console.log("SERVER RUNNING IN PORT 4200...");
        });
    })
    .catch((err) => {
        console.error(err.stack);
        process.exit(1);
    });
