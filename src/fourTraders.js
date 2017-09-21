'use strict';

const request = require('request-promise-native');
const cheerio = require('cheerio');

const scrapeData = function(fourTraders_id) {
    const url = `http://de.4-traders.com/${fourTraders_id}/analystenerwartungen/`;

    console.log("Requesting data from " + url);

    return request({
        uri: url,
        transform: function (body) {
            return cheerio.load(body);
        },
        headers: {
            'User-Agent': 'aktienKennzahlenCollector/0.0.1'
        }
    }).catch((err) => {
        console.log("Error: " + err);
    }).then(function ($) {
        let durchschnittlicheEmpfehlung = $('.RC_tr0').find('td').eq(1).text().trim();
        let anzahlAnalysten = $('.RC_tr1').find('td').eq(1).text().trim();
        return {
            durchschnittlicheEmpfehlung, anzahlAnalysten
        };
    })
};

exports.scrapeData = scrapeData;