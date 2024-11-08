CARDS = [
    100, 120, 130, 131, 210, 220, 230, 231, 300, 320, 330, 331, 410, 420, 430,
    431, 510, 520, 530, 531, 610, 620, 630, 631, 710, 720, 730, 731, 800, 810,
    830, 831, 910, 920, 930, 931, 1010, 1020, 1030, 1031, 1100, 1110, 1120,
    1130, 1200, 1230, 1231, 1232,
]

def transInfo(observation): 
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
        # 'selected': -1, #手札で選択中のカード
        'player_got_cards': [[],[],[],[]],
        'enemy_cards': [],
        'enemy_cards_back': [], 
        'enemy_got_cards': [[], [], [], []],
        # 'deck': [], #山札
        'deck_list': CARDS,
        'select_time': False, #自分のターンか
        'deck_card': None, 
        'koikoi': False
    }
    
    # フィールドに初期の場札を配置
    for i in range(len(observation['field_card'])):
        new_card_pos = (observation['field_card'][i][0] - 1 )* 4 + observation['field_card'][i][1] - 1  #月と強さからCARDS内の位置を求める
        UnivInfo['field_cards'][observation['round'] - 1].append(CARDS[new_card_pos])

    # 人間の持ち札
    for i in range(len(observation['your_hand'])):
        new_card_pos = (observation['your_hand'][i][0] - 1 )* 4 + observation['your_hand'][i][1] - 1  
        UnivInfo['player_cards'].append(CARDS[new_card_pos])
    
    # AIの持ち札
    for i in range(len(observation['opponent_hand'])):
        new_card_pos = (observation['opponent_hand'][i][0] - 1 )* 4 + observation['opponent_hand'][i][1] - 1  
        UnivInfo['enemy_cards'].append(CARDS[new_card_pos])

    # ここにeneny_cards_backを書く

    for i in range(len(observation['your_pile'])):
        new_card_pos = (observation['your_pile'][i][0] - 1 )* 4 + observation['your_pile'][i][1] - 1
        NewCard = CARDS[new_card_pos]
        if NewCard % 100 // 10 == 0: #光札
            UnivInfo['player_got_cards'][0].append(CARDS[new_card_pos])
        if NewCard % 100 // 10 == 1: #種札
            UnivInfo['player_got_cards'][1].append(CARDS[new_card_pos])
        if NewCard % 100 // 10 == 2: #短冊札
            UnivInfo['player_got_cards'][2].append(CARDS[new_card_pos])
        if NewCard % 100 // 10 == 3: #素札
            UnivInfo['player_got_cards'][3].append(CARDS[new_card_pos])

    for i in range(len(observation['opponent_pile'])): #opponent?pileはobservationに存在しない？
        new_card_pos = (observation['opponent_pile'][i][0] - 1 )* 4 + observation['opponent_pile'][i][1] - 1
        NewCard = CARDS[new_card_pos]
        if NewCard % 100 // 10 == 0: #光札
            UnivInfo['enemy_got_cards'][0].append(CARDS[new_card_pos])
        if NewCard % 100 // 10 == 1: #種札
            UnivInfo['enemy_got_cards'][1].append(CARDS[new_card_pos])
        if NewCard % 100 // 10 == 2: #短冊札
            UnivInfo['enemy_got_cards'][2].append(CARDS[new_card_pos])
        if NewCard % 100 // 10 == 3: #素札
            UnivInfo['enemy_got_cards'][3].append(CARDS[new_card_pos])
    
    #koikoiするかどうか
    UnivInfo['koikoi'] = observation['koikoi']
    #自分のターンかどうか
    UnivInfo['select_time'] = observation['Turn']

    return UnivInfo


 #obsetvationテスト用
# observation = {}
# observation['round'] = 1
# observation['field_card'] = [[1,1],[1,2],[1,3],[1,4],[2,1],[2,2],[2,3],[2,4]]
# observation['your_hand'] = [[3,1],[3,2],[3,3],[3,4],[4,1],[4,2],[4,3],[4,4]]
# observation['opponent_hand'] = [[5,1],[5,2],[5,3],[5,4],[6,1],[6,2],[6,3],[6,4]]
# observation['your_pile'] = [[7,1],[7,2],[7,3],[7,4],[8,1],[8,2],[8,3],[8,4]]
# transInfo(observation)

