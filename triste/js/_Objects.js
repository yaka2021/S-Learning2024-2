//======================================================
// - Object
//======================================================
class BasePazzle{
	constructor(){
		this.sx = 0;
		this.size = 0;
	}
	minoWH(){ return StageManager.minoSize; }
	parseMino(direction){
		const wh = this.minoWH();
		const cvs = document.createElement('canvas');
		cvs.width = cvs.height = this.size * wh;
		const ctx = cvs.getContext('2d');
		this.readByDirection(direction, function(x0, y0, x1, y1){
			if (this.area[x1][y1] == 1){
				ctx.drawImage(
					BasePazzle.pazzleImage,
					this.sx, 0, wh, wh,
					wh * x0, wh * y0, wh, wh
				);
			}
		}.bind(this));
		return PIXI.Texture.from(cvs);
	}
	readByDirection(direction, callback){
		if (callback === undefined) return;
		let x, y;
		let revert = this.size - 1;
		for (y = 0; y < this.size; y++){
			let y2 = revert - y;
			for (x = 0; x < this.size; x++){
				switch (direction){
					case 0:  callback(x, y, x, y); break;
					case 1:  callback(x, y, y, revert - x); break;
					case 2:  callback(x, y, revert - x, y2); break;
					default: callback(x, y, y2, x); break;
				}
			}
		}
	}
}
BasePazzle.pazzleImage = new Image();
BasePazzle.pazzleImage.src = "./img/pazzle.png";

class StaticPazzle extends BasePazzle{
	// width, color
	constructor(arr, sx){
		super();
		this.sx = sx * this.minoWH();
		this.size = arr[0];
		this.rotateCnt = arr[1];
		this.area = new Array(this.size).fill(0).map(
			()=>new Uint8Array(this.size)
		);
		let i = 2;
		for (let y = 0; y < this.size; y++){
			for (let x = 0; x < this.size; x++){
				this.area[x][y] = arr[i++];
			}
		}
	}
};

class ControlPazzles extends BasePazzle{
	get maxFallTime(){
		const score = ScoreManager.deleteCnt;
		return Math.max(1, 20 - (score >> 2));
	}
	constructor(){
		super();
		this.direction = 0;
		this.waitCnt = 0;
		this.waitInput = 0;
	}
	initPos(){
		this.x = (StageManager.stageWidth - this.mino.size) >> 1;
		this.y = -3;
		this.direction = 0;
		this.fallTime = 0;
	}
	setMino(staMino){
		this.mino = staMino;
		this.initPos();
		this.movable = true;
		this.needRefresh = true;
	}
	update(){
		if (GraphicManager.isEventRunning() === true){
			return true;
		}
		if (this.movable === false || this.mino == null){
			return false;
		}
		if (this.inputRotate() === false){
			this.inputTrigger();
		}
		this.updateFall();
		return true;
	}
	updateFall(){
		const max = this.maxFallTime;
		if (++this.fallTime >= max){
			this.fallTime = 0;
			this.checkDown();
		}
	}
	checkDown(){
		if (this.checkMove(0, +1) === false){
			this.onFall();
			return false;
		}
		return true;
	}
	get displayX(){ return this.x * this.minoWH(); }
	get displayY(){
		if (this.isBlockOnAir() === true){
			return (this.y + (this.fallTime / this.maxFallTime)) * this.minoWH();
		}else{
			return this.y * this.minoWH();
		}
	}
	get targetY(){
		let cnt = 25, oldY = this.y;
		while (this.checkMove(0, +1) === true) if (cnt-- <= 0) break;
		let ty = this.y;
		this.y = oldY;
		return ty * this.minoWH();
	}
	isBlockOnAir(){
		return this.checkMove(0, +1, this.direction, true);
	}
	onFall(){
		AudioManager.playSe(2);
		this.movable = false;
		this.fallTime = 0;
		StageManager.setMinoOnStage(this.mino, this.x, this.y, this.direction);
	}
	inputRotate(){
		if (InputManager.isTriggered('ok')){
			const newDir = (this.direction + 1) % this.mino.rotateCnt;
			if (
				(
					this.checkMove(0,  1, newDir, true) &&
					this.checkMove(0,  0, newDir)
				) || (
					this.checkMove(-1, 1, newDir, true) &&
					this.checkMove(-1, 0, newDir)
				) || (
					this.checkMove(+1, 1, newDir, true) &&
					this.checkMove(+1, 0, newDir)
				) || (
					this.checkMove(0, 2, newDir, true) &&
					this.checkMove(0, 1, newDir)
				) || (
					this.checkMove(-1, 2, newDir, true) &&
					this.checkMove(-1, 1, newDir)
				) || (
					this.checkMove(+1, 2, newDir, true) &&
					this.checkMove(+1, 1, newDir)
				)
			){
				this.direction = newDir;
				this.needRefresh = true;
				AudioManager.playSe(0);
				return true;
			}else{
				AudioManager.playSe(1);
			}
		}
		return false;
	}
	inputTrigger(){
		if (InputManager.isTriggered('up')){
			while (this.checkDown()){}
		}else if (InputManager.isTriggered('cancel')){
			if (StageManager.setHold() == true){
				AudioManager.playSe(2);
			}else{
				AudioManager.playSe(1);
			}
		}else{
			if (this.waitInput > 0){
				this.waitInput--;
			}
			if (InputManager.isPressed('left')){
				this.checkMove(-1, 0);
				if (InputManager.isTriggered('left')) this.waitInput = 15;
			}else if (InputManager.isPressed('right')){
				this.checkMove(+1, 0);
				if (InputManager.isTriggered('right')) this.waitInput = 15;
			}else if (InputManager.isPressed('down')){
				this.checkDown();
				this.waitInput = 9;
			}
		}
	}
	checkMove(nx, ny, dir, not_work){
		if (dir === undefined) dir = this.direction;
		if (StageManager.isBlockMovable(
			this.mino, dir, this.x, this.y, nx, ny
		)){
			if (not_work !== true){
				this.x += nx;
				this.y += ny;
			}
			return true;
		}else{
			return false;
		}
	}
};

