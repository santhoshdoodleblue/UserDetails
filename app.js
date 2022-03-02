//npm 
const express =require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')

//route 
const UserRoute=require('./routes/user')
const AuthRoute = require('./routes/auth')

//mongodb connection
mongoose.connect('mongodb+srv://santhosh:santhosh123@usercluster.r3wiz.mongodb.net/userDB?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology:true})
const db= mongoose.connection 

db.on('error',(err)=> {
    console.log('err',err)
})

db.once('open',()=> {
    console.log('Database Connected!')
})

//explicit call 
const app= express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

//http request
app.get('/',(req ,res)=>{
    res.send('Http get request');
})

//assign port
const PORT = process.env.PORT ||3000
app.listen(PORT, ()=> {
    console.log(`NodeJS Server is running on port ${PORT}`)
})

//route call
app.use('/api/user',UserRoute)
app.use('/api',AuthRoute)










// const express=require('express');
// const app=express();

// app.get('/',(req,res)=>{
//     res.send('HTTP GET REQUEST')
// });

// app.listen(3000,()=>{
//     console.log('Database connected with port 3000')
// });







/*const { MongoClient } = require('mongodb');
const uri = "";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log("Connected Successfully");
  dblist(client)
  client.close();
});
const dblist= (client)=>{
    const dblist=client.db().admin().listDatabases();
    console.log("Databases are:");
    dblist.databases.forEach(db=>{
        console.log(`-${db.name}`);
    });
    console.log(dblist);
}
*/