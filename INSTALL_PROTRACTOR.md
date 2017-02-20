UBUNTU: install protractor (if run tests in local machine):
---------------------------------------------------------
#Install Node, npm:
sudo apt-get -y install nodejs
sudo apt-get -y install npm

#Install ProtractorJs:
sudo npm install -g protractor
sudo npm install -g n
sudo n stable

#Install OpenJDK:
sudo add-apt-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-java7-installer
sudo apt-get install openjdk-7-jdk

#Update webdriver-manager:
webdriver-manager update

#Install Google Chrome:
sudo apt-get install libxss1 libappindicator1 libindicator7
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome*.deb
sudo apt-get install -f

#Install xvfb:
sudo apt-get install xvfb

#Install ChromeDriver:
sudo apt-get install unzip
wget -N http://chromedriver.storage.googleapis.com/2.26/chromedriver_linux64.zip
unzip chromedriver_linux64.zip
chmod +x chromedriver
sudo mv -f chromedriver /usr/local/share/chromedriver
sudo ln -s /usr/local/share/chromedriver /usr/local/bin/chromedriver
sudo ln -s /usr/local/share/chromedriver /usr/bin/chromedriver

#Install npm modules:
sudo npm install -g protractor-html-reporter
sudo npm install -g jasmine-allure-reporter
sudo npm install -g testrail-promise