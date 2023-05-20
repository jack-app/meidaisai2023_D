// 例：console.log(Judgeyaku([100,300,800])); //{yakus:[{num:1,name:'三光'}],mon:5}
//     console.log(Judgeyaku([100]));        //{yakus:[],mon:0}
//     ※役がない場合はyakus:[],mon:0
// Playscene.jsにデバッグ用コードあるよ
export const YAKU={1:'三光',}//ここで役の一覧を管理すると分かりやすいかも

export function Judgeyaku(hand){
	yaku={yakus:[],mon:0};
	return yaku;
}
