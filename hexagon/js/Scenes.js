class Scene_Base{
	constructor(manager){
		this.charIndex = "0123456789!?abcdefghijklmnopqrstuvwxyz.,-:>@_".split("");
		this.manager = manager;
	}

	start(){
		this.screenClear();
	}

	update(){
		this.updateInput();
	}

	updateInput(){

	}

	terminate(){
	}

	changeScene(scene, arg){
		this.manager.changeScene(scene, arg);
	}

	fillRect(x,y,w,h,c){
		RENDERER.fillStyle = c || "#000";
		RENDERER.fillRect(x,y,w,h);
	}

	screenClear(){
		this.fillRect(0,0,GRAPHICS_WIDTH,GRAPHICS_HEIGHT);
	}

	playBGM(name){
		BGM.src = "./audio/"+name+".mp3";
		BGM.volume = 0.05;
		BGM.play();
	}

	stopBGM(){
		BGM.pause();
	}

	playSE(name){
		SE.src = "./audio/"+name+".mp3";
		SE.volume = 0.1;
		SE.play();
	}

	playOk(){this.playSE("maoSys37");}
	playCancel(){this.playSE("maoSys38");}
	playCursor(){this.playSE("maoSys38");}
	playBuzzer(){this.playSE("maoSys36");}

	imageBlt(img, index,x,y,w,h,renderer){
		w = (w || 1) << 3;
		h = (h || 1) << 3;
		const tmpWidth = img.width >> 3;
		const sx = (index % tmpWidth) << 3;
		const sy = Math.floor(index / tmpWidth) << 3;
		(renderer || RENDERER).drawImage(img,sx,sy,w,h,x,y,w,h);
	}

	drawWindow(x,y,w,h){
		const x2 = x + w - 8;
		const y2 = y + h - 8;
		this.fillRect(x,y,w,h);
		let i = x;
		let j = w + x - 8;
		while (i < j){
			i += 8;
			this.imageBlt($binSrc,49,i,y);
			this.imageBlt($binSrc,52,i,y2);
		}
		i = y;
		j = h + y - 8;
		while (i < j){
			i += 8;
			this.imageBlt($binSrc,54,x,i);
			this.imageBlt($binSrc,55,x2,i);
		}
		this.imageBlt($binSrc,48,x,y);
		this.imageBlt($binSrc,50,x2,y);
		this.imageBlt($binSrc,51,x,y2);
		this.imageBlt($binSrc,53,x2,y2);
	}

	drawText(text, x, y){
		const oldX = x;
		text = String(text).toLowerCase();
		text.split("").forEach(function(char){
			switch (char){
				case " ":
					x += 8;
					break;
				case "\n":
					x = oldX;
					y += 8;
					break;
				default:
					const index = this.charIndex.indexOf(char);
					if (index != -1){
						this.imageBlt($binSrc, index, x, y);
					}
					x += 8;
					break;
			}
		}, this);
	}
}

class Scene_Title extends Scene_Base {
	start(){
		super.start();
		this.playCnt = 0;
		this.commandIndex = 0;
		this.logoY = -24;
		this.drawScreen();
	}

	drawLogo(x, y){
		this.imageBlt($binSrc, 60,x,y,2,2);
		this.imageBlt($binSrc, 62,x+16,y+8,6,1);
		this.imageBlt($binSrc, 68,x+40,y+16,1,1);
	}

	drawScreen(){
		this.drawLogo(80,this.logoY)
		let x = 96;
		let y = 160;
		for (let i = 0; i < 2; i++){
			if (i == this.commandIndex){
				this.drawText(">",x-16,y);
			}
			this.drawText($dataVocab.title[i],x,y);
			y += 24;
		}
		this.drawText($dataVocab.title[2],48,224);
	}

	update(){
		super.update();
		this.updateGraphics();
		if (this.playCnt == 1){
			this.playBGM("mao8bit26");
			this.playCnt = 2;
		}
	}

	updateInput(){
		if (Input.isTriggered("ok")){
			this.playOk();
			if (this.commandIndex == 0){
				$gamePlayer.setInit();
				this.changeScene(Scene_Map);
				this.stopBGM();
			}else{
				this.changeScene(Scene_Password);
			}
		}else{
			if (Input.isTriggered("up") || Input.isTriggered("down")){
				this.commandIndex = (this.commandIndex+1) % 2;
				this.playCursor();
				if (this.playCnt == 0){ this.playCnt = 1; }
			}
		}
	}

	updateGraphics(){
		this.logoY = Math.min(this.logoY + 2, 60);
		this.screenClear();
		this.drawScreen();
	}
}

