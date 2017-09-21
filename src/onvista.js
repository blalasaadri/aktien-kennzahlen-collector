'use strict';

const request = require('request-promise-native');
const cheerio = require('cheerio');

const scrapeData = function(onvista_id) {
    let url = `https://www.onvista.de/aktien/fundamental/${onvista_id}`;

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
/*kennzahlen: [
    {
    geschaeftsjahr: "16/17e",
    gewinnProAktie: 7.84,
    kgv: 14.86
    },
    {
    geschaeftsjahr: "15/16",
    gewinnProAktie: 6.74,
    kgv: 17.32,
    eigenkapitalquote: "+27,69%",
    ebitMarge: "+8,88%",
    eigenkapitalrendite: "+15,65%"
    },
    {
    geschaeftsjahr: "14/15",
    gewinnProAktie: 8.84,
    kgv: 10.16,
    eigenkapitalquote: "+27,69%",
    ebitMarge: "+8,95%",
    eigenkapitalrendite: "+20,77%"
    },
    {
    geschaeftsjahr: "13/14",
    gewinnProAktie: 6.37,
    kgv: 14.71,
    eigenkapitalquote: "+30,04%",
    ebitMarge: "+9,91%",
    eigenkapitalrendite: "+17,04%"
    },
    {
    geschaeftsjahr: "12/13",
    gewinnProAktie: 5.08,
    kgv: 19.54,
    eigenkapitalquote: "+28,08%",
    ebitMarge: "+7,49%",
    eigenkapitalrendite: "+14,96%"
    }
    ]*/
};

exports.scrapeData = scrapeData;