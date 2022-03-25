#!/bin/bash
set -xeuo pipefail

pushd reveng-3.0.2

find . -name '*.o'

emcc -O3 -Wall -ansi -c \
  bmpbit.c cli.c model.c poly.c preset.c reveng.c

pushd contrib
emcc -O3 -Wall -ansi -c getopt.c
popd

emcc \
  -s WASM=1 \
  -s MODULARIZE=1 \
  -s EXPORT_ES6=1 \
  -s EXIT_RUNTIME=1 \
  -s EXPORTED_FUNCTIONS="['_reveng', '_main']" \
  -s EXPORTED_RUNTIME_METHODS="['ccall', 'cwrap']" \
  -o ../reveng.js \
  bmpbit.o cli.o model.o poly.o preset.o reveng.o contrib/getopt.o
