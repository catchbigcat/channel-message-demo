const {db}= require('./db')

const createChannel= async(name,calllback)=>{
	let sql = "select id,name from channel where name=?"
	let[err,data]= await db.get(sql,[name]);
	
	calllback([err,data])
	if(err){
		reject(err)	
	}else{
		reslove(data);
	}
}
const writeMessage=async(data,callback)=>{
	let messageInput = data
	let channelName = messageInput.channel.name
	let tittle = messageInput.tittle
	let content = messageInput.content


}
if (require.main === module) {
	
}