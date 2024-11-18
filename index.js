import fetch from 'node-fetch';
const url = 'https://be-miniapp.drxasia.com/game/userPoint';
import * as readline from "readline";


const readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

(async () => {
    function inputPayload(query) {
        return new Promise((resolve) => readLine.question(query, (answer) => resolve(answer)));
    }
    const token = await inputPayload("input token :")
    let headers = {
        'Accept': 'application/json, text/plain, */*',
        'Connection': 'keep-alive',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`,
        'User-Agent': 'Mozilla/5.0 (Linux; Android 11; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6723.107 Mobile Safari/537.36 Telegram-Android/11.3.3 (Realme RMX3235; Android 11; SDK 30; AVERAGE)'
    };
    
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
                const res = await fetch(url, { method: "POST", headers: headers, body: JSON.stringify(payload) })
                const data = await res.json()
                console.log('Points:', data);
            } catch {
                console.log("error")
            }
            await new Promise(resolve => setTimeout(resolve, randomTime + 10000));
        }
    }
    main()
})();
