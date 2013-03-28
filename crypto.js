goog.provide("cryptoscripto.crypto");
goog.require("cryptoscripto.utils");
goog.require("cryptoscripto.keyexchange");
goog.require("goog.crypt");
goog.require("goog.crypt.Aes");
goog.require("goog.crypt.Cbc");
goog.require("goog.crypt.base64");


goog.scope(function() {
        var crypto = cryptoscripto.crypto;
        var utils = cryptoscripto.utils;
        var keyexchange = cryptoscripto.keyexchange;

        crypto.key = "P@ssw0rd";
        crypto.magic = "=FUCKTHESYSTEM=";
        crypto.keymagic = "=FIGHTDAPOWER=";

        crypto.encrypt = function(value) {
                var engine = crypto.engine(crypto.key);

                return crypto.magic + engine.encrypt(value);
        };

        crypto.decrypt = function(value) {
                var engine = crypto.engine(crypto.key);

                return engine.decrypt(value.substring(crypto.magic.length));
        };

        crypto.isEncrypted = function(value) {
                return utils.startsWith(value, crypto.magic);
        };

        crypto.engine = function(key) {
                var keyLength = 16;
                var blockLength = 16;
                var keyByteArray = goog.crypt.stringToUtf8ByteArray(key);

                var keyArray = [];
                for (var i = 0; i < keyLength; ++i)
                        keyArray.push(keyByteArray[i % keyByteArray.length]);

                var vectorByteArray = [];
                for (var i = 0; i < blockLength; ++i)
                        vectorByteArray.push(i);

                var provider = new goog.crypt.Aes(keyArray);
                var cipher = new goog.crypt.Cbc(provider, blockLength);

                return {
                        encrypt: function(text) {
                                var plainByteArray = goog.crypt.stringToUtf8ByteArray(text);

                                for (var i = 0; i < plainByteArray.length % blockLength; ++i)
                                        plainByteArray.push(0);

                                var cipherByteArray = cipher.encrypt(plainByteArray, vectorByteArray);
                                return goog.crypt.base64.encodeByteArray(cipherByteArray);
                        },

                        decrypt: function(text) {
                                var cipherByteArray = goog.crypt.base64.decodeStringToByteArray(text);
                                var plainByteArray = cipher.decrypt(cipherByteArray, vectorByteArray);

                                var resultByteArray = [];
                                for (var i = 0; i < plainByteArray.length; ++i) {
                                        if (plainByteArray[i] > 0)
                                                resultByteArray.push(plainByteArray[i]);
                                }

                                return goog.crypt.utf8ByteArrayToString(resultByteArray);
                        }
                };
        };
});