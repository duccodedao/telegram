// ==UserScript==
// @name         Auto Blum
// @namespace    http://tampermonkey.net/
// @version      2024-06-17
// @description  Đã sợ thì đừng dùng, đã dùng thì đừng sợ!
// @author       caobang
// @match        https://telegram.blum.codes/*
// @icon         https://cdn.prod.website-files.com/65b6a1a4a0e2af577bccce96/65ba99c1616e21b24009b86c_blum-256.png
// @grant        none
// ==/UserScript==

const minBombClickCount = 0;  //số bomb sẽ bấm vào
const minFreezeClickCount = 2; //số băng sẽ bấm vào
const cloverSkipPercentage = 10; //tỉ lệ bỏ qua click cỏ ba lá (%)

const consoleRed = 'font-weight: bold; color: red;';
const consoleGreen = 'font-weight: bold; color: green;';
const consolePrefix = '%c [AutoBot] ';
const originalConsoleLog = console.log;

console.log = function () {
  if (arguments[0].includes('[AutoBot]') || arguments[0].includes('github.com')) {
    originalConsoleLog.apply(console, arguments);
  }
};

console.error = console.warn = console.info = console.debug = function () { };

console.clear();
console.log(`${consolePrefix}Bắt đầu bot...`, consoleGreen);

try {
    let totalPoints = 0;
    let bombClickCount = 0;
    let freezeClickCount = 0;
    let skippedClovers = 0;
    let gameEnded = false;

    const originalPush = Array.prototype.push;
    Array.prototype.push = function(...args) {
        args.forEach(arg => {
            if (arg && arg.item) {
                if (arg.item.type === "CLOVER") {
                    arg.shouldSkip = Math.random() < (cloverSkipPercentage / 100);
                    if (arg.shouldSkip) {
                        skippedClovers++;
                        console.log(`${consolePrefix}Bỏ qua cỏ 3 lá (${skippedClovers})`, consoleRed);
                    } else {
                        console.log(`${consolePrefix}Bấm vào cỏ 3 lá (${totalPoints})`, consoleGreen);
                        totalPoints++;
                        arg.onClick(arg);
                        arg.isExplosion = true;
                        arg.addedAt = performance.now();
                    }
                } else if (arg.item.type === "BOMB" && bombClickCount < minBombClickCount) {
                    console.log(`${consolePrefix}Bấm vào bomb`, consoleRed);
                    totalPoints = 0;
                    arg.onClick(arg);
                    arg.isExplosion = true;
                    arg.addedAt = performance.now();
                    bombClickCount++;
                } else if (arg.item.type === "FREEZE" && freezeClickCount < minFreezeClickCount) {
                    console.log(`${consolePrefix}Bấm vào đóng băng`, consoleGreen);
                    arg.onClick(arg);
                    arg.isExplosion = true;
                    arg.addedAt = performance.now();
                    freezeClickCount++;
                }
            }
        });
        return originalPush.apply(this, args);
    };

    function checkGameEnd() {
        const rewardElement = document.querySelector('#app > div > div > div.content > div.reward');
        if (rewardElement && !gameEnded) {
            gameEnded = true;
            console.log(`${consolePrefix}Trò chơi kết thúc. Tổng số điểm kiếm được: ${totalPoints}`, consoleGreen);
            totalPoints = 0;
            bombClickCount = 0;
            freezeClickCount = 0;
            skippedClovers = 0;
            if (window.__NUXT__.state.$s$0olocQZxou.playPasses > 0) {
                setTimeout(() => {
                    const button = document.querySelector("#app > div > div > div.buttons > button:nth-child(2)");
                    if (button) {
                        button.click();
                        console.log(`${consolePrefix}Bắt đầu trò chơi mới...`, consoleGreen);
                    }
                    gameEnded = false;
                }, Math.random() * (5151.2 - 3137.7) + 3137.7);
            } else {
                console.log(`${consolePrefix}Đã chơi hết game`, consoleRed);
            }
        }
    }

    const observer = new MutationObserver((mutationsList, observer) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                checkGameEnd();
            }
        }
    });

    const targetNode = document.querySelector('#app');
    if (targetNode) {
        observer.observe(targetNode, { childList: true, subtree: true });
    }

} catch (e) {
    console.log(`${consolePrefix}Đã xảy ra lỗi!`, consoleRed);
}