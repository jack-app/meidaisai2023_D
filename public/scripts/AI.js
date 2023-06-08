const pair_check = function (hand,field){
        for(let i = 0; i < hand.length; i++){
            for(let j = 0; j < field.length; j++){
               if( -100<hand[i]-field[j]<100){
                  const result = [hand[i],field[j]];
                  return result;
               }
            }
        }

    // 結果がなかったら
        return -1;
}

// memo:テスト用
// console.log(pair_check([100,120,800],[130,930]))

export default pair_check


// (hand,field)=([100,120,800],[130,930])の時は(100,130)を返す。 月ごとのリストを作り手札を月ごとのリストに割り振り、月ごとでセットが作れたら返す,for文