var isGameScrActive = [false, false, false, false];
var scrKeyCode = ['a', 's', ';', '\''];
const game_list = ['rhythm'];

function canvas_init_setting(canvas, Idx) {

    setWidth = gameScrElements[Idx].offsetWidth + 10;
    setHeight = gameScrElements[Idx].offsetHeight + 10;
    canvas.width = setWidth;
    canvas.height = setHeight;
    canvas.style.width = String(setWidth + 10) + "px";
    canvas.style.height = String(setHeight + 10) + "px";

}

function gameStart(num) {
    for(var i = 0 ; i < num ; i++) {
        isGameScrActive[i] = true;
        screenSetting(i);
    }

    /*
            -------------- 랜덤 게임 추가 예정 --------------
    */
    var selectGame = game_list[0];
    

    // rhythm game //
    if (selectGame == game_list[0]) {
        
        rhythm_game_init(num);

        window.addEventListener("keydown", (e) => {

            rhythm_game_control(e, true);
        });
        window.addEventListener("keyup", (e) => {

            rhythm_game_control(e, false);
        });
    }
    var canvas = [];
    for(var i = 0 ; i < num ; i++) {
        canvas.push(gameScrElements[i].children[0]);
    }
    setTimeout((canvas, num, selectGame) => {
        manage_game(canvas, num, selectGame);
    }, 4500, canvas, num, selectGame);
    
}

function manage_game(canvas, scr_count, gameName) {
    
    var ctx = [];
    for(var Idx = 0 ; Idx < scr_count ; Idx++) {
        if(canvas[Idx].getContext) {
            ctx.push(canvas[Idx].getContext('2d'));
        }
        else {
            return;
        }
    }

    // rhythm game //
    if(gameName == game_list[0]) {
        
        
        setInterval((canvas, scr_count, ctx) => {
            
            for(var Idx = 0 ; Idx < scr_count ; Idx++) {    
                canvas_init_setting(canvas[Idx], Idx);
            }
                
            for(var Idx = 0 ; Idx < scr_count ; Idx++) {    
                rhythm_game(canvas[Idx], ctx[Idx], scr_count, Idx);
            }
            
        }, 10, canvas, scr_count, ctx);
    }
}