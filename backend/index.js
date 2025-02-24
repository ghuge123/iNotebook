const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// mongoDB connection
main().then((res)=> console.log('connected to db'))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/iNotebook');
}

app.use(express.json());

app.use(cors());

// 
app.use('/api/auth' , require('./routes/auth'));
app.use('/api/notes' , require('./routes/notes'));

app.get('/' , (req , res)=>{
    res.send("hello");
    console.log("hii");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})