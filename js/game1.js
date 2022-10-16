let gameStartDiv = document.getElementById('game_start');
let gameTotalScr = document.getElementById('game_total_scr');
let gameScore = document.getElementById('game_score');
let gameScrElements = gameTotalScr.children;

function line_game(canvas, scr_count, Idx) {
    
    
    
    

    if(canvas.getContext) {
        
        var ctx = canvas.getContext('2d');

        setInterval(() => {
            
            setWidth = gameScrElements[Idx].offsetWidth;
            setHeight = gameScrElements[Idx].offsetHeight;
            canvas.width = setWidth;
            canvas.height = setHeight;
            canvas.style.width = String(setWidth) + "px";
            canvas.style.height = String(setHeight) + "px";
            
            
            ctx.beginPath();
            ctx.rect(100, 100, 100, 100);
            ctx.fillStyle = "#000000";
            ctx.fill();
            ctx.closePath();

        }, 10);
        
    }
}
