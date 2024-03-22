#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    create role loraproxy with login password 'loraproxy';
    create database loraproxy with owner loraproxy;
    create database loraproxy_shadow with owner loraproxy;
EOSQL
