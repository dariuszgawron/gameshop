const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// open db connection

let db = new sqlite3.Database('sklep2', (err) => {
    if(err)
        return console.error(err.message);
    console.log('Connected to SQlite database');
});

// prepare queries from file

const dataSQL = fs.readFileSync('./sklep2.sql').toString();

const dataArr = dataSQL.toString().split(');');

db.serialize(() => {
    db.run('PRAGMA foreign_keys=OFF;');

    db.run('BEGIN TRANSACTION;');

    dataArr.forEach((query) => {
        if(query) {
            query += ');';

            db.run(query, (err) => {
                if(err) throw err;
            })
        }
    });

    db.run('COMMIT;');
});

// close db connection

db.close((err) => {
    if(err)
        return console.error(err.message);
    console.log('Connection closed');
});