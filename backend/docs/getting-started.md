### 1. Setup your developer machine

Make sure your laptop is running Ubuntu 22.04

#### 1.1 Install node version manager(NVM)

Follow these [instructions](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-22-04) from digital ocean to install Node.js using NVM (option 3)

```
sudo apt install curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
source ~/.bashrc

```

#### 1.2 Install Node.js

```
nvm list-remote
nvm install v18.12.1
node --version (should show v18.12.1)
npm --version (should show 8.19.2)
```

#### 1.3 Install Yarn

```
npm install --global yarn
yarn --version (should show 1.22.19)

```

#### 1.4 Install Git

Follow instructions from this [location](https://www.digitalocean.com/community/tutorials/how-to-install-git-on-ubuntu-22-04) on digital ocean.

```
sudo apt install git
git --version (should show 2.25.1 or later)

```

#### 1.5 Install Docker and Docker Compose

Follow the instruction in [docker setup](docker-setup.md) to install docker and docker compose plugin
