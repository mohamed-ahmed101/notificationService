
# notificationService
 
it's a asimple service provide methods to deliver 
notifications through differents channels (SMS ,Push notification,etc...) ,
using publish and subscripe techniques to deliver messages .



## Used technologies

- nodejs (express) 
- redis
- mongo

## Installation 

Install notificationService 

- install [Docker] (https://docs.docker.com/desktop/#download-and-install)


## Run notification Service


- development 
```bash 
  docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
```
- production 
```bash 
  docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

