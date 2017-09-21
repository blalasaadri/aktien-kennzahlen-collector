'use strict';

const request = require('request-promise-native');
const cheerio = require('cheerio');

const scrapeData = function(onvista_id) {
    const url = `https://www.onvista.de/aktien/fundamental/${onvista_id}`;

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
        let results = [];
        $('.KENNZAHLEN').filter(function() {
            let { years, gewinnProAktie, kgv } = (() => {
                let gewinn = $(this).find('table').eq(0);

                let years = gewinn
                    .find('thead')
                    .find('th')
                    .slice(-5)
                    .map(function() {
                        return $(this)
                        .text()
                        .trim();
                    }).get();
                
                let gewinnProAktie = gewinn
                    .find('tbody')
                    .find('tr')
                    .eq(0)
                    .find('.ZAHL')
                    .slice(-5)
                    .map(function() {
                        return $(this)
                        .text()
                        .trim();
                    }).get();

                let kgv = gewinn
                    .find('tbody')
                    .find('tr')
                    .eq(1)
                    .find('.ZAHL')
                    .slice(-5)
                    .map(function() {
                        return $(this)
                        .text()
                        .trim();
                    }).get();

                return {
                    years, gewinnProAktie, kgv
                }
            })();
            
            let eigenkapitalquote = (() => {
                let bilanz = $(this).find('table').eq(5);

                return bilanz
                .find('tbody')
                .find('tr')
                .eq(1)
                .find('.ZAHL')
                .slice(-5)
                .map(function() {
                    return $(this)
                    .text()
                    .trim();
                }).get();
            })();

            let { ebitMarge, eigenkapitalrendite } = (() => {
                let rentabilitaet = $(this).find('table').eq(7);

                let ebitMarge = rentabilitaet
                    .find('tbody')
                    .find('tr')
                    .eq(1)
                    .find('.ZAHL')
                    .slice(-5)
                    .map(function() {
                        return $(this)
                        .text()
                        .trim();
                    }).get();

                let eigenkapitalrendite = rentabilitaet
                    .find('tbody')
                    .find('tr')
                    .eq(3)
                    .find('.ZAHL')
                    .slice(-5)
                    .map(function() {
                        return $(this)
                        .text()
                        .trim();
                    }).get();

                return { ebitMarge, eigenkapitalrendite };
            })();
            
            for (var i = 0; i < years.length; i++) {
                let result = {
                    geschaeftsjahr: years[i],
                    gewinnProAktie: gewinnProAktie[i],
                    kgv: kgv[i]
                };
                if (eigenkapitalquote[i]) {
                    result.eigenkapitalquote = eigenkapitalquote[i];
                }
                if (ebitMarge[i]) {
                    result.ebitMarge = ebitMarge[i];
                }
                if (eigenkapitalrendite[i]) {
                    result.eigenkapitalrendite = eigenkapitalrendite[i];
                }
                results.push(result);
            }
        });
        return results;
    });
};

exports.scrapeData = scrapeData;