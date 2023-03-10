#!/bin/bash

set -eu

script_dir="$(cd $(dirname $0); pwd)"
keys_dir="$(cd $script_dir/../keys; pwd)"

cd $keys_dir
openssl ecparam -name prime256v1 -genkey -out privkey.pem

openssl req -new -key privkey.pem -out csr.pem -subj "/C=JP/ST=TOKYO/L=NISHI-WASEDA/O=URTH INC/OU=DEVELOPMENT/CN=http2-streawm-example.u-rth.dev"

openssl x509 -req -in csr.pem -out cert.pem -signkey privkey.pem -days 90 -sha256
