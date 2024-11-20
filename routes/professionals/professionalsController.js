const express = require("express")
const router = express.Router()
const connection = require("../../database/database")
const path = require("path");

router.get("/professionalsList", (req, res) => {
    const query = `
    SELECT p.id, p.foto, p.nome, p.sobrenome, p.profissao, p.avaliacao, p.anosAtuacao, p.clientesAtendidos,
           a.comentario, a.estrelas
    FROM profissionais p
    LEFT JOIN avaliacoes a ON p.id = a.profissional_id
  `;
  
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao consultar o banco de dados' });
    }

    const profissionais = results.reduce((acc, row) => {
      if (!acc[row.id]) {
        acc[row.id] = {
          id: row.id,
          foto: row.foto,
          nome: row.nome,
          sobrenome: row.sobrenome,
          profissao: row.profissao,
          avaliacao: row.avaliacao,
          anosAtuacao: row.anosAtuacao,
          clientesAtendidos: row.clientesAtendidos,
          avaliacoes: []
        };
      }

      if (row.comentario) {
        acc[row.id].avaliacoes.push({
          comentario: row.comentario,
          estrelas: row.estrelas
        });
      }

      return acc;
    }, {});
    res.json(Object.values(profissionais));
  });
});

router.get("/professionals-page", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/professionals.html"));
});


module.exports = router

