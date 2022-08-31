# Import libraries
import requests
from bs4 import BeautifulSoup
import re
import json

# Create an URL object
url = 'https://radar.com/documentation/places/categories'

# Create object page
page = requests.get(url)

# parser-lxml = Change html to Python friendly format
# Obtain page's information
soup = BeautifulSoup(page.text, 'lxml')

# Obtain information from list
radar_categories = soup.find_all(re.compile('^li'))

# Parse and clean up data
high_level_category = []
for tag in radar_categories:
  high_level_category.append(str(tag))

arr = []
for x in high_level_category:
  arr.append(re.findall('<li><code>.*</code></li>', x))

slugs_arr = []
for y in arr:
  if(len(y) > 0):
    slugs_arr.append(y[0].removeprefix("<li><code>").removesuffix("</code></li>"))

names_arr = []
for i in slugs_arr:
  names_arr.append(i.replace("-", " ").title())

x_arr = []
for x, name in enumerate(names_arr):
  x = {"name": ""}
  x["name"] = (name)
  x_arr.append(x)

y_arr = []
for y, slugs in enumerate(slugs_arr):
  y = {"slugs": []}
  y["slugs"] = (slugs)
  y_arr.append(y)

# Format data
radar_places = []
for name_x, slugs_y in zip(x_arr, y_arr):
	result = name_x | slugs_y
	radar_places.append(result) 

# Write array of objects to json file
with open("./miscellaneous/radar_places.json", "w") as f:
  json.dump(radar_places, f, indent=2)