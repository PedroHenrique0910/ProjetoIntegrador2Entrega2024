const express = require("express")
const router = express.Router()
const connection = require("../../database/database")
const path = require("path");


router.get("/blog", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/blog.html"));
});


router.get("/allBlogs", (req, res) => {
    const query = `SELECT * FROM noticias;`;
  
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao consultar o banco de dados' });
    }
    const blogs = results.reduce((acc, row) => {
      if (!acc[row.id]) {
        acc[row.id] = {
          id: row.id,
          titulo: row.titulo,
          autor: row.autor,
          data: row.data,
          imagem: row.imagem,
          detalhes: row.detalhes,
          link: row.link,
        };
      }
      return acc;
    }, {});
    res.json(Object.values(blogs));
  });
});

module.exports = router