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
                // 'telegram-init-data': 'query_id=AAElOusjAwAAACU66yOkPv_w&user=%7B%22id%22%3A7045069349%2C%22first_name%22%3A%22Sinar%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22xvadhe%22%2C%22language_code%22%3A%22id%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FiKWt_bF1sFaD1oc84gXrUW71rWkherc28dcOX9jhPmTeG0bOOLjmcapv4U7xCsEY.svg%22%7D&auth_date=1732447794&signature=CIKPkyj49CakKPrj_erX7cNRIUWXWPJd_FzErvcKcXf-A8gDFPIAiTvrKD8EEzw9vP486n4RP6XMwFDXlQuBAg&hash=9ac430172c705e3979d729b3db394755205b7ce714dc268b7d25ccaca33af26d',
                'telegram-init-data': `${init}`,
                'x-requested-with': 'org.telegram.messenger',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 11; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6723.107 Mobile Safari/537.36 Telegram-Android/11.3.3 (Realme RMX3235; Android 11; SDK 30; AVERAGE)'
            }, body: JSON.stringify({
                "verificationCode": "drx-starter"
            })
        })
        const data = await res.json()
        await writeFile('token.txt', data.data.access_token);
    } catch {
        console.log("error bro")
    }
}
(async () => {
    function inputPayload(query) {
        return new Promise((resolve) => readLine.question(query, (answer) => resolve(answer)));
    }
    const telegramInitData = await inputPayload("telegram-init-data: :")
    // const tokenData = await readFile('token.txt', 'utf8');
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
