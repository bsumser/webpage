import requests

def main():
    # date format is:
    #2023-09-18

    url = "https://www.sandiegofishreports.com/dock_totals/boats.php?date="

def fish_call(url):
    # scrape url data from san diego fish reports

    page = requests.get(url)

    print(page.text)

if __name__ == "__main__":
    main()