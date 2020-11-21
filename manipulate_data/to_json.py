import pandas as pd
import json

data = pd.read_csv('../data/hero_ability_with_img_v3.csv')
payload = json.loads(data.to_json(orient='records'))


json_object = json.dumps(payload, indent = 4) 
with open("../data/hero_ability_with_img_v3_db.json", "w") as outfile: 
    json_output = outfile.write(json_object)