// 例：console.log(Judgeyaku([100,300,800])); //{yakus:[{num:1,name:'三光'}],mon:5}
//     console.log(Judgeyaku([100]));        //{yakus:[],mon:0}
//     ※役がない場合はyakus:[],mon:0
// Playscene.jsにデバッグ用コードあるよ
export const YAKU={1:'五光',2:'四光',3:'雨四光',4:'三光',5:'花見酒',6:'月見酒',7:'猪鹿蝶',8:'赤短',9:'青短',10:'タネ',11:'タン',12:'カス'}/ここで役の一覧を管理すると分かりやすいかも

export function Judgeyaku(hand){
	let hand =new Set(hand);
	let yaku={yakus:[],mon:0};
	
	if(100 in hand && 300 in hand && 800 in hand){
		yaku.yakus.push('三光');
		yaku.mon+=5;
	}
	
	
	
	
	
	return yaku;

	
}

