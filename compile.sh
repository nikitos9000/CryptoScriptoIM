#!/bin/sh
closure=~/Toolchain/Closure
##python $closure/bin/calcdeps.py -p $closure -p ./ -c $closure/compiler.jar -o compiled -f "--js_output_file=./cryptoscripto.js" -f "--formatting=PRETTY_PRINT" -f "--output_wrapper=\"(function() {%output%})();\"" -i init.js
python $closure/bin/calcdeps.py -p $closure -p ./ -c $closure/compiler.jar -o compiled -f "--js_output_file=./cryptoscripto.js" -f "--compilation_level=ADVANCED_OPTIMIZATIONS" -f "--output_wrapper=\"(function() {%output%})();\"" -i init.js