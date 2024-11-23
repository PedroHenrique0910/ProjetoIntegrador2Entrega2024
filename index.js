const express = require ("express")
const app = express()
require('dotenv').config();
const cors = require("cors");
const professionalsController = require("./routes/professionals/professionalsController")
const usersController = require("./routes/users/usersController")
const homeController = require("./routes/home/homeController")
const loginController = require("./routes/login/loginController")
const blogController = require ("./routes/blog/blogController")
const connection = require("./database/database")


app.use(express.json());
app.use(express.static('public'));
app.use(cors());


app.use(professionalsController)
app.use("/users", usersController)
app.use("/",loginController)
app.use(homeController)
app.use(blogController)


connection.connect((err) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
      return;
    }
    console.log('Conexão com o banco de dados estabelecida!');
  });

app.listen(8080, () => {
    console.log(`Servidor rodando em http://localhost:8080`);
  });
