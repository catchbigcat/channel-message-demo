const EventEmitter = require('events')  
const SQLite3 = require('sqlite3').verbose();
const emitter = new EventEmitter()

const onExcute = (options)=>{
    //监听sql事件
    if(options&&options.dbSqlPrint){
        emitter.on('excute',(sql,params,[err,data])=>{
            console.log('执行sql: "%s" 参数:"%s" 结果[err,data]: ["%s","%s"]',sql,params,err,data)
        });
    }
}


const db = {
    connect:function(options){

        let self = this;
        if(self.db){
            console.log('数据库已连接,不需要重新建立!')
            return
        }
        if(!options||!options.dbFile){
                console.log('请指定数据库文件路径 options.dbFile')
                return
        }
        self.db = new SQLite3.Database(options.dbFile, function(err) {
                if (err) {
                    self.db = null
                    return
                }
                onExcute(options);
                console.log('数据库连接成功');
            });

        self.exec = sql=>{
        	return new Promise((resolve,reject)=>{
        			self.db.exec(sql,(err)=>{
		            	emitter.emit('excute',sql,[],[err,null])
		            	resolve([err])
		            })
            })
        };
        self.run = (sql,params)=>{
        	return new Promise((resolve,reject)=>{
        			self.db.run(sql,params,(err,data)=>{ 
		            	emitter.emit('excute',sql,params,[err,data]);
		            	resolve([err,data])
		            })
            })
        };
        self.get =  (sql,params)=>{
        	return new Promise((resolve,reject)=>{
        			self.db.get(sql,params,(err,data)=>{ 
		            	emitter.emit('excute',sql,params,[err,data]);
		            	resolve([err,data])
		            })
            })        	
        };
        self.all = (sql,params)=>{
        	return new Promise((resolve,reject)=>{
        			self.db.all(sql,params,(err,data)=>{ 
		            	emitter.emit('excute',sql,params,[err,data]);
		            	resolve([err,data])
		            })
            })   
        }
    }
}
//test
if (require.main === module) {
    db.connect({dbFile:"../data.db",dbSqlPrint:true});
    Promise.resolve(db.all("select * from channel")).then(result=>{
        console.log(result,'---')
    });
    (async()=>{
    	let [err,data] = await db.run("update message set tittle='122'")
    	console.log(err,data)
    })();
}

exports.db = db;