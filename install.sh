apt-get update
apt-get install imagemagick php5-imagick -y
apt-get install npm -y
apt-get install nodejs-legacy -y
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
apt-get update
apt-get install -y mongodb-org
service mongod status
mongorestore -d garden-prod ./dump/
mongorestore -d garden-dev ./dump/
npm install
npm start &
