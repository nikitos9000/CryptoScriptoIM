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

        hooks.sign = "\u24b6";
        hooks.messagemagic = "=FUCKTHESYSTEM=";
        hooks.keymagic = "=FIGHTDAPOWER=";

        hooks.key = { };
        hooks.token = { };

        hooks.install = function() {
                vkhooks.onUpdateMessages(hooks.onUpdateMessages);
                vkhooks.onUpdateSubmit(hooks.onUpdateSubmit);
        };

        hooks.onUpdateMessages = function() {
                vkhooks.updateMessages(hooks.onmessage);
        };

        hooks.onUpdateSubmit = function() {
                vkhooks.updateSubmit(hooks.onsubmit);
        };

        hooks.onmessage = function(userId, text) {
                //check if it is key DH-token
                //check if it is encrypted message
                if (crypto.isEncrypted(text))
                        return hooks.sign + " " + crypto.decrypt(text);
                return text;
        };

        hooks.onsubmit = function(userId, text) {
                return crypto.encrypt(text);
        };
});
