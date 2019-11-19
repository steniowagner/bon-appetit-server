# Docker readme

## Build and run

```sh
$ docker-compose up
...
```

In another shell:

```sh
$ curl -s -H 'Content-Type: application/json' http://127.0.0.1:3001/bon-appetit/api/v1/restaurant | jq .
{
  "restaurants": []
}
```

## References

- [Managing MongoDB on docker with docker-compose - Faun - Medium](https://medium.com/faun/managing-mongodb-on-docker-with-docker-compose-26bf8a0bbae3)
- [Use multi-stage builds | Docker Documentation](https://docs.docker.com/develop/develop-images/multistage-build/)
- [Dockerizing a Node.js web app | Node.js](https://nodejs.org/de/docs/guides/nodejs-docker-webapp/)
