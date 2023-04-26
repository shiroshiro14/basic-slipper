const readCSV = require('nodecsv').readCSV;

module.exports = {
    parseCsv : function(csvPath) {
        readCSV(csvPath, function(error, data){
            var csvText = data;
            console.log(csvText);
            for (let i = 0; i < csvText.length; i++){
                console.log(csvText[i].find(element => element == 'a'));
            }
                
        });
    }
}
