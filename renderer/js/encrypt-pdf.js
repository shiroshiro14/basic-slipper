const Recipe = require("muhammara").Recipe;
const path = require('path');

module.exports = {
    encryptPdf : function(pdfPath, password) {
        var dirPath = path.dirname(pdfPath);
        var fileName = path.basename(pdfPath);
        var encryptedPath = path.join(dirPath, "/encrypted/" + fileName);
        const pdfDoc = new Recipe(pdfPath, encryptedPath);
       
        pdfDoc
        .encrypt({
            userPassword: password,
            userProtectionFlag: 4,
        })
        .endPDF();
    }
}
