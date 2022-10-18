var isGameScrActive = [false, false, false, false];
var scrKeyCode = ['a', 's', ';', '\''];
const game_list = ['rhythm'];

function canvas_init_setting(canvas, Idx) {

    setWidth = gameScrElements[Idx].offsetWidth;
    setHeight = gameScrElements[Idx].offsetHeight + 10;
    canvas.width = setWidth;
    canvas.height = setHeight;
    canvas.style.width = String(setWidth) + "px";
    canvas.style.height = String(setHeight + 10) + "px";

}

function gameStart(num) {
    screenSetting(num);

    /*
            -------------- 랜덤 게임 추가 예정 --------------
    */
    var selectGame = game_list[0];
    

    // rhythm game //
    if (selectGame == game_list[0]) {
        
        rhythm_game_init();

        window.addEventListener("keydown", (e) => {

            rhythm_game_control(e, true);
        });
        window.addEventListener("keyup", (e) => {

            rhythm_game_control(e, false);
        });
    }

    for(var i = 0 ; i < num ; i++) {
        setTimeout((Idx) => {

            manage_game(gameScrElements[Idx].children[0], num, Idx, selectGame);
        }, 4500, i);
    }
    
}

function manage_game(canvas, scr_count, Idx, gameName) {
    if(canvas.getContext) {
        var ctx = canvas.getContext('2d');

        // rhythm game //
        if(gameName == game_list[0]) {
            setInterval((canvas, scr_count, Idx, ctx) => {
                canvas_init_setting(canvas, Idx);
                isGameScrActive[Idx] = true;
                
    
                rhythm_game(canvas, ctx, scr_count, Idx);
            }, 10, canvas, scr_count, Idx, ctx);
        }
        
    }
}