goog.provide("cryptoscripto.hooks");
goog.require("cryptoscripto.vkhooks");
goog.require("cryptoscripto.utils");
goog.require("cryptoscripto.crypto");
goog.require("cryptoscripto.keyexchange");
goog.require("cryptoscripto.keystorage");


goog.scope(function() {
        var hooks = cryptoscripto.hooks;
        var vkhooks = cryptoscripto.vkhooks;
        var utils = cryptoscripto.utils;
        var crypto = cryptoscripto.crypto;
        var keyexchange = cryptoscripto.keyexchange;
        var keystorage = cryptoscripto.keystorage;

        hooks.sign = "\u24b6";
        hooks.magic = "=FUCKTHESYSTEM=";
        hooks.encryptedmagic = "=ENCRYPTED=";
        hooks.plainmagic = "=PLAIN=";

        hooks.install = function() {
                vkhooks.onUpdateMessages(hooks.onUpdateMessages);
                vkhooks.onUpdateSubmit(hooks.onUpdateSubmit);
        };

        hooks.onUpdateMessages = function() {
                vkhooks.updateMessages(hooks.onMessage);
        };

        hooks.onUpdateSubmit = function() {
                vkhooks.updateSubmit(hooks.onSubmit);
        };

        hooks.onMessage = function(userId, text) {
                if (!utils.startsWith(text, hooks.magic))
                        return text;

                var positionEncrypted = text.indexOf(hooks.encryptedmagic);
                var positionPlain = text.indexOf(hooks.plainmagic);
                var position = positionEncrypted >= 0 ? positionEncrypted : positionPlain;
                var length = positionEncrypted >= 0 ? hooks.encryptedmagic.length : hooks.plainmagic.length;

                var token = text.substring(hooks.magic.length, position);
                var message = text.substring(position + length)

                if (positionEncrypted >= 0)
                        return hooks.sign + " " + crypto.decrypt(key, message);
                return message;
        };

        hooks.onSubmit = function(userId, text) {
                return crypto.encrypt(text);
        };

        hooks._storeToken = function() {
                //
        };
});
