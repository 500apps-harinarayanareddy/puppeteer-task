const puppeteer = require('puppeteer');
const ObjectsToCsv = require('objects-to-csv');

(async function run() {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false,
        userDataDir: "./tmp"
    });
    const page = await browser.newPage();
    //Navigating to glassdoor webpage
    await page.goto('https://www.glassdoor.co.in/Job/jobs.htm?location-redirect=true');

    const jobTitles = await page.$$eval('section[class="d-flex css-152bcv1 exy0tjh3"] a > span', 
        elements => elements.map(el => el.textContent));
    
    //Create a new CSV file using the ObjectsToCsv library
    const csv = new ObjectsToCsv(jobTitles.map(title => ({title})));

    //Save the CSV file to disk
    await csv.toDisk('./jobTitles.csv');

    //Close the browser
    await browser.close();
})(); 
