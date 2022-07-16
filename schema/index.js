const { buildSchema } = require('graphql');

exports.schema = buildSchema(` 
  type Channel{
  	id:ID!
  	name:String!
  }

  type Message{
  	id:ID!
  	tittle:String!
  	content:String
  	channel:Channel
  	createAt:String!
  }

  type PageInfo{
	pageSize:Int!
  	pageNumber:Int!
  	total:Int!
  }

  type MessagePage {
  	page:PageInfo
  	list:[Message]!
  }
  
  input PageInput{
  	pageSize:Int!
  	pageNumber:Int!
  }

  input ChannelInput{
  	name:String!
  }

  input MessageInput{
  	tittle:String!
  	content:String
  	channel:ChannelInput!
  }

  type Query {
    listMessage(channelId:ID,pageParams:PageInput):MessagePage
  }
  
  type Mutation {
  	createChannel(channel:ChannelInput!): Channel
  	writeMessageInChannel(message:MessageInput!): Message
  }
  
  schema {
  	query:Query
  	mutation:Mutation
  }
`);