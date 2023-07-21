import bodyParser from "body-parser";
import cors from "cors"
import express from "express"
// import db from "./db"
import fs from "fs"
// import resolver from "./resolver"



const port =  process.env.PORT || 9000
const app = express();
const typeDefs = fs.readFileSync('./schema.graphql',{encoding:'utf-8'})

// const {makeExecutableSchema} = require('graphql-tools')
import makeExecutableSchema from "graphql-tools"
const schema = makeExecutableSchema({typeDefs, resolvers})

app.use(cors(), bodyParser.json());

const  {graphiqlExpress,graphqlExpress} = require('apollo-server-express')
app.use('/graphql',graphqlExpress({schema}))
app.use('/graphiql',graphiqlExpress({endpointURL:'/graphql'}))

app.listen(
   port, () => console.info(
      `Server started on port ${port}`
   )
);
