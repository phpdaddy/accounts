const express = require("express");
const cors = require('cors');


const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json())

let views = [];
let accounts = [{
    created: '2020-02-01',
    accountNumber: '001-1231456',
    clientName: 'Company ABC',
    accountType: '',
    balance: ''
}, {
    created: '2020-01-15',
    accountNumber: '001-6547891',
    clientName: 'Company XYZ',
    accountType: '',
    balance: ''
}, {
    created: '2020-01-01',
    accountNumber: '001-6549784',
    clientName: 'Company 123',
    accountType: '',
    balance: ''
}];

app.get("/views", (req, res) => {
    res.json(views);
});

app.post("/views", (req, res) => {
    views = req.body;
    res.json(views);
});


app.get("/accounts", (req, res) => {
    res.json(accounts);
});


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});