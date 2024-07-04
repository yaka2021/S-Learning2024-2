(function(){
	let f = function (){
		InputManager.init();
		InputManager.KEY_LIST.forEach(key => {
			const tdr = document.getElementById(key + '-button');
			if (tdr) InputManager.setButton(tdr, key);
		});
		AudioManager.createStaticAudio();
		if (BasePazzle.pazzleImage.width > 1){
			start();
		}else{
			BasePazzle.pazzleImage.onload = function(){
				start();
				BasePazzle.pazzleImage.onload = null;
			}.bind(this);
		}

		function start(){
			StageManager.whenClear = whenClear.bind(StageManager);
			GraphicManager.generatePixiScreen();
		}
		function whenClear(){ PointManager.requestClearFlag(9); }
	};

	window.onload = function(){
		Promise.all([
			fetch("./js/_Managers.js"),
			fetch("./js/_Objects.js"),
			fetch("./js/_StageManager.js"),
			fetch("./js/_Scenes.js")
		]).then(res => Promise.all(res.map(re => re.text()))
		).then(scripts => {
			eval(scripts.join(";\n\n") + "(" + f.toString() + ")()");
			f = null;
		});
	}
})();
