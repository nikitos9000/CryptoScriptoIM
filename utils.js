goog.provide("cryptoscripto.utils");

goog.scope(function() {
        var utils = cryptoscripto.utils;

        utils.startsWith = function(string, prefix) {
                return string.substring(0, prefix.length) == prefix;
        };
});