(function(){
    // rename.php
    window.onload = function(){
        const submit = document.getElementById("submit");
        if (submit){
            const name = document.getElementById("name");
            name.value = unescapeHTML($currentName);
            name.onkeypress = function(e){
                const key = e.keyCode || e.charCode || 0;
                if (key == 13){ submit.click() }
            }

            const errorLog = document.getElementById("errorLog");
            submit.onclick = checkName.bind(this, submit, name, errorLog);
        }
    }

    const reClearName = /\"\s*or\s*\"{2}=\"/i;
    function checkName(sub, input_name, errorLog){
        if (input_name){
            const name = input_name.value;
            if (name == $currentName){
                errorLog.innerText = "名前に変更がありません！";
            }else{
                const length = [...name].length;
                if (0 < length && length <= 10){
                    if (reClearName.test(name)){
                        sub.disabled = true;
                        PointManager.requestClearFlag(8);
                        errorLog.innerText = "SQL Exception: Something went wrong...";
                    }else{
                        sub.disabled = true;
                        changeName(name, sub, errorLog);
                        errorLog.innerText = "";
                    }
                }else{
                    errorLog.innerText = "文字数を満たしていません！";
                }
            }
        }
    }

    function changeName(name, sub, errorLog){
        const xml = new XMLHttpRequest();
        xml.open("POST", "./_background/nameChange.php", true);
        xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xml.onreadystatechange = function(){
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200){
				if (/\!DONE\!$/i.test(this.responseText)){
                    location.href = "/2022";
				}else{
                    sub.disabled = false;
                    errorLog.innerText = "データベースの登録処理に失敗しました……";
				}
            }
        }
        xml.send("NAME=" + encodeURIComponent(name));
    }


function unescapeHTML(escapedHtml) {
	const doc = new DOMParser().parseFromString(escapedHtml, 'text/html');
	return doc.documentElement.textContent;
}

})();
