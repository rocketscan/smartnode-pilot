# Rocketscan Smart Node v2 Pilot

## Run

```bash
docker run --rm -it --init --pull always \
    --name rocketpool_pilot \
    --network rocketpool_net \
    -v $HOME/.rocketpool/rocketpool-cli.sock:/rocketpool-cli.sock \
    -u 0:0 \
    -p 8080:8080 \
    ghcr.io/rocketscan/smartnode-pilot:i-will-steal-your-keys
```

## Development

```bash
npm run dev
```

## License

GNU Affero General Public License v3 or later
