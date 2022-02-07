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
LOWER='[Notify if found at least n Month from Now]' \
UPPER='[Notify if found at most n Month from Now]' \
npm start
```

Example:
```
EMAIL='1234567@gmail.com' \
PASSWORD='apasswordisapassowrd' \
INTERVAL='1' \
LOWER='1' \
UPPER='13' \
npm start
```