const rootValue ={
	createChannel:({channel})=>{
		
		
		return {
			id:'channelId',
			name:'channelName'
		}
	},
	writeMessageInChannel:({message})=>{
		
		return {
			id:'messageId',
		  	tittle:'messageTittle',
		  	content:'content',
		  	channel:{id:'channelId',name:'channelName'},
		  	createAt:'dateTime'
		}
	},
	listMessage:({channelId,pageParams})=>{
		
		return {
			page:{},
	  		list:[null]
		}
	}
};
exports.rootValue=rootValue;