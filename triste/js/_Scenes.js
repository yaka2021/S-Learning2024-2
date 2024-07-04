//======================================================
// - Scene
//======================================================
class Scene_Base{
	constructor(){
		this.create();
	}
	create(){
		this.active = true;
		this._sprites = [];
	}
	createSprite(imgPath){
		const sprite = new PIXI.Sprite(
			imgPath ? new PIXI.Texture.from("./img/"+imgPath) : null
		);
		sprite._knsCnt = 0;
		this._sprites.push(sprite);
		GraphicManager.app.stage.addChild(sprite);
		return sprite;
	}
	update(){
		this.updateFilters(GraphicManager.app.stage);
	}
	updateFilters(sp){
		if (sp && sp.filters) sp.filters.forEach(filter =>{
			switch (filter.constructor){
				case PIXI.filters.OldFilmFilter:
					filter.sepia = Math.min(0.65, filter.sepia + 0.005);
					filter.noise = Math.min(0.45, filter.noise + 0.002);
					filter.vignetting = Math.min(0.3, filter.vignetting + 0.001)
					filter.time += 0.1;
					break;
				case PIXI.filters.GodrayFilter:
					filter.time += 0.02;
					break;
				default:
					filter.time += 1;
					break;
			}
		});
	}
	terminate(){
		this._sprites.forEach(sprite => {
			GraphicManager.app.stage.removeChild(sprite);
			if (sprite.texture && sprite.texture.baseTexture){
				sprite.texture.baseTexture.destroy();
			}
			// sprite.destroy();
		});
		this._sprites.length = 0;
		this.active = false;
	}
	pushFilterToBack(filter){
		GraphicManager.app.stage.filters = [filter];
	}
	filterCentralPos(){
		return [GraphicManager.width >> 1, GraphicManager.height >> 1];
	}
	isEventRunning(){ return false; }
	simpleShockFilter(pos){
		this.pushFilterToBack(
			new PIXI.filters.ShockwaveFilter(
				pos || this.filterCentralPos(),
				{	amplitude: 4,
					speed: 50,
					wavelength: 200,
					brightness: 1.5,
					radius: 500
				}
			)
		);
	}
}


class Scene_Title extends Scene_Base{
	create(){
		super.create();
		this.initVariables();
		this.createBackSprite();
		this.createLogoSprite();
		this.createButtons();
	}
	initVariables(){
		this.comIndex = 0;
		AudioManager.stopBgm();
		GraphicManager.app.stage.filters = [];
	}
	createBackSprite(){
		this.back = this.createSprite("2-2.png");
		this.back.filters = [new PIXI.filters.GodrayFilter(
			this.filterCentralPos(),{
			gain: 0.5,
			lacunarity: 2.8,
			alpha: 0.6,
			angle: 30
		})];
		this.back.alpha = 0;
	}
	createLogoSprite(){
		this.logo = this.createSprite("Title.png");
		this.logo.x = -360;
		this.logo.y = 60;
	}
	createButtons(){
		this.commands = new Array(3);
		const comHeight = 48;
		for (let i = 0; i < this.commands.length; i++){
			const sp = this.createSprite("command" + i + ".png");
			sp.x = -320;
			sp.y = 220 + comHeight * i;
			sp._knsCnt = i * -4;
			this.commands[i] = sp;
		}
	}
	update(){
		super.update();
		if (this.active === false) return;
		this.updateBack();
		this.updateLogo();
		this.updateCommands();
		this.updateInput();
		this.updateFilters(this.back);
		this.commands.forEach(sp => this.updateFilters(sp));
	}
	updateBack(){
		this.back.alpha = Math.min(1, this.back.alpha + 0.05);
	}
	updateLogo(){
		let max = this.knsMaxCnt;
		if (this.logo._knsCnt < max){
			const rate = ++this.logo._knsCnt / max;
			this.logo.x = Math.floor(this.logo.x - this.logo.x * rate);
		}
	}
	updateCommands(){
		let max = 50;
		this.commands.forEach((sp, i) => {
			if (sp._knsCnt < 0){
				++sp._knsCnt;
			}else if (sp._knsCnt < max){
				const rate = ++sp._knsCnt / max;
				sp.x = (20 - sp.x * rate) + sp.x;
			}
			if (i == this.comIndex){
				sp.alpha = Math.min(sp.alpha + 0.1, 1);
			}else{
				sp.alpha = Math.max(sp.alpha - 0.1, 0.6);
			}
		});
	}
	updateInput(){
		if (InputManager.isTriggered('ok')){
			AudioManager.playSe(0);
			this.simpleShockFilter();
			GraphicManager.sceneGoto(Scene_Stage);
			return;
		}
		let result = false;
		if (InputManager.isTriggered('down')){
			result = true;
			this.comIndex = (this.comIndex + 1) % this.commands.length;
		}else if(InputManager.isTriggered('up')){
			result = true;
			const max = this.commands.length;
			this.comIndex = (this.comIndex - 1 + max) % max;
		}
		if (result === true){
			const sp = this.commands[this.comIndex];
			if (sp){
				if (this.back.filters.length == 2){
					this.back.filters.pop();
				}
				sp.filters = [
					new PIXI.filters.ShockwaveFilter(
						[sp.width >> 1, sp.height >> 1],
						{	amplitude: 4,
							speed: 20,
							wavelength: 200,
							brightness: 1,
							radius: 500
						}
					)
				];
				this.back.filters.push(new PIXI.filters.ShockwaveFilter(
					[sp.x + sp.width / 2, sp.y + sp.height / 2],
					{	amplitude: 4,
						speed: 20,
						wavelength: 200,
						brightness: 1,
						radius: 500
					}
				));
			}
			AudioManager.playSe(1);
			switch (this.comIndex){
				case 0: AudioManager.stopBgm();break;
				case 1: AudioManager.playBgm(0);break;
				case 2: AudioManager.playBgm(1);break;
			}
		}
	}
	get knsMaxCnt(){ return 100; }
}

