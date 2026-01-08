# LoRaWan System for Scouts Victoria Stem

## Topics in other files

- [Setting up SVStem LoRaWan Network server](./docs/setting-up-lorawan-network-server.md)
- [Dragino GPS Trackers](./docs/dragino-gps-devices.md)
- [ChirpStack & Docker explained](./docs/chirpstack-docker.md)

## Hardware

1. Network Server:
   [G30-J4125](https://www.aliexpress.com/item/1005004337724378.html)

   1. 16GB DDR4 512GB SSD
   1. J4125
   1. 4x 2.5Gb NIC

1. LoRa Gateway:
   [Sentrius RG191](https://www.lairdconnect.com/iot-devices/lorawan-iot-devices/sentrius-rg1xx-lorawan-gateway-wi-fi-ethernet-optional-lte-us-only)

1. LoRa GPS Tracker:
   [Dragino LGT-92](https://dragino.com/downloads/index.php?dir=LGT_92/)

## development instructions

docker compose up -d
docker compose exec lora-proxy npx prisma migrate deploy

### to make a migration
docker compose exec lora-proxy npx prisma migrate dev
mkdir ./lora-proxy/prisma/migrations/20251112052912_add_config_table/
docker compose cp lora-proxy:/home/node/app/prisma/migrations/20251112052912_add_config_table/migration.sql ./lora-proxy/prisma/migrations/20251112052912_add_config_table/migration.sql
