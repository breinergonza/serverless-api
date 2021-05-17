const mongoose = require("mongoose");

const Noticias = mongoose.model("Noticias", {
  titulo: String,
  subtitulo: String,
  contenido: String,
});

module.exports = Noticias;
