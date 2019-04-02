#!/bin/bash

# Make folders
mkdir -p data_2

FILES=data_1/*
for f in $FILES
do
  # Take folders data_1, data_2
  JSON="${f:7}"
  DATA_1="data_1/$JSON"
  DATA_2="data_2/$JSON"
  DATA_3="data_3/$JSON"
  echo $JSON

  cp $DATA_1 $DATA_2

  # Remove first line.
  (cat $DATA_2 | sed -n '1!p') > $DATA_3
done
