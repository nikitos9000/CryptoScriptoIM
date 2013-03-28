goog.provide("cryptoscripto.vkhooks");
goog.require('goog.dom');

goog.scope(function() {
        var vkhooks = cryptoscripto.vkhooks;

        vkhooks.onUpdateMessages = function(callback) {
                //check for changes
                setInterval(callback, 1000);
        };

        vkhooks.onUpdateSubmit = function(callback) {
                //check for changes
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
                var inputElement = vkhooks._inputElement(); //null;
                var userId = vkhooks._userId(inputElement);

                // var inputElements = goog.dom.getElementsByClass("im_txt_wrap");
                // for (var i = 0; i < inputElements.length; ++i)
                //         if (vkhooks._isVisible(inputElements[i]))
                //                 inputElement = goog.dom.getElementByClass("im_editable", inputElements[i]);

                var inputHandler = function() {
                        var inputText = goog.dom.getTextContent(inputElement);
                        var newInputText = handler(userId, inputText);
                        if (newInputText != inputText)
                                goog.dom.setTextContent(inputElement, newInputText);
                };

                // Fix it
                // var inputOnKeyPress = inputElement.onkeypress;

                // inputElement.onkeypress = function(event) {
                //         if (event.keyCode == 13)
                //                 inputHandler();
                //         return inputOnKeyPress && inputOnKeyPress.apply(this, arguments);
                // };

                var submitElement = goog.dom.getElement("im_send");
                var submitOnClick = submitElement.onclick;

                submitElement.onclick = function() {
                        inputHandler();
                        return submitOnClick.apply(this, arguments);
                };
        };

        vkhooks._isVisible = function(element) {
                return element.style.display != "none";
        };

        vkhooks._userId = function(inputElement) {
                inputElement = inputElement || vkhooks._inputElement();
                return inputElement.substring("im_editable".length);
        };

        vkhooks._inputElement = function() {
                var inputElements = goog.dom.getElementsByClass("im_txt_wrap");
                for (var i = 0; i < inputElements.length; ++i)
                        if (vkhooks._isVisible(inputElements[i]))
                                return goog.dom.getElementByClass("im_editable", inputElements[i]);
        }
});