const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

let accounts =[];

app.get("/accounts", (req, res) => {
    res.json(accounts);
});



app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});