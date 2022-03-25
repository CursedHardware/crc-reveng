# CRC-RevEng

## Build Script

```bash
#!/bin/bash
set -xeuo pipefail

find . -name '*.o' -delete

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
 -o reveng.js \
 bmpbit.o cli.o model.o poly.o preset.o reveng.o contrib/getopt.o
```
