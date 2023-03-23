const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
var server = require( 'http' ).Server( app );

const corsOptions = {
    origin: '*'
}

const Port = process.env.PORT || 4000;
const app_routes = require('./routes');

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb' , extended: true}));

//test route
app.get('/api/campusgps/test',(req, res) =>{
    res.status(200).send({msg: "Hello World"})
});

//handles all app routes
app.use("/api/campusgps/",app_routes);

//404 resource not found
app.use((req,res)=>{
    const error=new Error(`Resource not found`);
    error.status=404;
    res.status(error.status).json(error.message);
});
  
  //handle all errors 
app.use((err,req,res,next)=>{
      res.status(err.status||500).send({
      message: `${err.message}` || "Oops something went wrong",
      timestamp: Date.now(),
      origin: req.originalurl
      })
})

server.listen(Port,()=>{
    console.log(`server running on localhost Port:${Port}`);
})

process.on( 'uncaughtException', err => {
    console.log(`Uncaught Exception: ${err.message}` )
    
    server.close(() => {
      process.exit(1)
    })
   // If server hasn't finished in 1000ms, let's shutdown process
    setTimeout( () => {
      process.exit(1)
    }, 1000).unref() // Don't register timeout on event loop
   
  })
  process.on( 'unhandledRejection', (reason, promise) => {
    console.log( 'Unhandled rejection at', promise,`  reason:${reason}` )
    server.close(() => {
      process.exit(1)
    })
   // If server hasn't finished in 1000ms, let's shutdown process
    setTimeout( () => {
      process.exit(1)
    }, 1000).unref() // Don't register timeout on event loop
  
  })
  