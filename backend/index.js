const express = require('express');
const connection = require('./configs/db');
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.listen(port, ()=>{
    connection();
    console.log(`App running on port: ${port}`);
})
