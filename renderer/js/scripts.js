/*!
* Start Bootstrap - Simple Sidebar v6.0.6 (https://startbootstrap.com/template/simple-sidebar)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-simple-sidebar/blob/master/LICENSE)
*/
// 
// Scripts
// 
const { ipcRenderer } = require('electron');
const path = require('path');
const csvProcess = require('./js/csv-process.js');
const sendEmail = require('./js/send-email.js');
const { clear } = require('console');

let payslips = [];
let csvData = [];
let loginName = [];

let a = 0;
const fileNameDenominator = '_';
const logArea = document.getElementById('TerminalTextArea');

const isPdfFile = (filePath) => {
    const isPdf = path.extname(filePath) === '.pdf';
    return isPdf;
};

const isCsvFile = (filePath) => {
    const isCsv = path.extname(filePath) === '.csv';
    return isCsv;
};

async function sendEmails(email, password) {
    for(let i = 0; i < loginName.length; i++) {
                let pdfPath = payslips[i];
                
                let dirPath = path.dirname(pdfPath);
                let fileName = path.basename(pdfPath);
                let encryptedPath = path.join(dirPath, "/encrypted/" + fileName);
                let finalPath = encryptedPath.toString().replaceAll('\\','/');
                for (let j=0; j<csvData.length; j++) {
                    if(loginName[i] === csvData[j][0]) {
                        var recipient = csvData[j][1];
                        var name = csvData[j][3];
                        console.log(finalPath);
                        await sendEmail.sendPayslip(email, password, recipient,finalPath,name);
                        break;
                    }
                }
                
            }
}
window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

    const sidebarConfigurationOnClick = document.body.querySelector('#sidebarConfiguration');
    if (sidebarConfigurationOnClick) {
        sidebarConfigurationOnClick.addEventListener('click', event => {
            event.preventDefault();
            var defaultContent =  document. getElementById('DefaultContent');
            var configurationContent= document.getElementById('ConfigurationContent');
            var sendPayslipContent =  document.getElementById('SendPayslipContent');
            var viewlogContent = document.getElementById('viewLogContent');

            configurationContent.style.display = 'block';
            defaultContent.style.display = 'none';
            sendPayslipContent.style.display = 'none';
            viewlogContent.style.display = 'none';
        });
    }

    const sidebarPaySlipOnClick = document.body.querySelector('#sidebarSendPayslip');
    if (sidebarPaySlipOnClick) {
        sidebarPaySlipOnClick.addEventListener('click', event => {
            event.preventDefault();
            var defaultContent =  document.getElementById('DefaultContent');
            var configurationContent= document.getElementById('ConfigurationContent');
            var sendPayslipContent =  document.getElementById('SendPayslipContent');
            var viewlogContent = document.getElementById('viewLogContent');

            configurationContent.style.display = 'none';
            defaultContent.style.display = 'none';
            sendPayslipContent.style.display = 'block';
            viewlogContent.style.display = 'none';
        });
    }

    const viewLogOnClick = document.body.querySelector('#sidebarViewLog');
    if (viewLogOnClick) {
        viewLogOnClick.addEventListener('click', event => {
            event.preventDefault();
            var defaultContent =  document.getElementById('DefaultContent');
            var configurationContent= document.getElementById('ConfigurationContent');
            var sendPayslipContent =  document.getElementById('SendPayslipContent');
            var viewlogContent = document.getElementById('viewLogContent');

            configurationContent.style.display = 'none';
            defaultContent.style.display = 'none';
            sendPayslipContent.style.display = 'none';
            viewlogContent.style.display = 'block';

        })
    }

    const clearLogOnClick = document.body.querySelector('#clear-log');
    if (clearLogOnClick) {
        clearLogOnClick.addEventListener('click', event => {
            logArea.value = '';
        })
    }

    const homeButtonOnClick = document.body.querySelector('#home-btn');
    if (homeButtonOnClick) {
        homeButtonOnClick.addEventListener('click', event => {
            event.preventDefault();
            var defaultContent =  document.getElementById('DefaultContent');
            var configurationContent= document.getElementById('ConfigurationContent');
            var sendPayslipContent =  document.getElementById('SendPayslipContent');
            var viewlogContent = document.getElementById('viewLogContent');
            var viewlogContent = document.getElementById('viewLogContent');

            configurationContent.style.display = 'none';
            defaultContent.style.display = 'block';
            sendPayslipContent.style.display = 'none';
            viewlogContent.style.display = 'none';

        });
    }

    const emailFormSubmit = document.body.querySelector('#email-form');
    if (emailFormSubmit) {
        emailFormSubmit.addEventListener('submit', event => {
            let email = document.getElementById('email-field').value;
            let password = document.getElementById('password-field').value;
            sendEmails(email, password); 
            // setTimeout(function() {
            //     localStorage.clear();
            // }, 5000);
        });
    }

    const testLogOnClick = document.body.querySelector('#test-log');
    if (testLogOnClick) {
        testLogOnClick.addEventListener('click', event => {
            const logArea = document.getElementById('TerminalTextArea');
            logArea.append('Test ', a);
            a++;
        })
    }
    const fileFormSubmit = document.body.querySelector('#file-form');
    if (fileFormSubmit) {
        fileFormSubmit.addEventListener('submit', event => {
            if (document.getElementById("csv-chooser").files.length !== 0) {
                var csvName = document.getElementById("csv-chooser").files[0].path;
                if (isCsvFile(csvName)) {
                    var filePath = csvName.toString().replaceAll('\\','/');
                    csvProcess.parseCsv(filePath).then(resolve => {
                        csvData = resolve;
                        console.log(csvData);

                        if(document.getElementById("payslip-chooser").files.length !== 0) {
                            for (let i = 0; i < document.getElementById("payslip-chooser").files.length; i++) {
                                let file = document.getElementById("payslip-chooser").files.item(i);
                                if (isPdfFile(file.path)) {
                                    payslips.push(file.path);
                                    var splitFileName = file.path.toString().split(fileNameDenominator);
                                    loginName.push(splitFileName[splitFileName.length-2]);
                                } else {
                                    alert('Non-pdf file found. Please choose your files again.');
                                }
                            }
                            for (let i=0; i < loginName.length; i++) {
                                var pdfFile = payslips[i];
                                for (let j=0; j<csvData.length; j++) {
                                    if(loginName[i] === csvData[j][0]){
                                        // console.log('Encrypting PDF: ', pdfFile.toString(), 'With password: ',csvData[j][2]);
                                        let Data = {
                                            pdfPath: pdfFile,
                                            password: csvData[j][2]
                                        }
                                        ipcRenderer.send('request-mainprocess-action', Data);
                                        logArea.append('[Success] Encrypted file: ' + path.basename(pdfFile) + '. Password: ' + csvData[j][2] + '\n');
                                        break;
                                    }
                                }  
                            }
                        } else {
                            alert ('No payslips chosen');
                        }
                    })
                } else {
                    alert('Did not choose a csv file');
                }
            } else {
                alert('No csv file found');
            }

            
            
        });
    }

});
