#/bin/bash

# update database
cd src 
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
cd ..

#make directory infrastructure

mkdir -p $FIRMWARE_STAGE
mkdir -p $FIRMWARE_STORAGE