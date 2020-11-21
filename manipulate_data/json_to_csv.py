import pandas
import json
import csv

compression_opt = dict(method='zip', archive_name='hero_ability_with_img_v3.csv')

with open('../data/hero_ability_with_img_v3.json', encoding="utf8") as data:
    raw = json.loads(data.read())
hero_ability = pandas.json_normalize(raw)
df = pandas.DataFrame(raw)

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