CARDS = [
    100, 120, 130, 131, 210, 220, 230, 231, 300, 320, 330, 331, 410, 420, 430,
    431, 510, 520, 530, 531, 610, 620, 630, 631, 710, 720, 730, 731, 800, 810,
    830, 831, 910, 920, 930, 931, 1010, 1020, 1030, 1031, 1100, 1110, 1120,
    1130, 1200, 1230, 1231, 1232,
]

def transInfo(observation): #observationとobservation２つを受け取る？
    UnivInfo = {
        'field_cards': [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
        ],
        'player_cards': [],    
        'selected': -1,
        'player_got_cards': [[],[],[],[]],
        'enemy_cards': [],
        'enemy_cards_back': [], 
        'enemy_got_cards': [[], [], [], []],
        'deck': [],
        'deck_list': CARDS,
        'shuffle': True,
        'select_time': False,
        'deck_card': None,
        'koikoi': False
    }
    
    # フィールドに初期の場札を配置
    for i in range(len(observation['field_card'])):
        new_card_pos = observation['field_card'][i][0] - 1 * 4 + observation['field_card'][i][1] - 1  #月と強さからCARDS内の位置を求める
        UnivInfo['field_cards'].append(CARDS[new_card_pos])

    for i in range(len(observation['your_hand'])):
        new_card_pos = observation['your_hand'][i][0] - 1 * 4 + observation['your_hand'][i][1] - 1  
        UnivInfo['player_cards'].append(CARDS[new_card_pos])
    
    for i in range(len(observation['opponent'])):
        new_card_pos = observation['opponent'][i][0] - 1 * 4 + observation['opponent'][i][1] - 1  
        UnivInfo['enemy_cards'].append(CARDS[new_card_pos])

    

    
    return UnivInfo


