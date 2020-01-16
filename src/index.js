const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app = express();

/**
 * 
 * DATABASE CONECTIONS SETTINGS
 */
const DB_USER_NAME = 'user';
const DB_USER_PASS = 'pass';
const DB_TABLE ='table';
const DB_URL ='mongodb+srv://'+DB_USER_NAME+':'+DB_USER_PASS+'@cluster0-ioryu.mongodb.net/'+DB_TABLE+'?retryWrites=true&w=majority'

mongoose.connect(DB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
/**
 * request and response is standart on express 
 * send()  - return a string response
 * json() - sends a json response  Object or Array
 * yarn nomemon index.js - listen changes
 * methods:  
 *          get     -> serach info
 *          post    -> create info
 *          put     -> update info
 *          delete  -> delete info
 * 
 * Params Types:
 *          Query Params: url params -> req.params (Filters, Ordenations,Paginations)
 *          Route Params: methods (PUT and DELETE) ->req.params (Update or Delete) -> route/:route_param_name
 *          Body Params:  ->req.body (Data to create or update info)
 *          
 */
 app.use(cors());
 app.use(express.json()) //define body to json
 app.use(routes) /// routes created on route files


app.listen(3333);
console.clear();
console.log('Server started on port 3333');
