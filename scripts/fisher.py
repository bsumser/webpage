import requests
import pandas as pd
from bs4 import BeautifulSoup



def main():
    url = "https://www.sandiegofishreports.com/dock_totals/boats.php?date="
    
    # date format is:
    #2023-09-18
    start_date = "2023-1-1"
    end_date = "2023-1-1"
    daterange = pd.date_range(start_date, end_date)

    for single_date in daterange:
        str_date = single_date.strftime("%Y-%m-%d")
        url_concat = url + str_date
        fish_call(url_concat, str_date)



def fish_call(url, date):
    # scrape url data from san diego fish reports

    print("fishing data from url - %s\n------day:%s\n" % (url, date))

    page = requests.get(url)

    soup = BeautifulSoup(page.content, "html.parser")

    results = soup.find_all("table", class_="table table-stripped")

    print(results)

    headers = []
    for i in results.find_all('th'):
        title = i.text
        headers.append(title)
    print(headers)


if __name__ == "__main__":
    main()