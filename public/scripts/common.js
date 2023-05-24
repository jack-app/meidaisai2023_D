// 例：console.log(Judgeyaku([100,300,800])); //{yakus:[{num:1,name:'三光'}],mon:5}
//     console.log(Judgeyaku([100]));        //{yakus:[],mon:0}
//     ※役がない場合はyakus:[],mon:0
// Playscene.jsにデバッグ用コードあるよ
export const YAKU={1:'五光',2:'四光',3:'雨四光',4:'三光',5:'花見酒',6:'月見酒',7:'猪鹿蝶',8:'赤短',9:'青短',10:'タネ',11:'タン',12:'カス'}/ここで役の一覧を管理すると分かりやすいかも

export function Judgeyaku(hand){
	yaku={yakus:[],mon:0};
	return yaku;

	yaku={yakus:[{num:1,name:'五光'}],mon:10};
	return yaku;

	yaku={yakus:[{num:2,name:'四光'}],mon:8};
	return yaku;

	yaku={yakus:[{num:3,name:'雨四光'}],mon:7};
	return yaku;

	yaku={yakus:[{num:4,name:'三光'}],mon:5};
	return yaku;

	yaku={yakus:[{num:5,name:'花見酒'}],mon:5};
	return yaku;

	yaku={yakus:[{num:6,name:'月見酒'}],mon:5};
	return yaku;

	yaku={yakus:[{num:7,name:'猪鹿蝶'}],mon:5};
	return yaku;

	yaku={yakus:[{num:8,name:'赤短'}],mon:5};
	return yaku;

	yaku={yakus:[{num:9,name:'青短'}],mon:5};
	return yaku;

	yaku={yakus:[{num:10,name:'タネ'}],mon:1};
	return yaku;

	yaku={yakus:[{num:11,name:'タン'}],mon:1};
	return yaku;

	yaku={yakus:[{num:12,name:'カス'}],mon:1};
	return yaku;

}

