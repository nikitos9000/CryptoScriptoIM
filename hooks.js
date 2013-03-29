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
        hooks.magic = "$FUCKTHESYSTEM$";
        hooks.magicEncrypted = "$ENCRYPTED$";
        hooks.magicPlain = "$PLAIN$";

        hooks.install = function() {
                vkhooks.onUpdateMessages(hooks.onUpdateMessages);
                vkhooks.onUpdateSubmit(hooks.onUpdateSubmit);
        };

        hooks.onUpdateMessages = function() {
                vkhooks.updateMessages(hooks.onMessage);
        };

        hooks.onUpdateSubmit = function() {
                vkhooks.updateSubmit(hooks.onSubmit);

                var status = !!hooks._externalToken(vkhooks.userId());
                hooks.onUpdateStatus(status);
        };

        hooks.onMessage = function(userId, text) {
                if (!utils.startsWith(text, hooks.magic))
                        return text;

                var positionEncrypted = text.indexOf(hooks.magicEncrypted);
                var positionPlain = text.indexOf(hooks.magicPlain);
                var position = positionEncrypted >= 0 ? positionEncrypted : positionPlain;
                var length = positionEncrypted >= 0 ? hooks.magicEncrypted.length : hooks.magicPlain.length;

                var token = text.substring(hooks.magic.length, position);
                var message = text.substring(position + length);

                hooks._externalToken(userId, token);

                var secretToken = hooks._secretToken(userId);

                if (positionEncrypted >= 0 && secretToken.isNew) {
                        alert("Warning: broken keys!\nYou should clear your keys and re-establish exchange.");
                        hooks._clearTokens();
                }

                if (positionEncrypted >= 0 && secretToken && !secretToken.isNew)
                        return hooks.sign + " " + crypto.decrypt(secretToken, message);

                return message;
        };

        hooks.onUpdateStatus = function(status) {
              vkhooks.updateStatus(status, hooks);
        };

        hooks.onSubmit = function(userId, text) {
                var internalToken = hooks._internalToken(userId);
                var secretToken = hooks._secretToken(userId);

                var prefix = hooks.magic + internalToken.publicToken;

                if (secretToken)
                        return prefix + hooks.magicEncrypted + crypto.encrypt(secretToken, text);

                return prefix + hooks.magicPlain + text;
        };

        hooks._secretToken = function(userId) {
                var secretToken = keystorage.load(userId + "secretToken");
                var externalToken = hooks._externalToken(userId);

                if (!secretToken && externalToken) {
                        var internalToken = hooks._internalToken(userId);

                        secretToken = keyexchange.secret({
                                privateToken: internalToken.privateToken, 
                                publicToken: externalToken
                        });

                        keystorage.store(userId + "secretToken", secretToken);
                }
                return secretToken;
        };

        hooks._internalToken = function(userId) {
                var privateToken = keystorage.load(userId + "privateToken");
                var publicToken = keystorage.load(userId + "publicToken");

                if (privateToken && publicToken)
                        return { publicToken: publicToken, privateToken: privateToken }

                var internalToken = keyexchange.token();
                keystorage.store(userId + "privateToken", internalToken.privateToken);
                keystorage.store(userId + "publicToken", internalToken.publicToken);
                keystorage.clear(userId + "secretToken");
                internalToken.isNew = true;
                return internalToken;
        };

        hooks._externalToken = function(userId, externalToken) {
                if (externalToken) {
                        var internalToken = hooks._internalToken(userId);

                        if (internalToken.publicToken != externalToken) {
                                var currentExternalToken = keystorage.load(userId + "externalToken");

                                if (currentExternalToken && currentExternalToken != externalToken)
                                        keystorage.clear(userId + "secretToken");

                                keystorage.store(userId + "externalToken", externalToken);
                                hooks.onUpdateStatus(true);
                                return externalToken;
                        }
                }
                return keystorage.load(userId + "externalToken");
        };

        hooks._clearTokens = function(userId) {
                keystorage.clear(userId + "privateToken");
                keystorage.clear(userId + "publicToken");
                keystorage.clear(userId + "secretToken");
                keystorage.clear(userId + "externalToken");
        };
});
