(function(){
	// ローカルストレージへのアクセス
	const lsKey = "com";
	function getLocalStorage(){
		let ls;
		try{
			ls = window.localStorage.getItem(lsKey);
			ls = JSON.parse(ls);
			if (!Array.isArray(ls)) throw 'error';
		}catch(e){
			writeOnLocalStorage(
				ls=[
					[new Date("2021/6/2 12:01:58"), "サイト開いただけでスクリプトが実行できるようにしようずｗ<br>FLAG();を呼び出せたらクリアねｗ", "Thanos"],
					[new Date("2021/6/2 12:03:33"), "以下好きなラーメンの具",//"うっせえ氏ね",
					"■ハムスター"],
				]
			);
		}
		return ls;
	}

	function writeOnLocalStorage(contents){
		try{
			window.localStorage.setItem(lsKey, JSON.stringify(contents));
		}catch(e){
			alertDisabledStorage();
		}
	}

	function resetLocalStorage(){
		try{
			window.localStorage.removeItem(lsKey);
		}catch(e){
			alertDisabledStorage();
		}
	}

	function alertDisabledStorage(){
		const localstorageBan = document.getElementById("localstorageBan");
		if (localstorageBan){
			localstorageBan.innerText = "この演習を行うにはブラウザのlocalStorageをONにする必要があります。";
		}
	}

	// ページ描画処理
	window.onload = function(){
		setButtons();
		createAnchors();
	}

	function setButtons(){
		const submit = document.getElementById("submit");
		submit.onclick = addCommentConfirm;

		const reset = document.getElementById("reset");
		reset.onclick = function (){
			resetLocalStorage();
			createAnchors();
		};

		const hints = document.getElementById("hints");
		if (hints){ hints.onclick = addHint; }
	}

	function callRemoveComment(id){
		let result;
		result = window.confirm("コメント"+(id+1)+"番を削除しますか？");
		if (result){
			removeComment(id);
		}
	}

	function removeComment(id){
		let data = getLocalStorage();
		data.splice(id,1);
		writeOnLocalStorage(data);
		createAnchors();
	}

	function addCommentConfirm(){
		const textArea = document.getElementById("upload");
		let text = textArea.value;
		if (text){
			const name = document.getElementById('userName').value;
			addComment(text, name);
			textArea.value = "";
		}
	}

	function addComment(text, name){
		const data = getLocalStorage();
		data.push([new Date(), text, name]);
		if (data.length >= 1000) data.shift();
		writeOnLocalStorage(data);
		createAnchors(true);
	}

	function sprintfN(n,d){
		if (!d) { d = 2; };
		return ('0'.repeat(d)+n).slice(-d);
	}

	function createAnchors(check){
		const data = getLocalStorage();
		const frag = document.createDocumentFragment();
		data.forEach(function(datum, n){
			const div = document.createElement('div');
			let pTag = document.createElement("p");
			pTag.innerHTML = (n+1) + ": <span></span> " + formatDate(datum[0]) + " ID:sLearning.net ";
			pTag.getElementsByTagName("span")[0].innerText = datum[2] || "名無しさん";

			const aTag = document.createElement('a');
			aTag.innerText = "×";
			aTag.href = "#"+n;
			aTag.onclick = callRemoveComment.bind(this, n);
			pTag.appendChild(aTag);
			div.appendChild(pTag);

			pTag = document.createElement("p");
			pTag.innerHTML = datum[1].replace("\n", "<br>");
			for (let i = 0; i < pTag.children.length; i++){
				const child = pTag.children[i];
				if (child && child.onerror){
					if (check && n + 1 == data.length){
						child.onerror = FLAG.bind(this);
					}else{
						child.onerror = null;
					}
				}
			}
			div.appendChild(pTag)
			frag.appendChild(div);
		});
		const anchors = document.getElementById("comments");
		anchors.innerHTML = "";
		anchors.appendChild(frag);

		const title = document.getElementsByTagName("h1")[0];
		title.innerText = `${title.getAttribute("name")}(${data.length})`;
		document.title = title.innerText;
	}

	function formatDate(dateStr){
		const date = new Date(dateStr);
		let str = "";
		str += date.getFullYear() + "/";
		str += sprintfN(date.getMonth()) + "/";
		str += sprintfN(date.getDate());
		str += "("+"日月火水木金土"[date.getDay()]+") ";
		str += sprintfN(date.getHours())    + ":";
		str += sprintfN(date.getMinutes())  + ":";
		str += sprintfN(date.getSeconds())  + ".";
		str += sprintfN(date.getTime());
		return str;
	}


let hintCnt = 0;
const hintList = [
	"HTML使えんじゃんｗ<br>scriptタグは使えないみたいだけど",
	"onclick onhoverじゃ表示されたときっていうのはダメか…<br>となるとあとはonerrorぐらいか？",
	"onerrorってimgタグで画像読み込み失敗したときに出てくるやつか",
];
function addHint(){
	addComment(hintList[hintCnt], "ヒント"+(++hintCnt));
	if (hintCnt == hintList.length) hintCnt = 0;
}

function FLAG(){
	PointManager.requestClearFlag(7);
}
})();
