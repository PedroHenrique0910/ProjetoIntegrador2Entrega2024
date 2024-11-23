const express = require("express")
const router = express.Router()
const connection = require("../../database/database")
const path = require("path");


router.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/home.html"));
});

module.exports = router