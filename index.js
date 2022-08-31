const sql= require('mysql');
var mqtt=require('mqtt');

options={
    clientId:"mqttjs01",
    username:"",
    password:"",
    clean:true};

var client = mqtt.connect("mqtt://test.mosquitto.org:1883",options)
const data_topic= 'test/data';

client.on('connect', () => {
  console.log("connected to mqtt broker")
  client.subscribe(data_topic)
  // client.subscribe(logs_topic)
})

const db= sql.createConnection({
    host:'localhost',
    user:'root',
    password:'tabz',
    database:'nodesql',
    
});

db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log("sql connected");
});
let usedb='USE nodesql';
let createtable='CREATE TABLE mqttdata (Device varchar(50),TS int,DATA varchar(200), PRIMARY KEY (TS));';


db.query(usedb, (err,result)=>{
    if(err)throw err;
    console.log(result);
});
// db.query(createtable, (err,result)=>{
//     if(err)throw err;
    // console.log(result);
// });

client.on('message', (topic, message) => {
  
    console.log('DATA: %s', message)
    mqtt_json=JSON.parse(message)
    console.log('RESPONSE: %s %d %s', mqtt_json.device, mqtt_json.ts, mqtt_json.data[0])
    let update= `INSERT INTO mqttdata(Device, TS, DATA) VALUES( "${mqtt_json.device}", ${mqtt_json.ts}, "${mqtt_json.data[0]}")`;
   console.log(update);
db.query(update, (err,result)=>{
    if(err)throw err;
    console.log(result);
});
  })
  

// let show='SELECT * FROM Mydata';
// db.query(show, (err,result)=>{
//     if(err)throw err;
//     console.log(result);
// });

