import fetch from 'node-fetch';
const url = 'https://be-miniapp.drxasia.com/game/userPoint';
import * as readline from "readline";
import { writeFile } from 'fs/promises';
import { readFile } from 'fs/promises';


const readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const login = async (init) => {
    try {
        const res = await fetch("https://be-miniapp.drxasia.com/user/signIn", {
            method: "POST", headers: {
                'Accept': 'application/json, text/plain, */*',
                'Connection': 'keep-alive',
                'Content-Type': 'application/json',
                'telegram-init-data': `${await readFile('init.txt', 'utf8')}`,
                'x-requested-with': 'org.telegram.messenger',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 11; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6723.107 Mobile Safari/537.36 Telegram-Android/11.3.3 (Realme RMX3235; Android 11; SDK 30; AVERAGE)'
            }, body: JSON.stringify({
                "verificationCode": "drx-starter"
            })
        })
        const data = await res.json()
        await writeFile('token.txt', data.data.access_token);
    } catch {
        console.log("error")
    }
}
(async () => {
    function inputPayload(query) {
        return new Promise((resolve) => readLine.question(query, (answer) => resolve(answer)));
    }
    const telegramInitData = await inputPayload("telegram-init-data: :")
    await writeFile('init.txt', telegramInitData);
    const main = async () => {
        while (true) {
            function getRandomTimeInSeconds(min = 1, max = 100) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
            const randomTime = getRandomTimeInSeconds()
            let payload = {
                "point": 100,
            };
            console.log(randomTime)
            try {
                const res = await fetch(url, {
                    method: "POST", headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Connection': 'keep-alive',
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${await readFile('token.txt', 'utf8')}`,
                        'User-Agent': 'Mozilla/5.0 (Linux; Android 11; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6723.107 Mobile Safari/537.36 Telegram-Android/11.3.3 (Realme RMX3235; Android 11; SDK 30; AVERAGE)'
                    }, body: JSON.stringify(payload)
                })
                const data = await res.json()
                if (data.status === 401) {
                    login(telegramInitData)
                }
                console.log('Points:', data);
            } catch {
                console.log("error toh")
            }
            await new Promise(resolve => setTimeout(resolve, randomTime + 10000));
        }
    }
    main()
})();
