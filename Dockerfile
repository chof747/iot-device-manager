FROM node:latest

WORKDIR /usr/src/app
# RUN apt-get update && apt-get install -y  \
#    sqlite3

# Install app dependencies
COPY ./package.json ./
RUN npm install

COPY . ./

CMD [ "bash", "-c", "bash ./update-db.sh && npm run start"]