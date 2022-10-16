let gameStartDiv = document.getElementById('game_start');
let gameTotalScr = document.getElementById('game_total_scr');
let gameScore = document.getElementById('game_score');
let gameScrElements = gameTotalScr.children;

let line_color_code = ["#DAD9FF", "#E8D9FF", "#E8D9FF", "#DAD9FF"]

function line_game_bg_set(canvas, ctx, Idx) {
    ctx.beginPath();
    ctx.fillStyle = line_color_code[Idx % line_color_code.length];
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();
}

function line_game_action(ctx, scr_count, Idx) {
    ctx.beginPath();
    ctx.rect(100, 100, 100, 100);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();
}

function line_game(canvas, ctx, scr_count, Idx) {
    line_game_bg_set(canvas, ctx, Idx);
}
