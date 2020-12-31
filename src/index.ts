import puppeteer from 'puppeteer';
import dotenv from 'dotenv';

dotenv.config();

(async () => {
    // await proxyWithLuminati();

    await proxyWithProxyCrawl();

})();

async function proxyWithLuminati() {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--proxy-server=zproxy.lum-superproxy.io:22225']
    });
    const page = await browser.newPage();

    await page.authenticate({
        username: process.env.luminatiUsername,
        password: process.env.luminatiPassword
    });

    const url = 'https://www.google.com/search?q=what+is+my+ip';
    await page.goto(url);

    await page.waitFor(3500);

    await browser.close();
}


async function proxyWithProxyCrawl() {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();

    const url = 'https://www.google.com/search?q=what+is+my+ip';
    await page.goto(`https://api.proxycrawl.com/?token=${process.env.proxycrawlCrawlerToken}&url=${url}`);

    // If navigating around page, do this:

    // Get desired link
    // await page.goto(`https://api.proxycrawl.com/?token=${process.env.proxycrawlCrawlerToken}&url=${desiredLink}`);

    await page.waitFor(15000);

    await browser.close();
}

