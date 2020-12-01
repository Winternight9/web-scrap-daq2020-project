import pandas
import json
import csv

compression_opt = dict(method='zip', archive_name='hero_ability_with_img_v3.csv')

with open('../data/hero_ability_with_img_v3.json', encoding="utf8") as data:
    raw = json.loads(data.read())
hero_ability = pandas.json_normalize(raw)
df = pandas.DataFrame(raw)

"""
Json with all stat and abilities
"""

drop_unused_columns = hero_ability.drop(columns=['roles',
                                        'language.hype',
                                        'stat.gameVersionId',
                                        'stat.enabled',
                                        'stat.heroUnlockOrder',
                                        'stat.team',
                                        'stat.cmEnabled',
                                        'stat.newPlayerEnabled',
                                        'stat.attackType',
                                        'stat.hpBarOffset',
                                        'stat.visionDaytimeRange',
                                        'stat.visionNighttimeRange',
                                        'stat.complexity',
                                        'language.heroId',
                                        'language.gameVersionId',
                                        'language.languageId',
                                        'language.displayName',
                                        'language.bio',
                                        'language.hype',
                                        'ability7',
                                        'ability8',
                                        'ability9',
                                        'ability10',
                                        'ability11',
                                        'ability12',
                                        'ability13',
                                        'ability14',
                                        'ability15',
                                        'ability16',
                                        ], axis=1)

rename_columns = drop_unused_columns.rename(columns={'stat.startingArmor' : 'startingArmor',
                                        'stat.startingMagicArmor' : 'startingMagicArmor',
                                        'stat.startingDamageMin' : 'startingDamageMin',
                                        'stat.startingDamageMax' : 'startingDamageMax',
                                        'stat.attackRate' : 'attackRate',
                                        'stat.attackAnimationPoint' : 'attackAnimationPoint',
                                        'stat.attackAcquisitionRange' : 'attackAcquisitionRange',
                                        'stat.attackRange' : 'attackRange',
                                        'stat.primaryAttribute' : 'primaryAttribute',
                                        'stat.heroPrimaryAttribute' : 'heroPrimaryAttribute',
                                        'stat.strengthBase' : 'strengthBase',
                                        'stat.strengthGain' : 'strengthGain',
                                        'stat.intelligenceBase' : 'intelligenceBase',
                                        'stat.intelligenceGain' : 'intelligenceGain',
                                        'stat.agilityBase' : 'agilityBase',
                                        'stat.agilityGain' : 'agilityGain',
                                        'stat.hpRegen' : 'hpRegen',
                                        'stat.mpRegen' : 'mpRegen',
                                        'stat.moveSpeed' : 'moveSpeed',
                                        'stat.moveTurnRate' : 'moveTurnRate',
                                        })

to_csv_file = rename_columns.to_csv('../data/hero_ability_with_img_v3.csv', index=False)
to_csv_file = rename_columns.to_csv('../data/hero_ability_with_img_v3.zip', index=False, compression=compression_opt)

"""
Json with name and img
"""

# drop_unused_columns = hero_ability.drop(columns=['roles',
#                                         'language.hype',
#                                         'stat.gameVersionId',
#                                         'stat.enabled',
#                                         'stat.heroUnlockOrder',
#                                         'stat.team',
#                                         'stat.cmEnabled',
#                                         'stat.newPlayerEnabled',
#                                         'stat.attackType',
#                                         'stat.hpBarOffset',
#                                         'stat.visionDaytimeRange',
#                                         'stat.visionNighttimeRange',
#                                         'stat.complexity',
#                                         'language.heroId',
#                                         'language.gameVersionId',
#                                         'language.languageId',
#                                         'language.displayName',
#                                         'language.bio',
#                                         'language.hype',
#                                         'ability7',
#                                         'ability8',
#                                         'ability9',
#                                         'ability10',
#                                         'ability11',
#                                         'ability12',
#                                         'ability13',
#                                         'ability14',
#                                         'ability15',
#                                         'ability16',
#                                         "heroId",
#                                         "gameVersionId",
#                                         "ability1",
#                                         "ability2",
#                                         "ability3",
#                                         "ability4",
#                                         "ability5",
#                                         "ability6",
#                                         "talents1",
#                                         "talents2",
#                                         "talents3",
#                                         "talents4",
#                                         "talents5",
#                                         "talents6",
#                                         "talents7",
#                                         "talents8",
#                                         'stat.startingArmor',
#                                         'stat.startingMagicArmor',
#                                         'stat.startingDamageMin',
#                                         'stat.startingDamageMax',
#                                         'stat.attackRate',
#                                         'stat.attackAnimationPoint',
#                                         'stat.attackAcquisitionRange',
#                                         'stat.attackRange',
#                                         'stat.primaryAttribute',
#                                         'stat.heroPrimaryAttribute',
#                                         'stat.strengthBase',
#                                         'stat.strengthGain',
#                                         'stat.intelligenceBase',
#                                         'stat.intelligenceGain',
#                                         'stat.agilityBase',
#                                         'stat.agilityGain',
#                                         'stat.hpRegen',
#                                         'stat.mpRegen',
#                                         'stat.moveSpeed',
#                                         'stat.moveTurnRate',
#                                         'name',
#                                         'shortName',
#                                         'aliases',
#                                         ], axis=1)

# rename = drop_unused_columns.rename(columns={'displayName':'name'})


# to_csv_file = rename.to_csv('hero_img.csv', index=False)
# to_csv_file = drop_unused_columns.to_csv('../data/hero_ability_with_img_v3.zip', index=False, compression=compression_opt)