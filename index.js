const sql= require('mysql');

const db= sql.createConnection({
    host:'localhost',
    user:'root',
    password:'TEST123',
    database:'nodesql',
    
});

db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log("sql connected");
});
let usetable='USE nodesql';
let createtable='CREATE TABLE Mydata (Device int,TS int,DATA varchar(200));';

db.query(usetable, (err,result)=>{
    if(err)throw err;
    console.log(result);
});
db.query(createtable, (err,result)=>{
    if(err)throw err;
    console.log(result);
});

let update= "INSERT INTO Mydata(Device, TS, DATA) VALUES( 1, 1638, 'HELLO WORLD')";
db.query(update, (err,result)=>{
    if(err)throw err;
    console.log(result);
});

let show='SELECT * FROM Mydata';
db.query(show, (err,result)=>{
    if(err)throw err;
    console.log(result);
});

