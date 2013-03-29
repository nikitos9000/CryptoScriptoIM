goog.provide("cryptoscripto.keystorage");
goog.require("goog.storage.Storage");
goog.require("goog.storage.mechanism.HTML5LocalStorage");

goog.scope(function() {
        var keystorage = cryptoscripto.keystorage;

        keystorage.store = function(key, value) {
                var storage = keystorage._storage();
                return storage.set(key, value);
        };

        keystorage.load = function(key) {
                var storage = keystorage._storage();
                return storage.get(key);
        };

        keystorage.clear = function(key) {
                var storage = keystorage._storage();
                return storage.remove(key);
        };

        keystorage._storage = function() {
                return new goog.storage.Storage(new goog.storage.mechanism.HTML5LocalStorage());
        };
});
