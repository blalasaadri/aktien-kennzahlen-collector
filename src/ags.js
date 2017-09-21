'use strict';

const commerzbank_de = {
    id: 'commerzbank_de',
    onvista: 'Commerzbank-Aktie-DE000CBK1001',
    fourTraders: 'COMMERZBANK-13057331',
    yahoo: 'CBK.DE',
};

const deutscheBank = {
    id: 'deutscheBank',
    onvista: 'Deutsche-Bank-Aktie-DE0005140008',
    fourTraders: 'DEUTSCHE-BANK-435694',
    yahoo: 'DBK.DE'
};

const heidelbergCement = {
    id: 'heidelbergCement',
    onvista: 'HeidelbergCement-Aktie-DE0006047004',
    fourTraders: 'HEIDELBERGCEMENT-436181',
    yahoo: 'HEI.DE',
};

const munichRe = {
    id: 'munichRe',
    onvista: 'Muenchener-Rueck-Aktie-DE0008430026',
    fourTraders: 'MUENCHENER-RUECKVERSICHER-436858',
    yahoo: 'MUV2.F',
};

const basf = {
    id: 'basf',
    onvista: 'BASF-Aktie-DE000BASF111',
    fourTraders: 'BASF-6443227',
    yahoo: 'BAS.DE',
};

const continental = {
    id: 'continental_de',
    onvista: 'Continental-Aktie-DE0005439004',
    fourTraders: 'CONTINENTAL-435902',
    yahoo: 'CON.DE',
};

const siemens_de = {
    id: 'siemens_de',
    onvista: 'Siemens-Aktie-DE0007236101',
    fourTraders: 'SIEMENS-436605',
    yahoo: 'SIE.DE',
};

const volkswagen_st = {
    id: 'volkswagen_st',
    onvista: 'Volkswagen-ST-Aktie-DE0007664005',
    fourTraders: 'VOLKSWAGEN-436737',
    yahoo: 'VOW3.DE',
};

const bmw_de = {
    id: 'bmw_de',
    onvista: 'BMW-Aktie-DE0005190003',
    fourTraders: 'AYERISCHE-MOTOREN-WERKE-435722',
    yahoo: 'BMW.DE',
};

const allianz_de = {
    id: 'allianz_de',
    onvista: 'Allianz-Aktie-DE0008404005',
    fourTraders: 'ALLIANZ-436843',
    yahoo: 'ALV.F',
};

const bayer_de = {
    id: 'bayer_de',
    onvista: 'Bayer-Aktie-DE000BAY0017',
    fourTraders: 'BAYER-436063',
    yahoo: 'BAYN.DE',
};

const daimler_de = {
    id: 'daimler_de',
    onvista: 'Daimler-Aktie-DE0007100000',
    fourTraders: 'DAIMLER-436541',
    yahoo: 'DAI.DE',
};

const deutschePost_de = {
    id: 'deutschePost_de',
    onvista: 'Deutsche-Post-Aktie-DE0005552004',
    fourTraders: 'DEUTSCHE-POST-435996',
    yahoo: 'DPW.F',
};

const sap_se = {
    id: 'sap_se',
    onvista: 'SAP-Aktie-DE0007164600',
    fourTraders: 'SAP-436555',
    yahoo: 'SAP',
};

const infineon_de = {
    id: 'infineon_de',
    onvista: 'Infineon-Aktie-DE0006231004',
    fourTraders: 'INFINEON-TECHNOLOGIES-436299',
    yahoo: 'IFX.DE',
};

exports.ags = [
    commerzbank_de,
    deutscheBank,
    heidelbergCement,
    munichRe,
    basf,
    continental,
    siemens_de,
    volkswagen_st,
    bmw_de,
    allianz_de,
    bayer_de,
    daimler_de,
    deutschePost_de,
    sap_se,
    infineon_de,
];

exports.find = function(id) {
    switch (id) {
    case siemens_de.id:
        return siemens_de;
    case allianz_de.id:
        return allianz_de;
    default:
        return {};
    }
}