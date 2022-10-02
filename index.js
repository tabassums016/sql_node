const sql = require('mysql');
var mqtt = require('mqtt');

options = {
    clientId: "mqttjs01",
    username: "",
    password: "",
    clean: true
};

var client = mqtt.connect("mqtt://test.mosquitto.org:1883", options)
const data_topic = 'CCS/data';

client.on('connect', () => {
    console.log("connected to mqtt broker")
    client.subscribe(data_topic)
    // client.subscribe(logs_topic)
})

const db = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tabz',
    database: 'nodesql',

});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("sql connected");
});
let usedb = 'USE nodesql';
let createtable = 'CREATE TABLE CCS_project (Count int,Temperature int,Humidity int, PRIMARY KEY (Count));';


db.query(usedb, (err, result) => {
    if (err) throw err;
    console.log(result);
});
// db.query(createtable, (err,result)=>{
// //     if(err)throw err;
// //     console.log(result);
// });

client.on('message', (topic, message) => {

    console.log('DATA: %s', message)
    mqtt_json = JSON.parse(message)
    console.log('RESPONSE: %s %d %s', mqtt_json.Count, mqtt_json.Temperature, mqtt_json.Humidity)
    let update = `INSERT IGNORE INTO CCS_project(Count, Temperature, Humidity) VALUES( "${mqtt_json.Count}", ${mqtt_json.Temperature}, "${mqtt_json.Humidity}")`;
    console.log(update);
    db.query(update, (err, result) => {
        if (err) throw err;
        console.log(result);
    });
})


// let show='SELECT * FROM Mydata';
// db.query(show, (err,result)=>{
//     if(err)throw err;
//     console.log(result);
// });

