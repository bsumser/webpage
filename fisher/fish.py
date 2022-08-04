from asyncore import loop
import requests
import json
from bs4 import BeautifulSoup
import pandas as pd
import datetime
import sqlite3
import time
import traceback
import sys


def parseSanDiegoFishReports(date):
    print("parsing san diego fish reports")

    strDate = date.strftime('%Y-%m-%d')
    
    url = "https://www.sandiegofishreports.com/dock_totals/boats.php?date=" + strDate

    try:
        dfs = pd.read_html(url)
        dfConcat = pd.DataFrame()

        for i in range(len(dfs)):
            dfConcat = pd.concat([dfConcat, dfs[i]])

        dfConcat['Dock Totals'].str.split(',', expand=True)
        dfConcat['Date'] = date

    except:
        pass
    print(dfConcat)

    return dfConcat


def dateLoop(start, end):
    #declare empty pandas dataframe
    loopDataframe = pd.DataFrame()

    #declare temp dataframe for loop
    tempDataframe = pd.DataFrame()

    #declare the time delta
    delta = datetime.timedelta(days=1)

    while start <= end:
        #print(start)
        tempDataframe = parseSanDiegoFishReports(start)
        loopDataframe = pd.concat([loopDataframe, tempDataframe])
        start += delta
        time.sleep(5)
    loopDataframe.to_csv('out.csv')
    return loopDataframe

def makeDatabase(parsedData):
    print("making database")
    #given a pandas dataframe, form the database
    conn = sqlite3.connect('test_database')
    c = conn.cursor()

    c.execute('CREATE TABLE IF NOT EXISTS fishCounts (Boat text, Details text, Totals text, Date date)')
    conn.commit()

    parsedData.to_sql('fishCounts', conn, if_exists='replace', index = False)

    #declare the query
    query = ""

    #while query != "exit":
    #    query = input("Please enter query: ")

    #    try:
    #        c.execute(query)
    #    except sqlite3.Error as er:
    #        print('SQLite error: %s' % (' '.join(er.args)))
    #        print("Exception class is: ", er.__class__)
    #        print('SQLite traceback: ')
    #        exc_type, exc_value, exc_tb = sys.exc_info()
    #        print(traceback.format_exception(exc_type, exc_value, exc_tb))

    #    df = pd.DataFrame(c.fetchall(), columns=['Boat', 'Trip', 'Totals', 'Date'])    
    #    print(df)
    print("finished making database")

def main():
    start = datetime.date(2020, 1, 1)
    end = datetime.date(2022, 2, 1)
    #parseSanDiegoFishReports(start)
    print("entering dataLoop parsing")
    parsedData = dateLoop(start, end)
    print("finished dateLoop parsing")
    makeDatabase(parsedData)

if __name__ == "__main__":
    main()
