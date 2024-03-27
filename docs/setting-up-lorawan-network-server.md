# Setting up SVStem LoRaWan Network server

## Clone this repo onto the server

```
mkdir /data/docker/
cd /data/docker/
git clone https://github.com/Scouts-Victoria-Program/lora-network-server.git
```

## Configure enp1s0 and br0 via netplan

```
sudo ln -sf `pwd`/configuration/netplan/01-lora-network-config.yaml /etc/netplan/01-lora-network-config.yaml

sudo netplan apply
```

## Enabling routing across the network

Source: https://ubuntu.com/server/docs/network-configuration

```
sudo vim /etc/sysctl.conf
sudo /etc/init.d/networking restart
```

Edit the following line:

```
net.ipv4.ip_forward = 1
```

## Install docker

> Dont use docker via snap!

```
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh ./get-docker.sh
rm ./get-docker.sh
```

## Disable systemd-resolved's DNS server.

Source: https://www.turek.dev/posts/disable-systemd-resolved-cleanly/

```
sudo mkdir -p /etc/systemd/resolved.conf.d/
sudo tee -a /etc/systemd/resolved.conf.d/disable-stub.conf > /dev/null << EOF
[Resolve]
DNSStubListener=no
EOF
sudo ln -sf /run/systemd/resolve/resolv.conf /etc/resolv.conf
sudo systemctl restart systemd-resolved
```

## Create .env file from template

```
cp .env.template .env

# Copy result to use as the secret key in the env file
openssl rand -base64 32

vim .env
```

## Start docker containers

```
sudo docker compose up -d
```

To later stop the containers use

```
sudo docker compose down
```

## Import LoRa device templates

```
sudo chown darends:user ./lorawan-devices-repo
git clone https://github.com/brocaar/lorawan-devices ./lorawan-devices-repo
sudo docker compose exec chirpstack sh

# inside container
chirpstack -c /etc/chirpstack import-legacy-lorawan-devices-repository -d /tmp/lorawan-devices
exit

# outside container
rm -rf ./lorawan-devices-repo
```

## Configure Gateway in Chirpstack

### Get gateway ID

1. Browse to http://lora-gateway.darends.scouthack.com
   1. Login using username `sentrius` and password: `RG1xx`
1. Find the gateway id Gateway ID (EUI64)
   1. Copy it
1. Optional steps
   1. Navigate to "Settings > Save/Restore Settings" to make a back up of the configuration
   1. Navigate to "LoRa > Forwarder"
   1. Check forwarder address is au1.cloud.thethings.network:1700

### Add gateway to Chirpstack

1. Browse to http://chirpstack.darends.scouthack.com
   1. Login using username `admin` and password: `admin`
1. Create Gateway
   1. Configure gateway id "Gateway ID (EUI64)"

## Configure Chirpstack application ID in Lora Proxy

1. Browse to http://chirpstack.darends.scouthack.com
   1. Login using admin:admin
1. Create new application
   1. Copy the id of the application
1. Edit `.env`
   1. Set `CHIRPSTACK_APPLICATION_ID=` to the new application id
1. `sudo docker compose up -p svstem-lora-proxy`
