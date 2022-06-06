"use strict";
{
    var defaults = {
        symbol: '$',
        separator: ',',
        decimal: '.',
        formatWithSymbol: false,
        errorOnInvalid: false,
        precision: 2,
        pattern: '!#',
        negativePattern: '-!#'
    };
}
{
    var round_1 = function (v) { return Math.round(v); };
    var pow = function (p) { return Math.pow(10, p); };
    var rounding = function (value, increment) { return round_1(value / increment) * increment; };
    console.log(round_1(1));
}
