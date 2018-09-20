# Semantic National Biography of Finland
## Place perspective

## Local development

```
npm install
npm run dev
```

## Deploy with Docker

### Build
 `docker build -t nbf-places-c .`

### Run
 `docker run -d -p 3005:3001 --name nbf-places nbf-places-c`

### Upgrade
```
docker build -t nbf-places-c .
docker stop nbf-places
docker rm nbf-places
docker run -d -p 3005:3001 --name nbf-places nbf-places-c
```
