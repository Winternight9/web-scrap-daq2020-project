import pandas as pd
from pymongo import MongoClient
import json


client = MongoClient("mongodb+srv://poom123456789:poom123456789@cluster0.nqanf.mongodb.net/Dota2?retryWrites=true&w=majority")

db = client['Dota2']
coll = db['characters']
data = pd.read_csv('../data/hero_ability_with_img_v3.csv')
payload = json.loads(data.to_json(orient='records'))
coll.insert_many(payload)
coll.count()