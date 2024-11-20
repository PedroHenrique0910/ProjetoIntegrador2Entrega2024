const express = require("express")
const router = express.Router()
const connection = require("../../database/database")
const path = require("path");

router.post("/create", (req, res) => {
    var nome = req.body.nome
    var email = req.body.email
    var senha = req.body.senha  

    const checkEmail = `SELECT COUNT(*) AS count FROM usuarios WHERE email = '${email}'`
    const query = `INSERT INTO usuarios (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}')`;

    connection.query(checkEmail, (err, results) => {
        if (err) {
            console.error("Erro ao executar a query: ", err);
            return res.status(500).json({message: 'Erro na consulta' });
        }
        else if (results[0].count > 0) {
            return res.status(400).json({message: "E-mail já cadastrado!"})
        }      
    connection.query(query, (err) => {
        if (err) {
            console.error("Erro ao executar a query: ", err);
            return res.status(500).json({message: 'Erro ao criar o usuário' });
        }
            return res.status(201).json({message: "Cadastro criado com sucesso!"})
    })    
})    

});


router.post("/searchName", (req, res) => {
    var email = req.body.email

    const checkName = `SELECT nome FROM usuarios where email = '${email}'`

    connection.query(checkName, (err, results) => {
        if (err) {
            console.error("Erro ao executar a query: ", err);
            return res.status(500).json({message: 'Erro na consulta' });
        }
        else {
            return res.status(200).json(results[0])
        }      
    })  
});

router.post("/changePassword", (req, res) => {
    var senhaAtual = req.body.senhaAtual
    var novaSenha = req.body.novaSenha
    var email = req.body.email
    
    const checkSenhaAtual = `SELECT COUNT(*) AS count FROM usuarios where email = '${email}' and senha = '${senhaAtual}'`
    const updateSenha = `UPDATE usuarios SET senha = '${novaSenha}' WHERE email = '${email}' AND senha = '${senhaAtual}'`

    connection.query(checkSenhaAtual, (err, results) => {
        if (err) {
            console.error("Erro ao executar a query: ", err);
            return res.status(500).json({message: 'Erro na consulta...' });
        }
        else if (results[0].count > 0) {
            connection.query(updateSenha, (err, results) => {
                if (err) {
                    console.error("Erro ao executar a query: ", err);
                    return res.status(500).json({message: 'Erro na consulta...' });
                }
                else {
                    return res.status(200).json({message: 'Senha alterada com sucesso!' });
                }
            }) 
        }      
        else {
            return res.status(404).json({message: 'Senha incorreta! Tente novamente' });
        }    
        
    })  
});

router.post("/delete", (req, res) => {
    var email = req.body.email
    var senha = req.body.senha

    const checkUser = `SELECT COUNT(*) AS count FROM usuarios where email = '${email}' and senha = '${senha}'`
    const deleteUser = `DELETE FROM usuarios where email = '${email}' and senha = '${senha}'`

    connection.query(checkUser, (err, results) => {
        if (err) {
            console.error("Erro ao executar a query: ", err);
            return res.status(500).json({message: 'Erro na consulta' });
        }
        else if (results[0].count > 0) {
            connection.query(deleteUser, (err, results) => {
                if (err) {
                    console.error("Erro ao executar a query: ", err);
                    return res.status(500).json({message: 'Erro na consulta' });
                }
                else {
                    return res.status(200).json({message: 'Usuario Deletado com sucesso!'});
                }
            }) 
        }      
        else {
            return res.status(404).json({message: 'Senha incorreta! Tente novamente' });
        }    
        
    })  
});


router.get("/create", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/password.html"));
});

router.get("/profile", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/profile.html"));
});

router.get("/delete", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/delete.html"));
});


module.exports = router

