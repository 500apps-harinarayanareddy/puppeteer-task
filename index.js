const puppeteer = require('puppeteer');
const ObjectsToCsv = require('objects-to-csv');

(async () =>{
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

    const jobLocation = await page.$$eval('div[class="d-flex flex-wrap css-11d3uq0 e1rrn5ka2"] span', 
    elements => elements.map(el => el.textContent));
    
    const jobSalary = await page.$$eval('span[class="css-1xe2xww e1wijj242"]', 
    elements => elements.map(el => el.textContent));

    //Create a new CSV file using the ObjectsToCsv library
    const csv1 = new ObjectsToCsv(jobTitles.map(title => ({title})));
    const csv2 = new ObjectsToCsv(jobLocation.map(location => ({location})));
    const csv3 = new ObjectsToCsv(jobSalary.map(salary => ({salary})));

    //Save the CSV file to disk
    await csv1.toDisk('./jobTitles.csv');
    await csv2.toDisk('./jobLocation.csv');
    await csv3.toDisk('./jobSalary.csv');

    //Close the browser
    await browser.close();
})(); 
