const functions = require("firebase-functions");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const {username, password, host} = functions.config().mongo;

const mongoUrl = `mongodb+srv://${username}:${password}@${host}/noticiasDb?retryWrites=true&w=majority`;
mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();

const Noticias = require("./Models/Noticias");

const createServer = () => {
  app.use(cors({origin: true}));

  // Método que permite consultar todas las noticias
  app.get("/noticias", async (req, res) => {
    const msg = await Noticias.find({}).exec();
    res.send(msg);
  });

  // Método que permite agregar una nueva noticia
  app.post("/noticias", async (req, res) => {
    const {body} = req;

    const noticia = new Noticias(body);

    await noticia.save();

    const msg = {message: "Noticia guardada con éxito!", data: noticia};

    functions.logger.info(msg, {structuredData: true});

    res.status(200).send(msg);
  });

  // Método que permite eliminar una noticia
  app.get("/noticias/:id/daralta", async (req, res) => {
    const {id} = req.params;

    const resp = await Noticias.deleteOne({_id: id}).exec();

    const msg = {message: "Noticia eliminada con éxito!", data: resp};

    functions.logger.info(msg, {structuredData: true});
    res.send({msg});
  });

  return app;
};

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.api = functions.https.onRequest((request, response) => {
//   response.send("Hello from Firebase!");
// });


exports.api = functions.https.onRequest(createServer());
