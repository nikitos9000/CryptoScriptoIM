goog.provide("cryptoscripto.vkhooks");
goog.require('goog.dom');

goog.scope(function() {
        var vkhooks = cryptoscripto.vkhooks;

        // vkhooks.getInputElement = function() {
        //         var inputElements = goog.dom.getElementsByClass("im_txt_wrap");
        //         for (var i = 0; i < inputElements.length; ++i)
        //                 if (_isVisible(inputElements[i]))
        //                         return goog.dom.getElementByClass("im_editable", inputElements[i]);
        // };

        // vkhooks.getMessageElements = function() {
        //         var domElements = goog.dom.getElementsByClass("im_msg_text");
        //         var messageElements = [];
        //         for (var i = 0; i < domElements.length; ++i) {
        //                 if (domElements[i].style.display != "none") 
        //                         messageElements.push(domElements[i]);
        //         }
        //         return messageElements;
        // };

        // vkhooks.getSubmitElement = function() {
        //         return goog.dom.getElement("im_send");
        // };

        vkhooks.updateMessages = function(handler) {
                var messageElements = goog.dom.getElementsByClass("im_msg_text");

                for (var i = 0; i < messageElements.length; ++i) {
                        if (vkhooks._isVisible(messageElements[i])) {
                                var messageElement = messageElements[i];
                                var messageText = goog.dom.getTextContent(messageElement);
                                var newMessageText = handler(messageText);
                                if (newMessageText != messageText)
                                        goog.dom.setTextContent(messageElement, newMessageText);
                        }
                }
        };

        vkhooks.updateSubmit = function(handler) {
                var inputElement = null;

                var inputElements = goog.dom.getElementsByClass("im_txt_wrap");
                for (var i = 0; i < inputElements.length; ++i)
                        if (vkhooks._isVisible(inputElements[i]))
                                inputElement = goog.dom.getElementByClass("im_editable", inputElements[i]);

                var inputHandler = function() {
                        var inputText = goog.dom.getTextContent(inputElement);
                        var newInputText = handler(inputText);
                        if (newInputText != inputText)
                                goog.dom.setTextContent(inputElement, newInputText);
                };

                var inputOnKeyPress = inputElement.onkeypress;

                inputElement.onkeypress = function(event) {
                        if (event.keyCode == 13)
                                inputHandler();
                        return inputOnKeyPress && inputOnKeyPress.apply(this, arguments);
                };

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
});