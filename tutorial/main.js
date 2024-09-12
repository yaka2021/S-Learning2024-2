(function () {
    // 初期状態
    window.onload = function () {
      // ポップの設定
      setPop(strFuwaPop[0]);
      setInterval(updatePop, 60);
    };
  
    let fuwaPopCnt = 0;
    let fuwaPopText = "";
    const button = document.getElementById("gameClear");
    function setPop(text) {
      if (text != fuwaPopText) {
        fuwaPopCnt = 0;
        fuwaPopText = text;
        const popText = document.getElementById("popText");
        popText.innerText = "";
      }
    }
  
    function updatePop() {
      if (fuwaPopCnt < fuwaPopText.length) {
        const char = fuwaPopText[fuwaPopCnt++];
        const popText = document.getElementById("popText");
        let element;
        if (char == "\n") {
          element = document.createElement("br");
        } else {
          element = document.createElement("div");
          element.innerText = char;
          element.className = "popChar";
        }
        popText.append(element);
      }
    }
  
    document.getElementById("gameClear").onclick = function gameClear() {
      button.disabled = true;
      setPop(strFuwaPop[1]);
      PointManager.requestClearFlag(11);
    };
  
    const strFuwaPop = [
      "S-Learning2024へようこそ！\n画面上部に表示されているスライドを最後まで読んで、その内容が理解ができたら\n画面右部の「スライドの内容を理解しました」ボタンをクリックしましょう！",
      "You got the flag! ゲームクリアです！\n画面下部の「トップページに戻る」ボタンからトップページに戻って\nさっそくCTF演習LEVEL1にチャレンジしてみましょう！",
    ];
  })();
  