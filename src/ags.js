'use strict';

const siemens_de = {
    id: 'siemens_de',
    onvista: 'Siemens-Aktie-DE0007236101',
    fourTraders: 'SIEMENS-436605',
    yahoo: 'SIE.DE'
};

const allianz = {
    id: 'allianz_de',
    onvista: 'Allianz-Aktie-DE0008404005',
    fourTraders: 'ALLIANZ-436843',
    yahoo: 'ALV.F'
};

exports.ags = [
    siemens_de,
    allianz
];

exports.find = function(id) {
    switch (id) {
    case siemens_de.id:
        return siemens_de;
    case allianz.id:
        return allianz;
    default:
        return {};
    }
}