const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const dotenv = require("dotenv");
const router = require("./routes/routes");

dotenv.config();

mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("Database Connection Successful"))
    .catch((error) => console.log("Database Connection Error: " + error));

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
    session({
        secret: "my secret key",
        saveUninitialized: true,
        resave: false,
    })
);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("", router);
app.use(express.static("./public"));

app.listen(PORT, () => {
    console.log(`Listning to port http://localhost:${PORT}`);
});