class Scene_Stage extends Scene_Base{
	create(){
		super.create();
		this.initVariables();
		this.createBackSprite();
		this.createPazzleBack();
		this.createPazzleStage();
		this.createHoldItem();
		this.createNextItem();
		this.createDeletedCnt();
		this.createCurrentMino();
		this.createTargetMino();
		this.createPressAnyButton();
	}
	initVariables(){
		StageManager.initVariables();
		ScoreManager.initVariables();
		this.lineDeletingCnt = 0;
		this.gameOverCnt = 0;
		this.lastDeletedCnt = -1;
	}
	isEventRunning(){
		return this.lineDeletingCnt > 0 || this.gameOverCnt > 0;
	}
	createBackSprite(){
		this.backSprite = this.createSprite("2-2.png");
		this.backSprite.filters = [new PIXI.filters.GodrayFilter(
			this.filterCentralPos(),{
			gain: 0.5,
			lacunarity: 2.8,
			alpha: 0.6,
			angle: 30
		})];
	}
	createPazzleBack(){
		this.pazzleBack = this.createSprite('background.png');
		this.pazzleBack.position.set(200, 10);
		this.pazzleBack.alpha = 0;
	}
	createPazzleStage(){
		this.pazzleStage = this.createSprite();
		this.pazzleStage.x = 20;
		this.pazzleBack.addChild(this.pazzleStage);
	}
	createHoldItem(){
		this.holdItemBack = this.createSprite('hold.png');
		this.holdItemBack.position.set(20, 40);
		this.holdItemBack.alpha = 0;
		// a hold mino
		const sp = new PIXI.Sprite();
		sp.position.set(75, 90);
		sp.scale.x = sp.scale.y = 0.75;
		sp.anchor.x = sp.anchor.y = 0.5;
		this.holdItemBack.addChild(sp);
	}
	createNextItem(){
		this.nextItemBack = this.createSprite('next.png');
		this.nextItemBack.position.set(600, 40);
		this.nextItemBack.alpha = 0;
		// next minos
		for (let i = 0; i < StageManager.nextArray.length; i++){
			const sp = new PIXI.Sprite();
			sp.position.set(75, 90 + 100 * i);
			sp.anchor.x = sp.anchor.y = 0.5;
			sp.scale.x = sp.scale.y = 0.75;
			this.nextItemBack.addChild(sp);
		}
	}
	createDeletedCnt(){
		this.deletedCntSprite = this.createSprite("delete.png");
		this.deletedCntSprite.position.set(20, 300);
		this.deletedCntSprite.alpha = 0;
		const sp = this.createSprite();
		sp.position.set(20, 30);
		this.deletedCntSprite.addChild(sp);
	}
	createCurrentMino(){
		this.currentMino = this.createSprite();
		this.pazzleStage.addChild(this.currentMino);
	}
	createTargetMino(){
		this.targetMino = this.createSprite();
		this.targetMino.blendMode = PIXI.BLEND_MODES.SCREEN;
		this.targetMino.alpha = 0.75;
		this.pazzleStage.addChild(this.targetMino);
	}
	createPressAnyButton(){
		this.pressAny = this.createSprite("pressAnyButton.png");
		this.pressAny.position.set(
			GraphicManager.width >> 1, GraphicManager.height >> 1
		);
		this.pressAny.anchor.x = this.pressAny.anchor.y = 0.5;
		this.pressAny.alpha = 0;
	}
	update(){
		super.update();
		if (this.active === false) return;
		if (this.updateFadeIn() === false){
			StageManager.update();
		}
		this.updateGameOverCnt();
		this.updateDeletingCnt();
		this.updateFilters(this.backSprite);
		this.updatePazzleStage();
		this.updateCurrentMino();
		this.updateDeletedCnt();
	}
	updateFadeIn(){
		const opa = this.pazzleBack._knsCnt, max = 30;
		if (opa < max){
			const rate = ++this.pazzleBack._knsCnt / max;
			this.nextItemBack.alpha = this.holdItemBack.alpha =
			this.pazzleBack.alpha = this.deletedCntSprite.alpha =
			rate;
			return true;
		}else{
			return false;
		}
	}
	updateCurrentMino(){
		const cMino = StageManager.currentMino;
		if (cMino){
			if (cMino.needRefresh == true){
				if (this.checkGameOver() === true){
					cMino.needRefresh = false;
					this.currentMino.texture = null;
					this.targetMino.texture = null;
					return;
				}
				this.currentMino.texture = this.targetMino.texture =
				cMino.mino.parseMino(cMino.direction);
				cMino.needRefresh = false;
				this.refreshHoldMino();
				this.refreshNextMinos();
			}
			this.currentMino.x = cMino.displayX;
			this.currentMino.y = cMino.displayY;
			this.targetMino.x = this.currentMino.x;
			this.targetMino.y = cMino.targetY;
		}else{
			this.currentMino.texture = null;
			this.targetMino.texture = null;
		}
	}
	updatePazzleStage(){
		if (StageManager.needRefresh === true){
			this.refreshPazzleStage();
			const result = StageManager.checkRemovingLines();
			if (result.length > 0){
				this.lineDeletingCnt = 40;
				ScoreManager.addDeleteLine(result.length);
			}
		}
	}
	refreshPazzleStage(){
		this.pazzleStage.texture = StageManager.createNewStageTexture();
	}
	updateDeletedCnt(){
		const nowScore = ScoreManager.deleteCnt;
		if (this.lastDeletedCnt !== nowScore){
			this.lastDeletedCnt = nowScore;
			const sp = this.deletedCntSprite.children[0];
			sp.texture = ScoreManager.drawScore(nowScore);
		}
	}
	updateDeletingCnt(){
		if (this.lineDeletingCnt > 0){
			switch (--this.lineDeletingCnt){
				case 0:
					break;
				case 10:
					StageManager.removeLinesToDelete();
					this.refreshPazzleStage();
					break;
				case 24:
					AudioManager.playSe(0);
					this.refreshPazzleStage();
					this.simpleShockFilter();
					break;
				case 39:
					AudioManager.playSe(1);
					this.currentMino.texture = null;
					this.targetMino.texture = null;
					break;
			}
		}
	}
	checkGameOver(){
		if (StageManager.checkGameOver() === true){
			this.gameOverCnt = 1;
			this.currentMino.texture = null;
			this.targetMino.texture = null;
		}
	}
	updateGameOverCnt(){
		if (this.gameOverCnt === 0) return;
		if (this.gameOverCnt <= 150){
			let removeFirst = 9;
			switch(++this.gameOverCnt){
				case 2:
					AudioManager.stopBgm();
					AudioManager.playSe(1);
					this.simpleShockFilter();
					break;
				case 120:
					AudioManager.playBgm(2);
					this.pushFilterToBack(new PIXI.filters.OldFilmFilter(
						{
							sepia: 0,
							noise: 0,
							vignetting: 0,
							vignettingBlur: 0.36
						}
					));
					break;
				default:
					if (
						this.gameOverCnt >= removeFirst &&
						this.gameOverCnt % 3 == 0
					){
						StageManager.fillGameOver(
							23 - (this.gameOverCnt / 3)
						);
					}
					break;
			}
		}else{
			if (
				InputManager.isTriggered('ok') ||
				InputManager.isTriggered('cancel')
			){
				GraphicManager.sceneGoto(Scene_Title);
			}
			this.pressAny.alpha = Math.max(0, this.pressAny.alpha + 0.01);
		}
	}
	refreshHoldMino(){
		const sp = this.holdItemBack.children[0];
		const hold = StageManager.holdMino;
		if (hold){
			sp.texture = hold.parseMino(0);
		}else{
			sp.texture = null;
		}
	}
	refreshNextMinos(){
		this.nextItemBack.children.forEach(mino => mino.texture = null);
		StageManager.nextArray.forEach(function(mino, i){
			const sp = this.nextItemBack.children[i];
			if (sp && mino){
				sp.texture = mino.parseMino(0);
			}
		}, this);
	}
}
