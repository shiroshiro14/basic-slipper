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


var payslips = [];

const isPdfFile = (filePath) => {
    const isPdf = path.extname(filePath) === '.pdf';
    return isPdf;
};

const isCsvFile = (filePath) => {
    const isCsv = path.extname(filePath) === '.csv';
    return isCsv;
};


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

            configurationContent.style.display = 'block';
            defaultContent.style.display = 'none';
            sendPayslipContent.style.display = 'none';
        });
    }

    const sidebarPaySlipOnClick = document.body.querySelector('#sidebarSendPayslip');
    if (sidebarPaySlipOnClick) {
        sidebarPaySlipOnClick.addEventListener('click', event => {
            event.preventDefault();
            var defaultContent =  document.getElementById('DefaultContent');
            var configurationContent= document.getElementById('ConfigurationContent');
            var sendPayslipContent =  document.getElementById('SendPayslipContent');

            configurationContent.style.display = 'none';
            defaultContent.style.display = 'none';
            sendPayslipContent.style.display = 'block';
        });
    }

    const homeButtonOnClick = document.body.querySelector('#home-btn');
    if (homeButtonOnClick) {
        homeButtonOnClick.addEventListener('click', event => {
            event.preventDefault();
            var defaultContent =  document.getElementById('DefaultContent');
            var configurationContent= document.getElementById('ConfigurationContent');
            var sendPayslipContent =  document.getElementById('SendPayslipContent');

            configurationContent.style.display = 'none';
            defaultContent.style.display = 'block';
            sendPayslipContent.style.display = 'none';
        });
    }

    const emailFormSubmit = document.body.querySelector('#email-form');
    if (emailFormSubmit) {
        emailFormSubmit.addEventListener('submit', event => {
            localStorage.setItem('email', document.getElementById('email-field').value);
            localStorage.setItem('password', document.getElementById('password-field').value);

            var pdfFile = payslips[0];
            var csvPath = localStorage.getItem('csvPath');
            console.log(csvPath);
            let Data =  {
                password: "2909",
                pdfPath: pdfFile
            }
            //ipcRenderer.send('request-mainprocess-action', Data);
            ipcRenderer.send('request-csv-process', csvPath);
            // setTimeout(function() {
            //     localStorage.clear();
            // }, 5000);
        });
    }

    const fileFormSubmit = document.body.querySelector('#file-form');
    if (fileFormSubmit) {
        fileFormSubmit.addEventListener('submit', event => {
            if (document.getElementById("csv-chooser").files.length !== 0) {
                var csvName = document.getElementById("csv-chooser").files[0].path;
                if (isCsvFile(csvName)) {
                    localStorage.setItem('csvPath', csvName);
                } else {
                    alert('Did not choose a csv file');
                }
            } else {
                alert('No csv file found');
            }

            if(document.getElementById("payslip-chooser").files.length !== 0) {
                for (let i = 0; i < document.getElementById("payslip-chooser").files.length; i++) {
                    let file = document.getElementById("payslip-chooser").files.item(i);
                    if (isPdfFile(file.path)) {
                        
                        payslips.push(file.path);
                        
                    } else {
                        alert('Non-pdf file found. Please choose your files again.');
                    }
                }
                console.log(payslips[0]);
            } else {
                alert ('No payslips chosen');
            }
            
        });
    }
});
