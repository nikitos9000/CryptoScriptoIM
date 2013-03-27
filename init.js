goog.provide('cryptoscripto.init');
goog.require('cryptoscripto.hooks');

goog.scope(function() {
        var init = cryptoscripto.init;
        var hooks = cryptoscripto.hooks;

        init.start = function() {
                hooks.install();
        };

        init.start();
});