import pandas
import json
import csv
from scrapimage import get_all_images

with open('../data/hero_ability.json', encoding="utf8") as data:
    raw = json.loads(data.read())
df = pandas.DataFrame(raw)

url = 'http://www.dota2.com/heroes/'
imgs = get_all_images(url)


def add_ability():
    for i in range(0, len(df)):
        for slot in range(0, len(raw[i]['abilities'])):
            raw[i][f'ability{slot+1}'] = raw[i]['abilities'][slot]['name']
        del raw[i]['abilities']
    return

def add_talents():
    for i in range(0, len(df)):
        for slot in range(0, len(raw[i]['talents'])):
            raw[i][f'talents{slot+1}'] = raw[i]['talents'][slot]['name']
        del raw[i]['talents']
    return

def add_game_version():
    for i in range(0, len(df)):
        raw[i]['gameVersionId'] = '7.27d'
    return

def add_img():
    for i in range(0, len(df)):
        shot_name = raw[i]['shortName']
        for img in imgs:
            if shot_name in img:
                raw[i]['img'] = img
    return

def rename_id():
    for i in range(0, len(df)):
        try:
            raw[i]['heroId'] = raw[i]['id']
            del raw[i]['id']
        except:
            pass
    return 

rename_id()
game_version = add_game_version()
ability_name = add_ability()
talent_name = add_talents()
hero_img = add_img()

json_object = json.dumps(raw, indent = 4) 
with open("../data/hero_ability_with_img_v3.json", "w") as outfile: 
    json_output = outfile.write(json_object)