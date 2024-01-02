const express = require('express');
const app=express();
require('dotenv').config();
const premiumRoute=require('./routes/premiumRoutes');
const mongodb = require('./util/db');
const port=process.env.PORT || 3000;

app.use(express.json());
app.get('/',(req,res)=>{
    const ipAddresses = req.headers['accept-language'];
    console.log(ipAddresses);
    res.json({message:"hello successfull"});
})
app.use('/premium',premiumRoute);

mongodb()
  .then((respose) => {
    console.log(`database is connected to mongodb`);
    app.listen(port,()=>{
        console.log(`listening on port ${port} http://localhost:${port}`);
    })
  })
  .catch((err) => console.log(err));
