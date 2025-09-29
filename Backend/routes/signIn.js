const express = require("express");
const router = express.Router();
const db = require("../middlewares/db_connection");
const bcrypt = require("bcrypt");

router.post("/signIn", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: "Invalid username or password.", confirm : false});
    }

    const Query = "SELECT username, password FROM login WHERE username = ?";
    db.query(Query, [username], (err, results) => {
        if (err) {
            return res.status(500).json({ error : "Error server.", confirm : false});
        }

        if (!results.length > 0){
           return res.status(501).json({ error : "Can't find your username or password. Please try again.", confirm : false}); 
        }

        const user = results[0];
        
        if (username !== user.username){
            return res.status(402).json({error : "Invalid username or password.", confirm : false});
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({error : "Server error.", confirm : false});
            }

            if (!isMatch) {
                return res.status(401).json({error : "Invalid username or password.", confirm : false});
            }

            return res.status(200).json({status : "Sucess!", confirm : true});
        })
    })
})

module.exports = router;