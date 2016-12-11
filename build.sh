vulcanize --inline-css --inline-scripts --strip-comments index.html > dist/index.build.html
html-minifier dist/index.build.html --minify-css --minify-js --remove-comments --collapse-whitespace -o dist/index.html
rm dist/index.build.html
