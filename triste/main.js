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
		function whenClear(){
			const button1 = document.getElementById("swich1");
   			const button2 = document.getElementById("swich2");
    			const button3 = document.getElementById("swich3");
        		const button4 = document.getElementById("swich4");
			button1.disabled = true;
			button2.disabled = true;
			button3.disabled = true;
			button4.disabled = true;
			//FLAG8取得
			PointManager.requestClearFlag(8);
			//ブラウザの×ボタンやページ移動ボタンを押しても警告画面が出ないようにする
			window.onbeforeunload = null;
		 }
	};

	//演習中にブラウザの×ボタンやページ移動ボタンを押した際に警告画面を出す
	window.onbeforeunload = function(e) {
  		e.preventDefault();
  		return '';
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
