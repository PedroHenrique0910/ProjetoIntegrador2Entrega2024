const express = require("express")
const router = express.Router()
const connection = require("../../database/database")
const path = require("path");


router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/login.html"));
});


router.post("/login", (req, res) => {
    var email = req.body.email
    var senha = req.body.senha  

    const query = `SELECT COUNT(*) AS count FROM usuarios WHERE email = '${email}' and senha = '${senha}'`

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Erro ao executar a query: ", err);
            return res.status(500).json({message: 'Ocorreu um, Erro na consulta' });
        }
        else if (results[0].count == 0) {
            return res.status(404).json({message: "E-mail ou senha incorretos!"})
        }            
        else if (results[0].count > 0) {
            return res.status(200).json({message: "Login validado com sucesso, entrando no aplicativo..."})
        }        
})    

});


module.exports = router