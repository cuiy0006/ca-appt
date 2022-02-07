## Description
Get available slot from ais.usvisa-info.com,
Notify by printing info on console and playing a notification sound.

## Build
npm version: v16.13.2
```
npm install
```

## Run
```
EMAIL='[Your Account Email]' \
PASSWORD='[Your Account Password]' \
INTERVAL='[Crawl Interval in Minute]' \
LOWER='[Notify if found at least n days from now]' \
UPPER='[Notify if found at most n days from now]' \
npm start
```

Example:
```
EMAIL='1234567@gmail.com' \
PASSWORD='apasswordisapassowrd' \
INTERVAL='1' \
LOWER='7' \
UPPER='365' \
npm start
```