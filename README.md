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
SENDER='[Sender email]' \
SENDERPSWD='[Sender email account password]' \
RECEIVERS='[List of receiver emails]' \
npm start
```

Example:
```
EMAIL='1234567@gmail.com' \
PASSWORD='apasswordisapassowrd' \
INTERVAL='1' \
LOWER='7' \
UPPER='365' \
SENDER='12345@gmail.com' \
SENDERPSWD='********' \
RECEIVERS='["54321@gmail.com","qwert@gmail.com"]' \
npm start
```

## Troubleshooting
1. On Arm Linux, add executablePath param pointing to chromium binary. For example, on Raspberry Pi OS, 
```
    const browser = await puppeteer.launch({
        ...,
        executablePath: '/usr/bin/chromium-browser'
    });
```