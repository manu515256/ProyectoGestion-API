//* Dependencies
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose'
import router from './routes';

//* Variables
const port = 3000;
const app = express();
const dbUrl = 'mongodb://localhost:27017/gestionmanu';

//* DB conection
mongoose.Promise = global.Promise
mongoose.connect(dbUrl, {useCreateIndex:true,useNewUrlParser:true,useUnifiedTopology:true})
.then(mongoose => console.log('DB conected on port 27017'))
.catch(err => console.log(err));

//* Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')))

//* endpoint
app.use('/api',router);

//* Port Config
app.set('port',process.env.PORT || port);
app.listen(app.get('port'),()=>{
console.log(`Listen on port: ${app.get('port')}`);
});