class Scene_Password extends Scene_Base{
	start(){
		super.start();
		this.NameList = "0123456789abcdefghijklmnopqrstuvwxyz!?".split("");
		this.NameList.push("del", "ok");
		this.answerText = new Array(this.manager.makePassword().length).fill("_");
		this.answerIndex = 0;
		this.inputIndex = 0;
		this.refresh();
	}

	refresh(){
		this.screenClear();
		this.drawInputAnswer();
		this.drawInputBoard();
	}

	drawInputAnswer(){
		let y = 40;
		this.drawWindow(0,y,256,56);
		y += 8;
		this.drawText($dataVocab.message[6],32,y);
		y += 16;
		this.drawText(this.answerText.join(""),48,y);
	}

	drawInputBoard(){
		let i = 0;

		let oldX = 16;
		let x = oldX;
		let y = 96;
		this.drawWindow(0,y,256,88);
		y += 16;
		this.NameList.forEach(function(char){
			if (i == this.inputIndex){
				this.drawText(">",x-8,y);
			};
			this.drawText(char,x,y);
			if (++i % 10 == 0){
				x = oldX;
				y += 16
			}else{
				x += 24;
			};
		}, this);
	}

	updateInput(){
		if (Input.isTriggered("ok")) { return this.processOk(); }
		if (Input.isTriggered("cancel")){ return this.processCancel(); }
		let needRefresh = false;
		if (Input.isPressed("up")){
			this.inputIndex += this.NameList.length - 10;
			this.inputIndex %= this.NameList.length;
			needRefresh = true;
		}
		if (Input.isPressed("down")){
			this.inputIndex += 10;
			this.inputIndex %= this.NameList.length;
			needRefresh = true;
		}
		if (Input.isPressed("left") && this.inputIndex % 10 != 0){
			this.inputIndex -= 1;
			needRefresh = true;
		}
		if (Input.isPressed("right") && this.inputIndex % 10 != 9){
			this.inputIndex += 1;
			needRefresh = true;
		}
		if (needRefresh == true){
			this.playCursor();
			this.refresh();
		}
	}

	processOk(){
		if (this.inputIndex == this.NameList.length-1){
			if (this.answerIndex == this.answerText.length){
				this.loadPassword();
			}else{
				this.playBuzzer();
			}
		}else if (this.inputIndex == this.NameList.length-2){
			this.processCancel();
		}else{
			if (this.answerIndex != this.answerText.length){
				this.playOk();
				this.answerText[this.answerIndex++] = this.NameList[this.inputIndex];
				this.refresh();
			}else{
				this.playBuzzer();
			}
		}
	}

	loadPassword(){
		this.playOk();
		this.stopBGM();
		this.manager.extractPassword(this.answerText);
		this.changeScene(Scene_Map);
	}

	processCancel(){
		this.playCancel();
		if (this.answerIndex != 0){
			this.answerText[--this.answerIndex] = "_";
			this.refresh();
		}else{
			this.changeScene(Scene_Title);
		}
	}
}

class Scene_Map extends Scene_Base{
	start(){
		super.start();
		this.menuIndex = -1;
		this.playBGM($gameMap.getMusic());
		this.createMapBitmap();
	}

	createMapBitmap(){
		this.mapImageData = document.createElement("canvas");
		const width  = $gameMap.getWidth() << 4;
		const height = $gameMap.getHeight() << 4;
		this.mapImageData.width = width;
		this.mapImageData.height = height;
		this.mapImageData = this.mapImageData.getContext('2d',{
			antialias: false,
			alpha: false,
			depth: false
		});

		let x = 0, y = 0;
		$gameMap.getData().forEach(function (tileId){
			this.imageBlt($mapSrc, tileId << 1, x, y, 2, 2, this.mapImageData);
			x += 16;
			if (x == width){
				x = 0;
				y += 16;
			}
		}, this);
		this.mapImageData = this.mapImageData.getImageData(0,0,width,height);
	}

	update(){
		super.update();
		if (this.menuIndex == -1){
			this.updateGraphics();
			this.updateEncounter();
		}else{
			this.updateMenu();
		}
	}

	updateEncounter(){
		if ($gamePlayer.isEncounter()){
			const list = $gameMap.getEncounterList();
			if (list.length > 0){
				this.playSE("maoRetro28");
				this.changeScene(Scene_Battle, list[Math.floor(Math.random() * list.length)]);
			}
			$gamePlayer.setEncounterCnt();
		}
	}

