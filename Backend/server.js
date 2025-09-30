const express = require("express");
const app = express();
const cors = require("cors");
const cron = require("node-cron");
const db = require("./middlewares/db_connection");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/api", require("./routes/signUp"));
app.use("/api", require("./routes/signIn"));
app.use("/api", require("./routes/member"));
app.use("/api", require("./routes/market"));
app.use("/api", require("./middlewares/sessionAuth"));

cron.schedule("0 * * * *", () => {
  const now = new Date();
  const sql = "DELETE FROM sessions WHERE end_at <= ?";
  db.query(sql, [now], (err, result) => {
    if (err) {
      console.error("❌ Error cleaning sessions:", err);
    } else if (result.affectedRows > 0) {
      console.log(`🧹 ลบ session ที่หมดอายุแล้ว ${result.affectedRows} รายการ`);
    }
  });
});

const PORT = "3000";
const HOST = "0.0.0.0";

//Host เก็บมาจาก ipconfig IPv4 Address ประเภท WIFI Lan
app.listen(PORT, HOST, () => {
    console.log("Start port 3000");
})

module.exports = app;