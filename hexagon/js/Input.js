class Input{
    static KEY_LIST = ["ok", "cancel", "down", "left", "right", "up"];
    static init(){
        this.codeLogger = {};
        this.KEY_LIST.forEach(function(code) {
            this.codeLogger[code] = 0;
        }, this);
        window.onkeydown = function(ev){
            const code = this.parseCode(ev.code);
            if (code){
                this.codeLogger[code] = this.codeLogger[code] == 0 ? 1 : 2;
                ev.preventDefault();
                return false;
            }
        }.bind(this);
        window.onkeyup = function(ev){
            const code = this.parseCode(ev.code);
            if (code){
                this.codeLogger[code] = 0;
                ev.preventDefault();
                return false;
            }
        }.bind(this);
    }

    static setButton(tdr, code){
        tdr.onmousedown = tdr.ontouchstart = function(ev){
            this.codeLogger[code] = this.codeLogger[code] == 0 ? 1 : 2;
        }.bind(this);
        tdr.onmouseup = tdr.onmouseleave = tdr.ontouchend = function(ev){
            this.codeLogger[code] = 0;
        }.bind(this);
    }

    static parseCode(code){
        switch (code){
            case "Enter":
            case "Space":
            case "KeyZ":
                return this.KEY_LIST[0];
            case "Backspace":
            case "Escape":
            case "KeyX":
                return this.KEY_LIST[1];

            case "ArrowDown":
            case "Numpad2":
                return this.KEY_LIST[2];
            case "ArrowLeft":
            case "Numpad4":
                return this.KEY_LIST[3];
            case "ArrowRight":
            case "Numpad6":
                return this.KEY_LIST[4];
            case "ArrowUp":
            case "Numpad8":
                return this.KEY_LIST[5];
            default:
                return null;
        }
    }

    static isTriggered(code) {
        if (this.codeLogger[code] == 1){
            this.codeLogger[code] = 2;
            return true;
        }
        return false;
    }
    static isPressed(code) {
        return this.codeLogger[code] >= 1;
    }

    static update(){
    }
}
