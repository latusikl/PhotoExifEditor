#!/bin/bash

check_if_k6_installed() {
  if ! command -v k6 &> /dev/null
  then
    echo -e "It is required to have K6 installed.\nCheck how to install: https://k6.io/docs/getting-started/installation/"
    exit 2
  fi
}

run_tests(){
  for i in "${files[@]}"
  do
     :
    k6 run ./src/"$i" -e REMOTE="$1"
  done
}

files=(load-page.js read-exif.js write-exif.js full-scenario.js)

if [ "$1" == "local" ]
then
  check_if_k6_installed
  run_tests false
elif [ "$1" == "remote" ]
then
  check_if_k6_installed
  run_tests true
else
  echo -e "Available run modes are: remote, local. \nUsage: ./run.sh <MODE_NAME>"
  exit 1
fi


