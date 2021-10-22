import express from "express";
import http from "http";
import config from "config";
import axios from "axios";

export const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

server.listen("4200", () => {
  console.log("SERVER RUNNING IN PORT 4200...");
});

app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/test", async (req, res) => {
  const headers: any = {
    "x-api-key": config.get("api-key"),
    "x-access-token": config.get("access-token"),
    "x-lang": "es",
    "Content-Type": "application/json",
    "cache-control": "no-cache",
  };

  const params = JSON.stringify({
    total: 100,
    description: "Descripcion de Link de Pago",
    due: {
      day: 18,
      month: 12,
      year: 2021,
    },
    secondDue: {
      days: 10,
      surcharge: 30,
    },
    reference: "Eme_22_10_13",
    test: true,
    options: {
      smsMessage: "Enviamos la orden generada para su pago",
    },
    actions: [
      {
        icon: "attachment",
        title: "Factura",
        url: "https://speryans.com/mifactura/123",
      },
    ],
    return_url: `${config.get("page-url")}/return`,
    webhook: `${config.get("page-url")}/webhook`,
  });

  try {
    const response: Record<string, any> = await axios.post(
      "https://api.mobbex.com/p/payment_order",
      params,
      { headers }
    );

    return res.redirect(response.data.data.url);
  } catch (error) {
    console.log("ERROR AL ENVIAR LA PETICION", error);
    return res.send("Error al enviar la peticion!" + error);
  }
});

app.get("/return", (req, res) => {
  console.log("return");
  return res.send("Redireccion exitosa!");
});

app.post("/webhook", (req, res) => {
  console.log("webhook", req.body);
  return res.send("Actualizacion de un pago" + req.query);
});
