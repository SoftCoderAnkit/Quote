const express =require('express');
const app=express();
const cors = require('cors');
require("./db/db");
app.use(express.json()); 

app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST','PATCH', 'PUT', 'DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true 
}));
app.options('*', cors());
app.use(require('./Routes/User')); 
app.use(require('./Routes/contact')); 
app.use(require('./Routes/Quotes')); 


// app.use("/", (req,res)=>{
//     res.status(200).send("hiii");
// })
const PORT =5000;
app.listen(PORT,()=>{
    console.log(`your server is started on port:${PORT}`);
});