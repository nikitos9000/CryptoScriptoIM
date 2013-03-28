goog.provide("cryptoscripto.utils");

goog.scope(function() {
        var utils = cryptoscripto.utils;

        utils.startsWith = function(string, prefix) {
                return string.substring(0, prefix.length) == prefix;
        };

        utils.wrap = function(func, wrapper) {
                var result = function() {
                        wrapper.apply(this, arguments);
                        return func.apply(this, arguments);
                };

                result.isWrapper = true;
                return result;
        };
});