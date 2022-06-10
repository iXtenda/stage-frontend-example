// @ts-check

//#region require
// Stage
const STAGE = require("./stage-frontend");
const Request = STAGE.Request;
const LanguagePayload = STAGE.LanguagePayload;
const LANG_ENDPOINT = STAGE.SET_LANG_ENDPOINT;
const VISIT_ENDPOINT = STAGE.VISIT_ENDPOINT;
// Furioos
const SDK = require("furioos-sdk");
const Player = SDK.Player;
//#endregion
//#region Configure
const player = new Player('LTjwPCcFacDmREPAq', 'furioos_container', {
    whiteLabel: true,
    hideTitle: true,
    hideToolbar: false,
    hidePlayButton: false,
    debugAppMode: false,
});
player.onSDKMessage(onSDKMessage);
//#endregion
//#region functions
/**
 * @param {string} data
 */
function onSDKMessage(data) {
    console.log(data);
    let req = JSON.parse(data);
    if (req == undefined || req.payload == undefined)
        return;
    // Add new endpoints here
    switch (req.endPoint) {
        case VISIT_ENDPOINT: window.open(req.payload.Url);
        default: return;
    }
}
/**
 * @param {string} lang Language
 */
function selectLang(lang) {
    let req = new Request(LANG_ENDPOINT, new LanguagePayload(lang));
    player.sendSDKMessage(req);
}
//#endregion

module.exports = { selectLang };
