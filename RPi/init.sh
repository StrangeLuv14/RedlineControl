###configure network settings
#sudo cat ~/network.conf >> /etc/network/interfaces

###remove nodejs
#sudo apt-get remove --purge node* npm* 

###install nvm
#curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
#nvm install 8.11.2
#nvm alias default v8.11.2
#nvm use default

###install forever
#npm install forever -g

###configure forever
#crontab ~/crontab.conf

###clone remote project
#mkdir ~/Redline
#cd ~/Redline
#git clone https://github.com/StrangeLuv14/RedlineControl.git

###set production environment
#echo "NODE_ENV=production" >> /etc/environment

###build project
#cd ~/Redline/RedlineControl/client
#npm install
#npm run build
#cd ~/Redline/RedlineControl/server
#npm install

