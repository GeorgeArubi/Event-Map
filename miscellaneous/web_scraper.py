# Import libraries
import requests
from bs4 import BeautifulSoup
import re
import json

# Create an URL object
radar_url = 'https://radar.com/documentation/places/categories'
output_json_path = './miscellaneous/radar_places.json'

# Create object page
def get_page_content(url):
  try:
    response = requests.get(url)
    response.raise_for_status()
    return response.text
  except requests.exceptions.RequestException as e:
    logging.error(f'Failed to fetch data from {url}: {e}')
    raise

# Obtain information from list
def parse_category_names(soup):
  categories = soup.find_all(re.compile('^li'))
  names_arr = []
  for tag in categories:
    names.append(str(tag))
  return names_arr

# Parse and clean up data
def extract_slugs(names):
  slugs_arr = []
  for name in names:
    match = re.findall('<li><code>.*</code></li>', name)
    if match:
      slug = match[0].removeprefix("<li><code>").removesuffix("</code></li>")
      slugs_arr.append(slug.replace("-", " ").title())
  return slugs_arr

# Format data & write array of objects to json file
def create_json_output(names_arr, slugs_arr):
  radar_places = []
  for name,slug in zip(names_arr, slugs_arr):
    place_info = {'name': name, 'slugs': [slug]}
    radar_places.append(place_info)
    
  with open(output_json_path, "w") as f:
    json.dump(radar_places, f, indent=2)

# Obtain page information
# parser-lxml = Change html to Python friendly format
def main():
  logging.basicConfig(level=logging.INFO)

  try:
    page_content = get_page_content(radar_url)
    soup = BeautifulSoup(page_content, 'lxml')

    names_arr = parse_category_names(soup)
    slugs_arr = extract_slugs(names_arr)

    create_json_output(names_arr, slugs_arr)

    logging.info('Data successfully exported to JSON file.')
  except Exception as e:
    logging.error(f'An error ocurred: {e}')

if __name__ == '__main__':
  main()
  