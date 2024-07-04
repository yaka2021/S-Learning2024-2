//======================================================
// - StageManager
//======================================================
class StageManager{
	// minos
	static whenClear(){}
	static setMinos(arr){
		this.minos = arr.map((mino, i) => new StaticPazzle(mino, i));
	}
	static getRandomMino(){
		const id = Math.floor(this.minos.length * Math.random());
		if (this.checkFlag.length >= StageManager.FLAG_TIMES){
			this.checkFlag.shift();
		}
		this.checkFlag.push(id);
		if (
			this.isFlagCleared === false &&
			this.checkFlag.length >= StageManager.FLAG_TIMES &&
			this.checkFlag.every(m => m === 4)
		){
			this.whenClear();
			this.isFlagCleared = true;
		}
		return this.minos[id];
	}
	static get stageWidth(){ return 10; }
	static get stageHeight(){ return 20; }
	static get minoSize(){ return 32; }
	static initVariables(){
		this.holdUsed = false;
		this.isFlagCleared = false;
		this.checkFlag = [];
		this.stageTable = new Array(this.stageHeight).fill(0).
		map(()=> this.makeXTable());
		this.holdMino = null;
		this.nextArray = new Array(3).fill(0).map(
			()=>this.getRandomMino()
		);
		this.currentMino = new ControlPazzles();
		this.nextBlock();
	}
	static makeXTable(){
		return new Uint8Array(this.stageWidth);
	}
	static nextBlock(){
		this.holdUsed = false;
		this.currentMino.setMino(this.nextArray.shift());
		this.nextArray.push(this.getRandomMino());
	}
	static checkGameOver(){
		const firstLine = this.stageTable[0];
		let cnt = 0;
		for (let x = 3; x <= 6; x++){
			if (firstLine[x] !== 0) cnt++;
		}
		return cnt >= 2;
	}
	static setHold(){
		if (this.holdUsed === true){
			return false;
		}
		const currentMino = this.currentMino.mino;
		if (this.holdMino){
			this.currentMino.setMino(this.holdMino);
			this.holdMino = currentMino;
		}else{
			this.holdMino = currentMino;
			this.nextBlock();
		}
		this.holdUsed = true;
		return true;
	}
	static update(){
		if (this.currentMino.update() == false){
			this.nextBlock();
		}
	}
	static isBlockInStageRange(x, y){
		return (
			-10 <= y && y < this.stageHeight &&
			0 <= x && x < this.stageWidth
		);
	}
	static isBlockMovable(mino, dir, cx, cy, nx, ny){
		let result = true;
		let tx = cx + nx;
		let ty = cy + ny;
		mino.readByDirection(dir, function(x0, y0, x1, y1){
			if (result === true && mino.area[x1][y1] == 1){
				let x2 = x0 + tx;
				let y2 = y0 + ty;
				if (this.isBlockInStageRange(x2, y2)){
					if (y2 < 0) return;
					for (let i = 0; i < 2; i++){
						if (this.stageTable[y2][x2] !== 0){
							result = false;
							break;
						}
					}
				}else{
					result = false;
				}
			}
		}.bind(this));
		return result;
	}
	static setMinoOnStage(mino, x, y, dir){
		let sx = mino.sx;
		mino.readByDirection(dir, function(x0, y0, x1, y1){
			if (mino.area[x1][y1] == 1){
				let x2 = x + x0, y2 = y + y0;
				if (0 <= y2 && this.isBlockInStageRange(x2, y2)){
					this.stageTable[y2][x2] = sx + 1;
				}
			}
		}.bind(this));
		this.needRefresh = true;
	}
	static checkRemovingLines(){
		const lines = [];
		for (let y = 0; y < this.stageTable.length; y++){
			if (this.isLineToDelete(y)){
				this.stageTable[y].fill(StageManager.DELETE_X);
				lines.push(y);
			}
		}
		return lines;
	}
	static removeLinesToDelete(){
		const height = this.stageTable.length;
		const newTable = this.stageTable.filter((x, y)=>!this.isLineToDelete(y));
		while (newTable.length !== height){
			newTable.unshift(this.makeXTable());
		}
		this.stageTable = newTable;
	}
	static isLineToDelete(y){
		return this.stageTable[y].every(b => b != 0);
	}
	static fillGameOver(y){
		if (0 <= y && y < this.stageHeight){
			this.stageTable[y] = this.stageTable[y].map(
				b => b === 0 ? 0 : StageManager.DELETE_X
			);
			this.needRefresh = true;
		}
	}
	static createNewStageTexture(){
		const size = this.minoSize;
		const cvs = document.createElement('canvas');
		cvs.width = this.stageWidth * size,
		cvs.height = this.stageHeight * size;
		const ctx = cvs.getContext('2d');
		this.stageTable.forEach(function(xTable, y){
			let ty = y * size;
			for (let x = 0; x < xTable.length; x++){
				if (xTable[x] !== 0){
					ctx.drawImage(BasePazzle.pazzleImage,
						xTable[x] - 1, 0, size, size, x * size, ty, size, size
					);
				}
			}
		}, this);
		this.needRefresh = false;
		return PIXI.Texture.from(cvs);
	}
};
StageManager.DELETE_X = StageManager.minoSize * 7 + 1;
StageManager.FLAG_TIMES = 10;


StageManager.setMinos([
	[3, 4,
		1,1,0,
		0,1,1,
		0,0,0
	],
	[3, 4,
		0,0,1,
		1,1,1,
		0,0,0
	],
	[2, 1,
		1,1,
		1,1
	],
	[3, 4,
		0,1,1,
		1,1,0,
		0,0,0
	],
	[4, 2,
		0,1,0,0,
		0,1,0,0,
		0,1,0,0,
		0,1,0,0,
	],
	[3, 4,
		1,0,0,
		1,1,1,
		0,0,0
	],
	[3, 4,
		0,1,0,
		1,1,1,
		0,0,0
	]
]);
