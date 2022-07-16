var config = require('./config').config;

var express = require('express');
var { graphqlHTTP } = require('express-graphql');

var {schema} = require('./schema');

var {rootValue} = require('./schema/root')
var app = express.createServer();
app.use('/', 
	graphqlHTTP(async(req,res,graParams)=>({
  		schema: schema,
  		rootValue: await rootValue(req,graParams),
  		graphiql: true,
	}))
);
app.listen(config.port, () => console.log('Now browse to localhost:XXXX'));
// module.exports = app;