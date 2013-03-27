goog.provide("cryptoscripto.crypto");
goog.require("cryptoscripto.utils");
goog.require("goog.crypt");
goog.require("goog.crypt.Aes");
goog.require("goog.crypt.Cbc");
goog.require("goog.crypt.base64");
// goog.require("goog.crypt.Sha256");
goog.require("goog.math");

goog.scope(function() {
        var crypto = cryptoscripto.crypto;
        var utils = cryptoscripto.utils;

        crypto.key = "P@ssw0rd";
        crypto.magic = "=CS=";

        crypto.encrypt = function(value) {
                var engine = crypto.engine(crypto.key);
                var result = engine.cipher.encrypt(goog.crypt.stringToByteArray(value), engine.vector);

                return crypto.magic + goog.crypt.base64.encodeByteArray(result);
        };

        crypto.decrypt = function(value) {
                var engine = crypto.engine(crypto.key);

                value = goog.crypt.base64.decodeStringToByteArray(value.substring(crypto.magic.length));

                return goog.crypt.byteArrayToString(engine.cipher.decrypt(value, engine.vector));
        };

        crypto.isEncrypted = function(value) {
                return utils.startsWith(value, crypto.magic);
        };

        crypto.engine = function(password) {
                // var sha256 = goog.crypt.Sha256();
                // sha256.update(goog.crypt.stringToByteArray(password));

                // var key = sha256.digest();
                var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];

                var vector = [ 11, 12, 13, 14, 15, 16, 17, 18, 19, 110, 111, 112, 113, 114, 115, 116 ];
                // var vector = [];
                // for (var i = 0; i < 16; ++i)
                //         vector.push(goog.math.randomInt(256));

                var provider = new goog.crypt.Aes(key);
                var cipher = new goog.crypt.Cbc(provider);

                return { cipher: cipher, vector: vector };
        };
});