	updateInput(){
		if (Input.isTriggered("cancel") && !$gamePlayer.isWalking()){
			if (this.menuIndex == -1){
				this.playOk();
				this.menuIndex = 0;
				this.resetCnt = 0;
				this.refreshMenu();
			}else{
				this.playCancel();
				this.menuIndex = -1;
			}
		}
	}

	refreshMenu(){
		let x = 0;
		let y = 0;
		this.drawWindow(x,y,96,112);
		x += 16;
		y += 16;
		let i = 0;
		$dataVocab.menu.forEach(function(term){
			if (i++ == this.menuIndex){
				this.drawText(">", x-8, y);
			}
			this.drawText(term, x, y);
			y += 16;
		}, this);
		x -= 8;
		this.drawText($gamePlayer.name(), x, y+=8);
		this.drawParam(0, $gamePlayer.level, x, y+=8);
		this.drawParam(1, $gamePlayer.maxHP(), x, y+=8);
		this.drawParam(2, $gamePlayer.maxAtk(), x, y+=8);
		this.drawParam(3, $gamePlayer.maxDef(), x, y+=8);
		this.drawParam(4, $gamePlayer.maxSpd(), x, y+=8);
	}

	drawParam(id, value, x, y){
		this.drawText($dataVocab.param[id], x, y);
		this.drawText(value, 88 - (String(value).length << 3), y);
	}

	updateMenu(){
		const max = $dataVocab.menu.length;
		let needRefresh = false;
		if (Input.isTriggered("ok")){
			this.playOk();
			let x = 0, y = 160;
			this.drawWindow(x,y,GRAPHICS_WIDTH - x, GRAPHICS_HEIGHT - y);
			x += 8;
			y += 16;
			if (this.menuIndex == 0){
				this.drawText($dataVocab.message[5],x,y)
				this.drawText(this.manager.makePassword(),x, y+16);
			}else{
				if (this.resetCnt == 1){
					this.stopBGM();
					this.changeScene(Scene_Title);
				}else{
					this.resetCnt++;
					this.drawText($dataVocab.message[7],x, y);
				}
			}
		}else if (Input.isTriggered("up")){
			this.playCursor();
			this.menuIndex = (this.menuIndex - 1 + max) % max;
			needRefresh = true;
		}else if (Input.isTriggered("down")){
			this.playCursor();
			this.menuIndex = (this.menuIndex + 1) % max;
			needRefresh = true;
		}
		if (needRefresh){
			this.resetCnt = 0;
			this.updateMap();
			this.updateCharacters();
			this.refreshMenu();
		}
	}

	updateGraphics(){
		this.updateMap();
		$gamePlayer.update();
		this.updateCharacters();
	}

	updateMap(){
		RENDERER.putImageData(this.mapImageData,0,0,0,0,GRAPHICS_WIDTH,GRAPHICS_HEIGHT);
	}

	updateCharacters(){
		let x = $gamePlayer.calcRealX();
		let y = $gamePlayer.calcRealY();
		let index = $gamePlayer.direction - 2;
		this.imageBlt($charaSrc, index, x,y,2,1);
		index += $gamePlayer.isWalking() ? 16 : 8;
		this.imageBlt($charaSrc, index, x,y+8,2,1);
	};
}

class Scene_Battle extends Scene_Base{
	start(arg){
		super.start();
		this.commandIndex = 0;
		this.playerTargetIndex = 0;
		this.textForWindow = [];
		this.messageCnt = 0;
		this.troop = arg.map(function(id){
			return new Game_Battler(id);
		}, this);
		this.playBGM("mao8bit28");
		this.stuckMessage(
			[$dataVocab.message[0].replace("%1", this.troop[0].name())]
		);
	}

	refreshScene(){
		this.screenClear();
		this.drawTextWindow();
		this.drawParams();
		this.drawEnemies();
	}

	drawEnemies(){
		let x = (GRAPHICS_WIDTH - (this.troop.length * 64) >> 1) + 12;
		let y = 104;
		this.troop.forEach(function(battler){
			if (!battler.isFainted()){
				this.imageBlt($enmSrc, 5 * (battler.getId()-1), x, y, 5, 4);
			}
			x += 64;
		}, this);
	}

	drawTextWindow(){
		let x = 0;
		let y = 152;
		const width  = GRAPHICS_WIDTH;
		const height = 32;
		if (this.textForWindow[0]){
			this.drawWindow(x,y,width,height);
			this.drawText(this.textForWindow[0][0],x+8,y+8);
		}else{
			this.fillRect(x,y,width,height)
		}
	}

