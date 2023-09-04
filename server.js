require('dotenv').config();
const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const raconteRoutes = require('./routes/raconte');
const userRoutes = require('./routes/user');


const app = express();
app.use(express.json());

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_CONNEXION, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

 app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/raconte', raconteRoutes);
app.use('/api/auth', userRoutes);

const normalizePort = val =>{
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT ||'3333');
app.set('port', port);

const errorHandler = error =>{
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = sever.address();
    const bind = typeof address === 'string' ? 'pipe' + address: 'port: ' +port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires  elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + 'is already in use.');
            break
        default:
            throw error;
    }
}
const server = http.createServer(app)

server.on('error', errorHandler);
server.on('listening', ()=> {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe' + address : 'port ' +port;
    console.log('Listening on '+ bind);
})

connectDB().then(() => {
    server.listen(port);
})