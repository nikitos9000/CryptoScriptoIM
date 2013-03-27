goog.provide("cryptoscripto.hooks");
goog.require("cryptoscripto.vkhooks");
goog.require("cryptoscripto.utils");
goog.require("cryptoscripto.crypto");
goog.require('goog.dom');
goog.require('goog.dom.classes');


goog.scope(function() {
        var hooks = cryptoscripto.hooks;
        var vkhooks = cryptoscripto.vkhooks;
        var utils = cryptoscripto.utils;
        var crypto = cryptoscripto.crypto;

        hooks.install = function() {
                var servicehooks = vkhooks;

                var text_area = vkhooks.getInputElement();
                var submit_button = vkhooks.getSubmitElement();

                var submit_onclick = submit_button.onclick;

                submit_button.onclick = function() {
                        // alert(text_area);
                        var input_text = goog.dom.getTextContent(text_area);
                        // alert(input_text);
                        // alert(text_area.outerHTML);
                        var new_input_text = hooks.onsubmit(input_text);
                        goog.dom.setTextContent(text_area, new_input_text);

                        return submit_onclick.apply(this, arguments);
                };

                setInterval(hooks.installmessages, 100);
        };

        hooks.installmessages = function() {
                var message_blocks = vkhooks.getMessageElements();

                for (var i = 0; i < message_blocks.length; ++i) {
                        var message_block = message_blocks[i];
                        var message_text = goog.dom.getTextContent(message_block);
                        var new_message_text = hooks.onmessage(message_text);

                        if (new_message_text != message_text)
                                goog.dom.setTextContent(message_block, new_message_text);
                }
        };

        hooks.onmessage = function(value) {
                if (crypto.isEncrypted(value))
                        return crypto.decrypt(value) + " [safe]";
                return value; //+ " [unsafe]";
        };

        hooks.onsubmit = function(value) {
                return crypto.encrypt(value);
        };
});