	drawParams(){
		let x = 0;
		let y = GRAPHICS_HEIGHT - 56;
		this.drawWindow(x,y,256,56);
		x += 8;
		y += 8;
		this.drawText($gamePlayer.name(),x,y);
		this.drawParam(x,y+=8, 1, $gamePlayer.hp);
		this.drawParam(x,y+=8, 2, $gamePlayer.maxAtk());
		this.drawParam(x,y+=8, 3, $gamePlayer.maxDef());
		this.drawParam(x,y+=8, 4, $gamePlayer.maxSpd());
		let i = 0;
		x += 128;
		y -= 32;
		$dataVocab.battle.forEach(function(com){
			if (i++ == this.commandIndex){
				this.drawText(">",x-16,y);
			}
			this.drawText(com,x,y);
			y += 16;
		}, this);
		this.drawText();
	}

	drawParam(x, y, pId, value){
		this.drawText($dataVocab.param[pId],x,y);
		x = x + 64 - (String(value).length << 3);
		this.drawText(value,x,y);
	}

	update(){
		this.updateMessage();
		super.update();
	}

	stuckMessage(text){
		this.messageCnt = 10;
		this.textForWindow.push(text);
		this.refreshScene();
	}

	isInputtable(){
		return this.messageCnt == 0;
	}

	updateMessage(){
		if (this.messageCnt > 0){
			this.messageCnt--;
		}
		if (this.messageCnt == 0){
			if (this.textForWindow.length){
				const com = this.textForWindow[0][1];
				com && com.call(this);
				this.textForWindow.shift();
				if (this.textForWindow.length){
					this.messageCnt = 10;
					this.refreshScene();
				}
			}
		};
	}

	updateInput(){
		if (this.isInputtable()){
			if (Input.isTriggered("ok")){
				this.onCommandOk();
				return;
			}
			let needRefresh = false;
			if (Input.isTriggered("up")){
				this.commandIndex = (this.commandIndex-1+3) % 3;
				needRefresh = true;
			}
			if (Input.isTriggered("down")){
				this.commandIndex = (this.commandIndex+1) % 3;
				needRefresh = true;
			}
			if (needRefresh){
				this.playCursor();
				this.drawParams();
			}
		}
	}

	processAttack(a, b){
		if (
			!a || a.isFainted() || !b || b.isFainted()
		){ return; };
		let damage = Math.max(0,
			a.maxAtk() * 2 - b.maxDef() * (b == $gamePlayer && this.commandIndex == 1 ? 2 : 1)
		);
		damage *= Math.random() / 2 + 1;
		damage = Math.floor(damage);
		this.stuckMessage(
			[$dataVocab.message[3].replace("%1", a.name()), function(){
				this.playCancel();
				b.changeHP(damage);
				this.refreshScene();
			}]
		);
		this.stuckMessage(
			[$dataVocab.message[1].replace("%1", b.name()).replace("%2", damage), null]
		);
	}

	turnStart(){
		this.stuckMessage([$dataVocab.message[10], function(){
			if ($gamePlayer.isFainted()){
				this.stuckMessage([$dataVocab.message[11],function(){
					this.stopBGM();
					this.changeScene(Scene_Title);
				}])
			}else if (this.troop.every(battler => battler.isFainted())){
				if ($gamePlayer.level >= 100){
					this.stuckMessage([$dataVocab.message[12].replace("$1", $gamePlayer.name()),
					function(){
						this.stopBGM();
						$gamePlayer.level = 0;
						this.changeScene(Scene_Map);
					}])
				}else{
					this.stuckMessage([$dataVocab.message[12].replace("$1", $gamePlayer.name()),
					function(){
						this.stopBGM();
						$gamePlayer.level++;
						this.changeScene(Scene_Map);
					}])
				}
			}
		}]);
	}

	onCommandOk(){
		switch (this.commandIndex){
			case 0:
				this.playOk();
				this.troop.forEach(function(en){ this.processAttack(en, $gamePlayer) }, this);
				this.processAttack($gamePlayer, this.troop.find(function(en){
					return !en.isFainted();
				}, this));
				this.turnStart();
				break;
			case 1:
				this.playOk();
				this.stuckMessage([$dataVocab.message[4].replace("%1", $gamePlayer.name())]);
				this.troop.forEach(function(en){ this.processAttack(en, $gamePlayer) }, this);
				this.turnStart();
				break;
			case 2:
				this.playSE("maoRetro28");
				this.stuckMessage([$dataVocab.message[8].replace("%1", $gamePlayer.name()), null]);
				if (Math.random() < 0.7){
					this.stuckMessage(["", this.changeScene.bind(this, Scene_Map)]);
				}else{
					this.stuckMessage([$dataVocab.message[9], this.turnStart.bind(this)]);
				}
				break;
		}
	}
}
