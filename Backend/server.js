const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/api", require("./routes/signUp"));
app.use("/api", require("./routes/signIn"));

app.listen(3000,"0.0.0.0", () => {
    console.log("Start port 3000");
})