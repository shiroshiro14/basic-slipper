const readCSV = require('nodecsv').readCSV;

const parseCsv = (csvPath) => {
    return new Promise ((resolve, reject) => {
        readCSV(csvPath, function(err,data){
            if (err) {
                return reject(err)
            } else {
                resolve(data)
            }
        })
    })
}
exports.parseCsv = parseCsv;