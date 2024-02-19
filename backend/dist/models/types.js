"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegex = exports.instrument_regex = exports.Instruments = void 0;
var Instruments;
(function (Instruments) {
    Instruments[Instruments["NSE_EQ|INE669E01016"] = 0] = "NSE_EQ|INE669E01016";
    Instruments[Instruments["NSE_EQ|INE040H01021"] = 1] = "NSE_EQ|INE040H01021";
    Instruments[Instruments["NSE_FO|46794"] = 2] = "NSE_FO|46794";
    Instruments[Instruments["NSE_FO|66716"] = 3] = "NSE_FO|66716";
})(Instruments = exports.Instruments || (exports.Instruments = {}));
exports.instrument_regex = /^(?:^NSE_EQ|NSE_FO|NCD_FO|BSE_EQ|BSE_FO|BCD_FO|MCX_FO|NSE_INDEX|BSE_INDEX|MCX_INDEX)\|[\w ]+(,(?:NSE_EQ|NSE_FO|NCD_FO|BSE_EQ|BSE_FO|BCD_FO|MCX_FO|NSE_INDEX|BSE_INDEX|MCX_INDEX)\|[\w ]+)*?$/;
function validateRegex(regex, input) {
    return regex.test(input);
}
exports.validateRegex = validateRegex;
