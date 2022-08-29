# Import libraries
import requests
from bs4 import BeautifulSoup
import pandas as pd
import json

# Create an URL object
url = 'https://radar.com/documentation/places/categories'

# Create object page
page = requests.get(url)

# parser-lxml = Change html to Python friendly format
# Obtain page's information
soup = BeautifulSoup(page.text, 'lxml')

# Obtain information from tag <table>
radar_categories = soup.find('table')

# Obtain every title of columns with tag <th>
headers = []
for i in radar_categories.find_all('th'):
 title = i.text
 headers.append(title)

# Create a dataframe and temp data structures
data = pd.DataFrame(columns = headers)
names_arr = []
slugs_arr = []
x_arr = []
y_arr = []
radar_places = []

# Create a for loop to fill data
for j in radar_categories.find_all('tr')[1:]:
 row_data = j.find_all('td')
 row = [i.text for i in row_data]
 length = len(data)
 data.loc[length] = row
 slugs = row[0].split("\u00a0>\u00a0")
 slugs_arr.append(slugs)
 names_arr.append(row[1])

# Create radar categories array of objects/dictionaries
for x, name in enumerate(names_arr):
  x = {"name": ""}
  x["name"] = (name)
  x_arr.append(x)

for y, slugs in enumerate(slugs_arr):
  y = {"slugs": []}
  y["slugs"] = (slugs)
  y_arr.append(y)

for name_x, slugs_y in zip(x_arr, y_arr):
	result = name_x | slugs_y
	radar_places.append(result) 

# write array to json file
with open("./miscellaneous/radar_places.json", "w") as f:
  json.dump(radar_places, f, indent=2)