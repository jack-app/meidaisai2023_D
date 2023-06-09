const pair_check = function (hand, field) {
    let pos = 15;
    for (let i = 0; i < hand.length; i++) {
        for (let j = 0; j < field.length; j++) {
            if (field[j].length > 0) {
                if (
                    Math.floor(hand[i].number / 100) ==
                    Math.floor(field[j][0].number / 100)
                ) {
                    const result = [i, j];
                    return result;
                }
            } else {
                pos = Math.min(pos, j);
            }
        }
    }

    // 結果がなかったら
    return [0, -1, pos];
};

// memo:テスト用
// console.log(pair_check([100,120,800],[130,930]))

export default pair_check;

// (hand,field)=([100,120,800],[130,930])の時は(100,130)を返す。 月ごとのリストを作り手札を月ごとのリストに割り振り、月ごとでセットが作れたら返す,for文
