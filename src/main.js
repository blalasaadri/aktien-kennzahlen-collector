'use strict';

//const { Client } = require('pg');
const ags = require('./ags');
const onvista = require('./onvista');
const fourTraders = require('./fourTraders');
const yahoo = require('./yahoo');

/*const client = new Client({
    user: '',
    host: process.env.DATABASE_URLhe,
    databae: '',
    password: '',
    port: 3211,
});

client.connect();

let saveToDb = function() {
    const res = client.query('', (err, res) => {
        // TODO Do stuff
        client.end();
    });
};*/

let collectAllFor = function(ag) {
    
};

/*setTimeout(function() {
    ags.ags
        .map(ag => ag.id)
        .forEach(collectAllFor);
}, 10000);*/

/*
onvista.scrapeData(ags.find('siemens_de').onvista)
    .then(function(data) {
        console.dir(data);
    });
onvista.scrapeData(ags.find('allianz_de').onvista)
    .then(function(data) {
        console.dir(data);
    });

fourTraders.scrapeData(ags.find('siemens_de').fourTraders)
    .then(function(data) {
        console.dir(data);
    });
fourTraders.scrapeData(ags.find('allianz_de').fourTraders)
    .then(function(data) {
        console.dir(data);
    });
*/
yahoo.scrapeData(ags.find('siemens_de').yahoo)
    .then(function(data) {
        console.dir(data);
    });
/*yahoo.scrapeData(ags.find('allianz_de').yahoo)
    .then(function(data) {
        console.dir(data);
    });*/