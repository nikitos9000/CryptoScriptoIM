goog.provide("cryptoscripto.keyexchange");
goog.require("cryptoscripto.bigint");
goog.require("goog.crypt");
goog.require("goog.crypt.base64");

goog.scope(function() {
        var keyexchange = cryptoscripto.keyexchange;
        var bigint = cryptoscripto.bigint;

        keyexchange.keylength = 256;
        keyexchange.modulus = bigint.str2bigInt("112457129983317064494133258034491756790943511028023366901014968560410379195027", 10, 0);
        keyexchange.generator = bigint.str2bigInt("3", 10, 0);

        keyexchange.token = function() {
                var privateToken = keyexchange.newToken();
                var publicToken = keyexchange.newPublicToken(privateToken);

                var privateTokenByteArray = goog.crypt.hexToByteArray(keyexchange.toHexString(privateToken));
                var publicTokenByteArray = goog.crypt.hexToByteArray(keyexchange.toHexString(publicToken));

                return {
                        privateToken: goog.crypt.base64.encodeByteArray(privateTokenByteArray),
                        publicToken: goog.crypt.base64.encodeByteArray(publicTokenByteArray)
                };
        };

        keyexchange.secret = function(token) {
                var privateTokenByteArray = goog.crypt.base64.decodeStringToByteArray(token.privateToken);
                var publicTokenByteArray = goog.crypt.base64.decodeStringToByteArray(token.publicToken);

                var privateToken = keyexchange.fromHexString(goog.crypt.byteArrayToHex(privateTokenByteArray));
                var publicToken = keyexchange.fromHexString(goog.crypt.byteArrayToHex(publicTokenByteArray));

                var secretToken = keyexchange.newSecretToken(privateToken, publicToken);
                var secretTokenByteArray = goog.crypt.hexToByteArray(keyexchange.toHexString(secretToken));

                return goog.crypt.base64.encodeByteArray(secretTokenByteArray);
        };

        keyexchange.newToken = function() {
                return bigint.randBigInt(keyexchange.keylength);
        };

        keyexchange.newPublicToken = function(privateToken) {
                return bigint.powMod(keyexchange.generator, privateToken, keyexchange.modulus);
        };

        keyexchange.newSecretToken = function(privateToken, publicToken) {
                return bigint.powMod(publicToken, privateToken, keyexchange.modulus);
        };

        keyexchange.toHexString = function(token) {
                return bigint.bigInt2str(token, 16);
        };

        keyexchange.fromHexString = function(token) {
                return bigint.str2bigInt(token, 16, 0);
        }
});