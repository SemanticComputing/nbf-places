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
docker build -t mmm-web-app-c .
docker stop mmm-web-app
docker rm mmm-web-app
docker run -d -p 3005:3001 --name nbf-places nbf-places-c
```
