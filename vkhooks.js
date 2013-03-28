goog.provide("cryptoscripto.vkhooks");
goog.require("cryptoscripto.utils");
goog.require('goog.dom');


goog.scope(function() {
        var vkhooks = cryptoscripto.vkhooks;
        var utils = cryptoscripto.utils;

        vkhooks.onUpdateMessages = function(callback) {
                window["IM"]["panelUpdate"] = utils.wrap(window["IM"]["panelUpdate"], callback, false);
                window["IM"]["addMsg"] = utils.wrap(window["IM"]["addMsg"], callback, true);
        };

        vkhooks.onUpdateSubmit = function(callback) {
                callback();
        };

        vkhooks.updateMessages = function(handler) {
                var messageElements = goog.dom.getElementsByClass("im_msg_text");
                var userId = vkhooks._userId();

                for (var i = 0; i < messageElements.length; ++i) {
                        if (vkhooks._isVisible(messageElements[i])) {
                                var messageElement = messageElements[i];
                                var messageText = goog.dom.getTextContent(messageElement);
                                var newMessageText = handler(userId, messageText);
                                if (newMessageText != messageText)
                                        goog.dom.setTextContent(messageElement, newMessageText);
                        }
                }
        };

        vkhooks.updateSubmit = function(handler) {
                window["IM"]["send"] = utils.wrap(window["IM"]["send"], function() {
                        var inputElement = vkhooks._inputElement();
                        var userId = vkhooks._userId(inputElement);

                        var inputText = goog.dom.getTextContent(inputElement);
                        var newInputText = handler(userId, inputText);
                        if (newInputText != inputText)
                                goog.dom.setTextContent(inputElement, newInputText);
                }, false);

                var submitElement = goog.dom.getElement("im_send");
                submitElement.onclick = window["IM"]["send"];
        };

        vkhooks.updateStatus = function(status, data) {
                var submitElement = goog.dom.getElement("im_send");
                var submitLabel = goog.dom.getTextContent(submitElement);
                var prefix = data.sign + " ";

                if (status && !utils.startsWith(submitLabel, prefix)) {
                        goog.dom.setTextContent(submitElement, prefix + submitLabel);
                } else if (!status && utils.startsWith(submitLabel, prefix)) {
                        goog.dom.setTextContent(submitElement, submitLabel.substring(prefix.length));
                }
        };

        vkhooks._isVisible = function(element) {
                return element.style.display != "none";
        };

        vkhooks._userId = function(inputElement) {
                inputElement = inputElement || vkhooks._inputElement();
                return inputElement.id.substring("im_editable".length);
        };

        vkhooks._inputElement = function() {
                var inputElements = goog.dom.getElementsByClass("im_txt_wrap");
                for (var i = 0; i < inputElements.length; ++i)
                        if (vkhooks._isVisible(inputElements[i]))
                                return goog.dom.getElementByClass("im_editable", inputElements[i]);
        }
});