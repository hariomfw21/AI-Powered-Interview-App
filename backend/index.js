const express = require('express');
const connection = require('./configs/db');
const userRouter = require('./routes/user.routes');
const cors = require('cors');
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/user', userRouter);

app.listen(port, ()=>{
    connection();
    console.log(`App running on port: ${port}`);
})
