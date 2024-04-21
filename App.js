const express = require('express');
const app = express();
const router = require("./routes/router")
const cors = require('cors');
const port = 8000;
const Mongodb = require('./DB/conn');
Mongodb();


app.use(cors());
app.use(express.json());

app.use(router);

app.listen(port,()=>{
    console.log(`server is start port number ${port}`);
})