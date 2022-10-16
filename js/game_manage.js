function canvas_init_setting(canvas, Idx) {

    setWidth = gameScrElements[Idx].offsetWidth;
    setHeight = gameScrElements[Idx].offsetHeight;
    canvas.width = setWidth;
    canvas.height = setHeight;
    canvas.style.width = String(setWidth) + "px";
    canvas.style.height = String(setHeight) + "px";

}

function gameStart(num) {
    screenSetting(num);
    for(var i = 0 ; i < num ; i++) {
        setTimeout((Idx) => {
            manage_game(gameScrElements[Idx].children[0], num, Idx);
        }, 4500, i);
    }
}

function manage_game(canvas, scr_count, Idx) {
    if(canvas.getContext) {
        var ctx = canvas.getContext('2d');
        setInterval((canvas, scr_count, Idx, ctx) => {
            canvas_init_setting(canvas, Idx);
            /*
            -------------- 랜덤 게임 추가 예정 --------------
            */
            line_game(canvas, ctx, scr_count, Idx);
        }, 10, canvas, scr_count, Idx, ctx);
    }
}