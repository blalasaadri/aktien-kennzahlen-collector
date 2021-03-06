'use strict';

const ags = require('./ags');
const onvista = require('./onvista');
const fourTraders = require('./fourTraders');
const yahoo = require('./yahoo');

let collectAllFor = function(ag, yahooData) {
    let agData = ags.find(ag);
    return Promise.all([
        yahooData || yahoo.scrapeData(agData.yahoo),
        onvista.scrapeData(agData.onvista),
        fourTraders.scrapeData(agData.fourTraders),
    ]).then((values) => {
        let result = {};
        result.ag = values[0].ag;
        result.aktuellerKurs = values[0].aktuellerKurs;
        result.historischeKurse = values[0].historischeKurse;
        result.kennzahlen = values[1];
        result.analysten = values[2];
        return result;
    });
};

/* Temporary solution; better write this stuff into a db */
const Hapi = require('hapi');
const Good = require('good');
const Boom = require('boom');

const server = new Hapi.Server();
server.connection({
    port: process.env.PORT || 3000,
    host: '0.0.0.0'
});

server.route({
    method: 'GET',
    path: '/aktien',
    handler: function(request, reply) {
        let requestedAgs = request.query.ags;
        if (requestedAgs) {
            let aktien = Promise.all(
                requestedAgs
                    .split(',')
                    .map(collectAllFor)
                );
            return reply(aktien)
                .code(200)
                .type('application/json');
        } else {
            return reply()
                .code(404);
        }
    },
    config: {
        cors: {
            origin: [ '*' ],
            additionalHeaders: [ 'cache-control', 'x-requested-with' ]
        }
    }
});

server.route({
    method: 'GET',
    path: '/topaktien',
    handler: function(request, reply) {
        let numberOfShares = request.query.number || process.env.TOPAKTIEN || 5;

        let findIdByYahooId = function(yahooId) {
            return ags.ags.filter(ag => ag.yahoo === yahooId)[0].id;
        };

        reply(
            Promise
                .all(ags.ags
                    .map(ag => yahoo.scrapeData(ag.yahoo))
                ).then(values => {
                    return values
                        .sort((a, b) => {
                            return b.aktuellerKurs - a.aktuellerKurs
                        })
                })
                .then(values => values.slice(0, numberOfShares))
                .then(values => Promise.all(values.map(yahooData => collectAllFor(findIdByYahooId(yahooData.yahoo_id), yahooData))))
        );
    },
    config: {
        cors: {
            origin: [ '*' ],
            additionalHeaders: [ 'cache-control', 'x-requested-with' ]
        }
    }
});

server.route({
    method: 'GET',
    path: '/kuerzel',
    handler: function(request, reply) {
        return reply(ags.ags.map(ag => ag.id))
            .code(200)
            .type('application/json');
    }
});

server.register({
    register: Good,
    options: {
        reporters: {
            console: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{
                    response: '*',
                    log: '*'
                }]
            }, {
                module: 'good-console',
            }, 'stdout']
        }
    }
}, (err) => {
    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start((err) => {
        if (err) {
            throw err;
        }
        server.log('info', `Server running at: ${server.info.uri}`);
    });
});