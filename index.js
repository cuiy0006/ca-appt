const puppeteer = require('puppeteer');
const util = require('util');
const moment = require('moment');
const player = require('play-sound')(opts = {})

const locationIdToName = {
    '89': 'Calgary',
    '90': 'Halifax',
    '91': 'Montréal',
    '92': 'Ottawa',
    '93': 'Québec',
    '94': 'Toronto',
    '95': 'Vancouver',
};

protoLink = 'https://ais.usvisa-info.com/en-ca/niv/schedule/37002109/appointment/days/%s.json?appointments[expedite]=false';

const email = process.env.EMAIL;
const password = process.env.PASSWORD;
const interval_minute = parseInt(process.env.INTERVAL || '30');
const interval = interval_minute * 60 * 1000;
const lower = parseInt(process.env.LOWER || '7');
const upper = parseInt(process.env.UPPER || '365');

async function drainTheSwamp() {
    const startTime = moment();
    console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Start processing at [${startTime.format()}] @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`);
    console.log(`Looking for available appts at range (${lower}, ${upper}) days from today(exclusive), every ${interval_minute} minutes`);

    const browser = await puppeteer.launch({
        headless: true,
        args:[
        '--start-maximized'
        ]
    });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36');
    await page.setViewport({ width: 1920, height: 1080});
    await page.goto('https://ais.usvisa-info.com/en-ca/niv/users/sign_in', { waitUntil: 'networkidle0' });
    await page.type('#user_email', email);
    await page.type('#user_password', password);
    await page.evaluate(() => {
        document.querySelector('#policy_confirmed').click();
    });
    await page.evaluate(() => {
        document.querySelector('input.button.primary').click();
    });

    await page.waitForNavigation({
        waitUntil: 'networkidle0',
    });

    for (const [id, name] of Object.entries(locationIdToName)) {
        // console.log(`-------------------- Processing Location [${name}] --------------------`)

        const url = util.format(protoLink, id);
        const resJsonStr = await page.evaluate(async (url) => {
            const response = await fetch(url);
            if (response.status !== 200) {
                console.error(`[Error] get response code: ${response.status}, response text: ${response.text()}`);
                return '[]';
            }
            const jsonStr = await response.text();
            return jsonStr;
        }, url);

        try {
            const resJson = JSON.parse(resJsonStr);
            for (const dateObject of resJson) {
                const d = moment(dateObject['date']);
                const lowerDate = moment().add(lower, 'days');
                const upperDate = moment().add(upper, 'days');
    
                if (lowerDate < d && d < upperDate) {
                    console.log(`NOTIFICATION: [${name}] - [${d.format()}]`);
                    await new Promise((resolve, reject) => {
                        player.play('notification.mp3', function(err){
                            if (err === null) {
                                resolve();
                            } else {
                                reject(err);
                            }
                        });
                    });
                    
                }
            }
        } catch (error) {
            console.error(error);
            console.error(`[Error] caused by json string: ${resJsonStr}`);
        }
    }

    await browser.close();

    const endTime = moment();
    const durationSec = moment.duration(endTime.diff(startTime)).asSeconds();
    console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ End processing at [${endTime.format()}], takes ${durationSec}s @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`);
    console.log('');

    setTimeout(drainTheSwamp, interval);
}

drainTheSwamp();