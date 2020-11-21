import pandas
import json
import csv

n = 129
with open('../data/hero.json', encoding="utf8") as hero:
    data_hero = json.loads(hero.read())
with open('../data/ability.json', encoding="utf8") as ability:
    data_ability = json.loads(ability.read())


def add_talents_name(n):
    for i in range(0,n+1):
        try:
            for slot in range(0, len(data_hero[f'{i}']['talents'])+1): # loop in abilities to add name
                talent_ability_id = data_hero[f'{i}']['talents'][slot]['abilityId'] # abilityId
                talent_ability_name = data_ability[f'{talent_ability_id}']['language']['displayName'] # ability name
                data_hero[f'{i}']['talents'][slot]['name'] = talent_ability_name # add ability name in to talents in each slot
        except:
            pass


def add_abilities_name(n):
    for i in range(1,n+1):
        try:
            for slot in range(0, len(data_hero[f'{i}']['abilities'])+1): # loop in abilities to add name
                ability_id = data_hero[f'{i}']['abilities'][slot]['abilityId'] # abilityId
                ability_name = data_ability[f'{ability_id}']['name'] # ability name
                data_hero[f'{i}']['abilities'][slot]['name'] = ability_name # add ability name in to abilities in each slot
        except:
            pass

def create_json_list(n):
    list_data = []
    for i in range(1,n+1):
        try:
            json_list = data_hero[f'Hero'] = data_hero.pop(f'{i}')
            list_data.append(json_list)
        except:
            pass
    return list_data


add_talents_name(n)
add_abilities_name(n)
list_data = create_json_list(n)


json_object = json.dumps(list_data, indent = 4) 
with open("../data/hero_ability.json", "w") as outfile: 
    json_output = outfile.write(json_object)