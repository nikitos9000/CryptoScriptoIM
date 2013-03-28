goog.provide("cryptoscripto.utils");

goog.scope(function() {
        var utils = cryptoscripto.utils;

        utils.startsWith = function(string, prefix) {
                return string.substring(0, prefix.length) == prefix;
        };

        utils.wrap = function(func, wrapper, after) {
                if (func.isWrapper) return func;

                var new_func = function() {
                        if (!after)
                                wrapper.apply(this, arguments);
                        var result = func.apply(this, arguments);
                        if (after)
                                wrapper.apply(this, arguments);
                        return result;
                };

                new_func.isWrapper = true;
                return new_func;
        };
});