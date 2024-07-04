// JS Obfuscator Toolを使って難読化
(function(){
    let loaded = false, stuck = {};
    function fetchFile(name, url){
        const xml = new XMLHttpRequest();
        xml.open("POST", url);
        xml.onload = function(){
            stuck[name] = this.responseText;
            if (Object.keys(stuck).length >= 2){
                eval.call(window, stuck["pm"] + ";\n\n\n" + stuck["main"]);
                if (window.onload){
                    if (loaded){
                        window.onload.call(window);
                        preparePractice();
                    }else{
                        const old = window.onload;
                        window.onload = function(){
                            if (old) old.call(window);
                            preparePractice();
                        }
                    }
                }else{
                    preparePractice();
                }
            }
        }
        xml.send();
    }

    window.onload = function(){
        loaded = true;
    };
    fetchFile("pm", "/2022/_src/pointManager.js");
    fetchFile("main", "./main.js");

    function preparePractice(){
        window.onload = function(){};
        document.body.appendChild(makeAudioTag('audioGet', "maodama_magical21.mp3"));
        document.body.appendChild(makeAudioTag('audioAlready', "maodama_magical27.mp3"));
    }
    function makeAudioTag(id, name){
        const audio = document.createElement('audio');
        audio.id = id;
        audio.src = "/2022/_audio/" + name;
        audio.hidden = true;
        audio.loop = false;
        audio.volume = 0.3;
        audio.load();
        return audio;
    }
})();
