goog.provide("cryptoscripto.keyexchange");
goog.require("cryptoscripto.bigint");

goog.scope(function() {
        var keyexchange = cryptoscripto.keyexchange;
        var bigint = cryptoscripto.bigint;

        keyexchange.modulus = bigint.str2bigInt("112457129983317064494133258034491756790943511028023366901014968560410379195027", 10, 100);
        keyexchange.generator = bigint.str2bigInt("3", 10, 1);

        keyexchange.newToken = function() {
                return bigint.randBigInt(256);
        };

        keyexchange.newPublicToken = function(token) {
                return bigint.powMod(keyexchange.generator, token, keyexchange.modulus);
        };

        keyexchange.newSecretToken = function(token, publicToken) {
                return bigint.powMod(publicToken, token, keyexchange.modulus);
        }

        keyexchange.toString = function(token) {
                return bigint.bigInt2str(token, 10);
        }
});