import pandas as pd
from pymongo import MongoClient
import json


client = MongoClient("mongodb+srv://poom123456789:poom123456789@cluster0.nqanf.mongodb.net/Dota2?retryWrites=true&w=majority")

db = client['Dota2']
coll = db['heroimgs']
data = pd.read_csv('../data/hero_img.csv')
payload = json.loads(data.to_json(orient='records'))
coll.insert_many(payload)
coll.count()