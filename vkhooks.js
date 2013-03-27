goog.provide("cryptoscripto.vkhooks");
goog.require('goog.dom');

goog.scope(function() {
        var vkhooks = cryptoscripto.vkhooks;

        vkhooks.getInputElement = function() {
                var domElements = goog.dom.getElementsByClass("im_txt_wrap");
                for (var i = 0; i < domElements.length; ++i)
                        if (domElements[i].style.display != "none")
                                return goog.dom.getElementByClass("im_editable", domElements[i]);
        };

        vkhooks.getMessageElements = function() {
                var domElements = goog.dom.getElementsByClass("im_msg_text");
                var messageElements = [];
                for (var i = 0; i < domElements.length; ++i) {
                        if (domElements[i].style.display != "none") 
                                messageElements.push(domElements[i]);
                }
                return messageElements;
        };

        vkhooks.getSubmitElement = function() {
                return goog.dom.getElement("im_send");
        };
});