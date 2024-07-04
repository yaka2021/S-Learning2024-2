class Game_Battler{
	constructor(id){
		this.id = id;
		this.initParam();
	}

	initParam(){
		this.level = 1;
		this.hp = this.maxHP();
	}

	getId(){
		return this.id;
	}

	getData(){
		return $dataEnemies[this.getId()];
	}

	isFainted(){
		return this.hp == 0;
	}

	changeHP(dif){
		this.hp = Math.max(0, Math.min(this.hp - dif, this.maxHP()));
		return this.hp;
	}

	name()  { return this.getData()[0] || ""; }
	maxHP() { return Math.min(this.getData()[1] + this.level * 3,255); }
	maxAtk(){ return Math.min(this.getData()[2] + this.level * 2,255); }
	maxDef(){ return Math.min(this.getData()[3] + this.level * 1,255); }
	maxSpd(){ return Math.min(this.getData()[4] + this.level * 2,255); }
}

class Game_Player extends Game_Battler{
	constructor(){
		super(0);
		this.walkCnt = 0;
		this.setEncounterCnt();
	}

	setInit(){
		this.direction = 2;
		this.initParam();
		this.setPosition(8, 4);
		$gameMap.setup(1);
	}

	setPosition(x, y){
		this.x = x;
		this.y = y;
	}

	isWalking(){
		return this.walkCnt != 0;
	}

	isEncounter(){
		return this.encounterCnt == 0;
	}

	setEncounterCnt(){
		this.encounterCnt = Math.floor(Math.random() * $gameMap.getEncounterStep()) + 5;
	}

	update(){
		if (this.isWalking()){
			this.walkCnt -= 8;
			if (this.walkCnt == 0){
				switch (this.direction){
					case 2: this.y += 1;break;
					case 4: this.x -= 1;break;
					case 6: this.x += 1;break;
					case 8: this.y -= 1;break;
				}
				this.encounterCnt--;
			}
		}else{
			if (Input.isPressed("up"))   { return this.moveUp(); }
			if (Input.isPressed("down")) { return this.moveDown(); }
			if (Input.isPressed("left")) { return this.moveLeft(); }
			if (Input.isPressed("right")){ return this.moveRight(); }
		}
	}

	calcRealX(){
		const prm = this.x << 4;
		if (this.isWalking()){
			if (this.direction == 4){ return prm - (16-this.walkCnt); }
			if (this.direction == 6){ return prm + (16-this.walkCnt); }
		}
		return prm;
	}

	calcRealY(){
		const prm = this.y << 4;
		if (this.isWalking()){
			if (this.direction == 2){ return prm + (16-this.walkCnt); }
			if (this.direction == 8){ return prm - (16-this.walkCnt); }
		}
		return prm;
	}

	setDirection(n){ this.direction = n; }

	moveOneSquare(){
		let x2 = this.x, y2 = this.y;
		switch (this.direction){
			case 2:y2+=1;break;
			case 4:x2-=1;break;
			case 6:x2+=1;break;
			case 8:y2-=1;break;
		}
		if ($gameMap.isPassable(x2, y2)){
			this.walkCnt = 16;
		}
	}

	moveDown(){
		this.setDirection(2);
		this.moveOneSquare();
	}

	moveLeft(){
		this.setDirection(4);
		this.moveOneSquare();
	}

	moveRight(){
		this.setDirection(6);
		this.moveOneSquare();
	}

	moveUp(){
		this.setDirection(8);
		this.moveOneSquare();
	}
}



class Game_Map{
	constructor(){
		this.mapId = 1;
		this.passable = [0];
	}

	getData(){ return this.data; }
	getMusic(){ return this.bgm || ""; }
	getWidth(){ return this.width; }
	getHeight(){ return this.height; }
	getEncounterStep(){ return this.encounterStep || 10; }
	getEncounterList(){ return this.encounterList; }

	setup(mapId){
		this.mapId = mapId;
		const json = $gameMapData[mapId];
		if (json){
			this.bgm = json.bgm;
			this.data = new Uint8Array(json.data);
			this.width = json.width;
			this.height = json.height;
			this.encounterStep = json.encounterStep;
			this.encounterList = json.encounterList;
		}else{
			this.bgm = "";
			this.data = new Uint8Array(4);
			this.width = 2;
			this.height = 2;
			this.encounterStep = 10;
			this.encounterList = [];
		}
	}

	isPassable(x, y){
		let index = x + y * this.getWidth();
		const data = this.getData();
		return 0 <= index && index < data.length ? this.passable.includes(data[index]) : false;
	}

}
