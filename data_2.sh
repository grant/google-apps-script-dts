#!/bin/bash
FILES=data_1/*
for f in $FILES
do
  echo "Processing $f file..."
  # take action on each file. $f store current file name
  # echo $f > "data_2/$f"
done