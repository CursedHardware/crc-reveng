#!/bin/bash
set -xeuo pipefail

pushd reveng-3.0.5

find . -name '*.o' | xargs rm -v

emcc -O3 -Wall -ansi -c -DPRESETS=1 $(find . -depth 1 -name '*.c')

emcc -O3 -Wall -ansi -c -DPRESETS=1 $(find contrib -depth 1 -name '*.c')

emcc \
  -s WASM=1 \
  -s MODULARIZE=1 \
  -s EXPORT_ES6=1 \
  -s EXIT_RUNTIME=1 \
  -s EXPORTED_FUNCTIONS="['_reveng', '_main']" \
  -s EXPORTED_RUNTIME_METHODS="['ccall', 'cwrap']" \
  -o ../reveng.js \
  $(find . -name '*.o')
