### Docker and docker compose installation

Install docker engine and docker compose from the [installation instructions](https://docs.docker.com/engine/install/ubuntu/) on docker website

Follow the instructions for "Install using the repository"

1. Setup the repository

```
sudo apt-get update
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

```

```
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

```

```
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

```

2. Install the docker engine, containerd and docker compose

```
sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin

```

3. Verify installation and version

```
sudo docker run hello-world

sudo docker version
sudo docker compose version

```

### Run Docker commands as non root user

[Reference Link](https://docs.docker.com/engine/install/linux-postinstall/#)

1. Create the docker group

```
sudo groupadd docker

```

2. Add your to the docker group

```
sudo usermod -aG docker `whoami`

```

3. Activate group changes

```
newgrp docker

```

4. Verify that docker command can be run as non root user

```
docker run hello-world

```

5. Make sure the docker compose version is 2.14.0 or later

```
docker compose version

```
