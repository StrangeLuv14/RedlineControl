###configure network settings
sudo cat ~/network.conf >> /etc/network/interfaces
# restart network service
sudo /etc/init.d/networking restart

###remove nodejs
# sudo apt-get remove --purge node* npm*

###install mongodb
#Import the public key used by the package management system
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
#Create a /etc/apt/sources.list.d/mongodb-org-4.0.list file for MongoDB.
echo "deb http://repo.mongodb.org/apt/debian jessie/mongodb-org/4.0 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
# Reload local package database.
sudo apt-get update
# Install the MongoDB packages.
sudo apt-get install -y mongodb-org


###install nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
#nvm install 8.11.2
. ~/.bashrc
nvm install node
nvm alias default v8.11.2
nvm use default

###clone remote project
git clone https://github.com/StrangeLuv14/RedlineControl.git

###build project
cd ~/Redline/RedlineControl/server
npm install
