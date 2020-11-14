import re, requests
import pandas
import sys, json
from bs4 import BeautifulSoup

url = 'https://www.dotabuff.com/heroes/meta'
r = requests.get(url, headers={'user-agent': 'mozilla/5.0'})
soup = BeautifulSoup(r.content, 'html.parser')
table = soup('table')[0]


compression_opt = dict(method='zip', archive_name='hero_meta.csv')
stats = pandas.read_html(str(table))[0].drop(columns={'Hero'})
stats_rename_header = stats.rename(columns={
                                    'Hero.1':'Hero', 
                                    'Win %': 'WinRateGuardian', 'Pick %': 'PickRateGuardian', 
                                    'Win %.1': 'WinRateArchon', 'Pick %.1': 'PickRateArchon',
                                    'Win %.2': 'WinRateLegend', 'Pick %.2': 'PickRateLegend',
                                    'Win %.3': 'WinRateAncient', 'Pick %.3': 'PickRateAncient',
                                    'Win %.4': 'WinRateDivine', 'Pick %.4': 'PickRateDivine',
                                    })
stats_rename_header.to_csv('hero_meta.zip', index=False, compression=compression_opt)