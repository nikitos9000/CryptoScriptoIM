goog.provide("cryptoscripto.utils");

goog.scope(function() {
        var utils = cryptoscripto.utils;

        // utils.getSingleElement = function(selector) {
        //         if (selector[0] == "#")
        //                 return goog.dom.getElement(selector.substring(1));
        //         if (selector[0] == ".")
        //                 return goog.dom.getElementByClass(selector.substring(1), goog.dom.getElementByClass("im_txt_wrap"));
        // };

        // utils.getMultipleElements = function(selector) {
        //         if (selector[0] == "#")
        //                 return [goog.dom.getElement(selector.substring(1))];
        //         if (selector[0] == ".")
        //                 return goog.dom.getElementsByClass(selector.substring(1));
        // };

        utils.startsWith = function(string, prefix) {
                return string.substring(0, prefix.length) == prefix;
        };
});