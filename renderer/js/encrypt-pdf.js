const Recipe = require("muhammara").Recipe;
const path = require('path');
const fs = require('fs');

module.exports = {
    encryptPdf : function(pdfPath, password) {
        var dirPath = path.dirname(pdfPath);
        var fileName = path.basename(pdfPath);
        var encryptedDirPath = path.join(dirPath, "/encrypted/"); 
        if (!fs.existsSync(encryptedDirPath)){
            fs.mkdirSync(encryptedDirPath);
        }
        
        var encryptedPath = path.join(encryptedDirPath + fileName);
        const pdfDoc = new Recipe(pdfPath, encryptedPath);
        pdfDoc
        .encrypt({
            userPassword: password,
            userProtectionFlag: 4,
        })
        .endPDF();
    }
}
