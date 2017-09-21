'use strict';

// TODO Umstellen auf Yahoo! API

const request = require('request-promise-native');
const cheerio = require('cheerio');
const moment = require('moment');
moment.locale('de');

const scrapeData = function(yahoo_id) {
    const url = `https://de.finance.yahoo.com/quote/${yahoo_id}/history?p=${yahoo_id}`;

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
        let ag = $('h1')
            .text()
            .trim();
        let aktuellerKurs = parseFloat(
            $('.Trsdu\\(0\\.3s\\).Fw\\(b\\).Fz\\(36px\\).Mb\\(-4px\\).D\\(ib\\)')
                .text()
                .trim()
                .replace(",", ".")
        );
        let historischeKurse = $('#Main')
            .find('tbody')
            .find('tr')
            .slice(0, 30)
            .map(function() {
                let datum = $(this)
                    .find('.Ta\\(start\\)')
                    .text()
                    .trim();
                datum = moment(datum, 'DD. MMMM. YYYY').format('YYYY-MM-DD');
                let boersenschluss = parseFloat(
                    $(this)
                        .find('td')
                        .eq(4)
                        .text()
                        .trim()
                        .replace(",", ".")
                );
                return {
                    datum, boersenschluss
                }
            }).get();

        return {
            ag,
            aktuellerKurs,
            historischeKurse
        }
    });
};

exports.scrapeData = scrapeData;