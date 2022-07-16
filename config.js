/**
 * config
 */
exports.config = {
  debug: true,
  name: 'channel message',
  description: 'demo',
  version: '1.0.0',
  initSql:
  `
  	CREATE TABLE if not exists channel (
                id TEXT primary key not null,
                name TEXT not null
            );

   CREATE TABLE if not exists message (
            id TEXT primary key not null,
            tittle TEXT not null,
            content TEXT,
            channelId TEXT,
            createAt TEXT
            
        );     
  `,
  port: 3000
};
