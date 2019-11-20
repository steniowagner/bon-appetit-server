FROM node:10
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3001

CMD [ "node", "./node_modules/.bin/pm2-runtime", "./src/bin" ]

# FROM go
# WORKDIR /go/src/github.com/alexellis/href-counter/
# RUN go get -d -v golang.org/x/net/html  
# COPY app.go .
# RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app .

# FROM alpine:latest  
# RUN apk --no-cache add ca-certificates
# WORKDIR /root/
# COPY --from=0 /go/src/github.com/alexellis/href-counter/app .
# CMD ["./app"]  