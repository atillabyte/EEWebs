#!/bin/bash
# yarn add google-closure-compiler

rm -rf 'dist/eewebs.min.js'
yarn google-closure-compiler --rewrite_polyfills=false --compilation_level=SIMPLE --js=js/eewebs.js --js=js/init.js --js_output_file=dist/eewebs.min.js