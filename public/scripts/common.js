// 例：console.log(Judgeyaku([100,300,800])); //{yakus:[{num:1,name:'三光'}],mon:5}
//     console.log(Judgeyaku([100]));        //{yakus:[],mon:0}
//     ※役がない場合はyakus:[],mon:0
// Playscene.jsにデバッグ用コードあるよ
export const YAKU={1:'五光',2:'四光',3:'雨四光',4:'三光',5:'花見酒',6:'月見酒',7:'猪鹿蝶',8:'赤短',9:'青短',10:'タネ',11:'タン',12:'カス',13:'赤短青短'}//ここで役の一覧を管理すると分かりやすいかも

export function Judgeyaku(handlist){
	let hand =new Set(handlist);
	let yaku={yakus:[],mon:0};
	

	if(hand.has(100) && hand.has(300) && hand.has(800) && hand.has(1100) && hand.has(1200)){
		
		yaku.yakus.push('五光');
		yaku.mon+=10;

	}else if(hand.has(100) && hand.has(300) && hand.has(800) && hand.has(1200)){

		yaku.yakus.push('四光');
		yaku.mon+=8;

	}else if(hand.has(100) && hand.has(300) && hand.has(800) && hand.has(1100)){

		yaku.yakus.push('雨四光');
		yaku.mon+=7;

	}else if(hand.has(100) && hand.has(300) && hand.has(800)){
		
		yaku.yakus.push('三光');
		yaku.mon+=5;

	}else if(hand.has(100) && hand.has(300) && hand.has(1200)){
		
		yaku.yakus.push('三光');
		yaku.mon+=5;

	}else if(hand.has(100) && hand.has(800) && hand.has(1200)){
		
		yaku.yakus.push('三光');
		yaku.mon+=5;

	}else if(hand.has(300) && hand.has(800) && hand.has(1200)){
		
		yaku.yakus.push('三光');
		yaku.mon+=5;

	}

	if(hand.has(300) && hand.has(910)){
		yaku.yakus.push('花見酒');
		yaku.mon+=5;

	}

	if(hand.has(800) && hand.has(910)){

		yaku.yakus.push('月見酒');
		yaku.mon+=5;

	}

	if(hand.has(710) && hand.has(1010) && hand.has(610)){

		yaku.yakus.push('猪鹿蝶');
		yaku.mon+=5;

	}








	let yaku_akatanaotan = 0;

	if(hand.has(120) && hand.has(220) && hand.has(320) && hand.has(620) && hand.has(920) && hand.has(1020)){
	
		yaku.yakus.push('赤短青短');
		yaku.mon+=10;
		yaku_akatanaotan+=1;

	}

		if(yaku_akatanaotan===1 && hand.has(420)){
			yaku.mon+=1;
		}

		if(yaku_akatanaotan===1 && hand.has(520)){
			yaku.mon+=1;
		}

		if(yaku_akatanaotan===1 && hand.has(720)){
			yaku.mon+=1;
		}

		if(yaku_akatanaotan===1 && hand.has(1120)){
			yaku.mon+=1;
		}


	let yaku_akatan = 0;

	if(hand.has(120) && hand.has(220) && hand.has(320) && yaku_akatanaotan === 0){

		yaku.yakus.push('赤短');
		yaku.mon+=5;
		yaku_akatan+=1;

	}

		if(yaku_akatan===1 && hand.has(420) && yaku_akatanaotan === 0){
			yaku.mon+=1;
		}

		if(yaku_akatan===1 && hand.has(520) && yaku_akatanaotan === 0){
			yaku.mon+=1;
		}

		if(yaku_akatan===1 && hand.has(620) && yaku_akatanaotan === 0){
			yaku.mon+=1;
		}

		if(yaku_akatan===1 && hand.has(720) && yaku_akatanaotan === 0){
			yaku.mon+=1;
		}

		if(yaku_akatan===1 && hand.has(920) && yaku_akatanaotan === 0){
			yaku.mon+=1;
		}	

		if(yaku_akatan===1 && hand.has(1020) && yaku_akatanaotan === 0){
			yaku.mon+=1;
		}

		if(yaku_akatan===1 && hand.has(1120) && yaku_akatanaotan === 0){
			yaku.mon+=1;
		}


	let yaku_aotan = 0;

	if(hand.has(620) && hand.has(920) && hand.has(1020) && yaku_akatanaotan === 0){

		yaku.yakus.push('青短');
		yaku.mon+=5;
		yaku_aotan+=1;

	}

		if(yaku_aotan===1 && hand.has(120) && yaku_akatanaotan === 0 && yaku_akatan === 0){
			yaku.mon+=1;
		}

		if(yaku_aotan===1 && hand.has(220) && yaku_akatanaotan === 0 && yaku_akatan === 0){
			yaku.mon+=1;
		}

		if(yaku_aotan===1 && hand.has(320) && yaku_akatanaotan === 0 && yaku_akatan === 0){
			yaku.mon+=1;
		}

		if(yaku_aotan===1 && hand.has(420) && yaku_akatanaotan === 0 && yaku_akatan === 0){
			yaku.mon+=1;
		}
	
		if(yaku_aotan===1 && hand.has(520) && yaku_akatanaotan === 0 && yaku_akatan === 0){
			yaku.mon+=1;
		}
	
		if(yaku_aotan===1 && hand.has(720) && yaku_akatanaotan === 0 && yaku_akatan === 0){
			yaku.mon+=1;
		}

		if(yaku_aotan===1 && hand.has(1120) && yaku_akatanaotan === 0 && yaku_akatan === 0){
			yaku.mon+=1;
		}


		let tane = handlist.filter( function( value ) {
 
			return  value % 100 >= 10 && value % 100 <= 19;
		 
		})

		if(tane.length > 4){

			yaku.yakus.push('タネ');
			yaku.mon += (tane.length - 4);

		}



		let tan = handlist.filter( function( value ) {
 
			return  value % 100 >= 20 && value % 100 <= 29;
		 
		})

		if(tan.length >= 5  && yaku_akatanaotan === 0 && yaku_akatan === 0 && yaku_aotan === 0){

			yaku.yakus.push('タン');
			yaku.mon += (tan.length - 4);

		}



		let kasu = handlist.filter( function( value ) {
 
			return  value % 100 >= 30 && value % 100 <= 39;
		 
		})

		if(kasu.length >= 10 ){

			yaku.yakus.push('カス');
			yaku.mon += (kasu.length - 9);

		}


 





































 
	return yaku;

	
	}

