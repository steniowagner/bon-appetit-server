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

### Using the real ip

Either find it or you can try this:

```sh
$ export IPV4=$(ifconfig | grep "inet " | grep -v 127 | cut -d " " -f 2 | head -1)
...
$ curl -s -H 'Content-Type: application/json' http://${IPV4}:3001/bon-appetit/api/v1/restaurant | jq .
{
  "restaurants": []
}
$ for i in restaurant review event; do
  curl -i -H 'Content-Type: application/json' -X POST -d @src/json-models/${i}s.json http://${IPV4}:3001/bon-appetit/api/v1/${i}/batch
done
HTTP/1.1 100 Continue

HTTP/1.1 201 Created
X-Powered-By: Express
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept
Content-Type: application/json; charset=utf-8
Content-Length: 46
ETag: W/"2e-+BC4cVbW34Arrk0xXWN0mHD7ugM"
Date: Wed, 20 Nov 2019 19:22:51 GMT
Connection: keep-alive

{"message":"Restaurant created with Success!"}HTTP/1.1 100 Continue

HTTP/1.1 201 Created
X-Powered-By: Express
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept
Content-Type: application/json; charset=utf-8
Content-Length: 42
ETag: W/"2a-xDE1zrIrgK8aQf9y+iu4dwQByb4"
Date: Wed, 20 Nov 2019 19:22:52 GMT
Connection: keep-alive

{"message":"Review created with Success!"}HTTP/1.1 100 Continue

HTTP/1.1 201 Created
X-Powered-By: Express
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept
Content-Type: application/json; charset=utf-8
Content-Length: 42
ETag: W/"2a-Mfe60Vp8r62DX2PlSD3YLDPmzQM"
Date: Wed, 20 Nov 2019 19:22:52 GMT
Connection: keep-alive

{"message":"Events created with Success!"}
```

### Rebuilding the backend

```sh
docker-compose build backend
docker-compose up
```

## References

- [Managing MongoDB on docker with docker-compose - Faun - Medium](https://medium.com/faun/managing-mongodb-on-docker-with-docker-compose-26bf8a0bbae3)
- [Use multi-stage builds | Docker Documentation](https://docs.docker.com/develop/develop-images/multistage-build/)
- [Dockerizing a Node.js web app | Node.js](https://nodejs.org/de/docs/guides/nodejs-docker-webapp/)
