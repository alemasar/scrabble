var shell = require("shelljs");
var jsonConcat = require("json-concat");

const dbFolder = './data/';
const fs = require('fs');
if (fs.existsSync(dbFolder + "db.json")) {
    fs.unlink(dbFolder + "db.json", (err) => {
        if (err) throw err;
        joinDB()
    });
}else{
    joinDB()
}

function joinDB(){
    fs.readdir(dbFolder, (err, file) => {

        var files = [];
        file.forEach(f => {
            files.push(dbFolder + f);
        })
        console.log(files);
        jsonConcat({
            src: files,
            dest: dbFolder + "db.json"
        }, function (json) {
            var args = "--kill-others \"lite-server\" \"json-server --watch ./data/db.json --port 3004\" \"compass watch\""
            shell.exec("concurrently " + args);
        });
    })
}
