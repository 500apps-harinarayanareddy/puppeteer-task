import scrapy


class QuoteSpider(scrapy.Spider):
    # Name of the spider
    name = 'quotes'
# Url's to be scrapped
    start_urls = [
        'https://www.glassdoor.co.in/Job/jobs.htm?location-redirect=true',
        'https://www.glassdoor.co.in/Job/jobs_IP5.htm?includeNoSalaryJobs=true'
    ]

    custom_settings = {
        'FEED_FORMAT': 'json',
        'FEED_URI': 'output.json'
    }

    def parse(self, response):
        # Extracting the title tag
        company_name = response.css('.e1n63ojh0 span::text').extract()
        designation = response.css('.eigr9kq2 span::text').extract()
        location = response.css('.e1rrn5ka0::text').extract()
        salary = response.css('.e1wijj242::text').extract()
        for i in range(len(company_name)):
            yield {
                'company_name': company_name[i].strip(),
                'designation': designation[i].strip(),
                'location': location[i].strip(),
                'salary': salary[i].strip()
            }