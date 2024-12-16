const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/quotes`,  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => { 

console.log("Connection ho gya!!!") 
}).catch((error)=>{
    console.log(error)
})