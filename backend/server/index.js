const express = require("express");
const cors = require('cors');


const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json())


let accounts = [];

app.get("/accounts", (req, res) => {
    res.json(accounts);
});

app.post("/accounts", (req, res) => {
    accounts = req.body;
    res.json(accounts);
});


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});