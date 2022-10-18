class Note {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.isLive = true;
    }
    note_down(velocity) {
        this.y += velocity;
    }
    is_touched_line(lineY, range, height) {
        var Diff = Math.abs(this.y - lineY) * height;

        return Diff <= range && this.isLive;
    }
    is_note_out() {

        return this.y > 1;
    }
    returnColor() {
        if(this.isLive) {
            return "#FFFFFF";
        }
        else {
            return "#F15F5F";
        }
    }
}

class TouchLine {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.pressed = false;
    }
    returnLineColor() {
        if(this.pressed) {
            return "#555555";
        }
        else {
            return "#AAAAAA";
        }
    }
    returnBGColor() {
        if(this.pressed) {
            return "#B3AEFF";
        }
        else {
            return "#C5C0FF";
        }
    }
}

let gameStartDiv = document.getElementById('game_start');
let gameTotalScr = document.getElementById('game_total_scr');
let gameScore = document.getElementById('game_score');
let gameScrElements = gameTotalScr.children;

// rhythm_game_variables

let touchLineList;
let note_cycle;
let note_list;
var noteSize;
var note_curTime;
var note_cooldown;
var ranTime;
let cor_color;
let incor_color;
let cor_diff;
let incor_diff;
let rhythm_color_code;
let rhythm_base_bg_color;
let cor_incor_count;
let rhythm_game_score;

function rhythm_game_init() {
    noteSize = 40;
    note_cycle = [0, 0, 0, 0];
    note_list = [[], [], [], []];
    note_curTime = [0, 0, 0, 0];
    note_cooldown = [0, 0, 0, 0];
    ranTime = [50, 100];
    touchLineList = [new TouchLine(0.5, 0.8), new TouchLine(0.5, 0.8), new TouchLine(0.5, 0.8), new TouchLine(0.5, 0.8)];
    rhythm_base_bg_color = [218,217,255];
    rhythm_color_code = [[...rhythm_base_bg_color], [...rhythm_base_bg_color], [...rhythm_base_bg_color], [...rhythm_base_bg_color]];
    cor_color = [206,242,121];
    incor_color = [255, 167, 167];
    cor_diff = [0, 0, 0];
    incor_diff = [0, 0, 0];
    for(var i = 0 ; i < 3 ; i++) {
        cor_diff[i] = (rhythm_base_bg_color[i] - cor_color[i]) / 10;
        incor_diff[i] = (rhythm_base_bg_color[i] - incor_color[i]) / 10;
    }
    cor_incor_count = [0, 0, 0, 0];
    cor_incor_state = ["", "", "", ""];
    rhythm_game_score = 0;
}

function rhythm_game_control(e, isDown) {
    
    
    var idx = scrKeyCode.indexOf(e.key);
    if (idx == -1) return;
    

    if(isDown) {
        if(touchLineList[idx].pressed) return;
        touchLineList[idx].pressed = true;
        for(var i = 0 ; i < note_list[idx].length ; i++) {
            if(note_list[idx][i].is_touched_line(touchLineList[idx].y, noteSize, gameScrElements[idx].children[0].height)) {
                note_list[idx].splice(i, 1);
                cor_incor_state[idx] = "correct";
                cor_incor_count[idx] = -1;
                rhythm_game_score_change(100);
                break;
            }
            else if(note_list[idx][i].is_touched_line(touchLineList[idx].y - (noteSize * 1.5 / gameScrElements[idx].children[0].height), noteSize * 0.5, gameScrElements[idx].children[0].height)) {
                note_list[idx][i].isLive = false;
            }
        }
        
    }
    else {
        touchLineList[idx].pressed = false;
    }
}

function rhythm_game_obj_gen(canvas, Idx) {

    // note gen //
    
    note_curTime[Idx]++;
    if(note_curTime[Idx] >= note_cooldown[Idx]) {
        setTimeout(() => {
            note_list[Idx].push(new Note(0.5, 0));
        }, note_cooldown);
        note_curTime[Idx] = 0;
        note_cooldown[Idx] = ranTime[Math.floor(Math.random() * ranTime.length)];
    }

}

function rhythm_game_bg_set(canvas, ctx, Idx) {
    
    var colorCode = "rgb(";
    colorCode += String(rhythm_color_code[Idx][0]);
    colorCode += ",";
    colorCode += String(rhythm_color_code[Idx][1]);
    colorCode += ",";
    colorCode += String(rhythm_color_code[Idx][2]);
    colorCode += ")";

    ctx.fillStyle = colorCode;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function rhythm_game_obj_draw(canvas, ctx, Idx) {

    // lineBG draw //
    ctx.beginPath();
    ctx.fillStyle = touchLineList[Idx].returnBGColor();
    ctx.fillRect(touchLineList[Idx].x * canvas.width - noteSize, 0, noteSize * 2, canvas.height);
    ctx.closePath();

    // line draw //
    ctx.beginPath();
    ctx.strokeStyle = "#00000000";
    ctx.arc(touchLineList[Idx].x * canvas.width, touchLineList[Idx].y * canvas.height, noteSize, 0, 2 * Math.PI);
    ctx.fillStyle = "#000000";
    ctx.stroke();
    ctx.fillStyle = touchLineList[Idx].returnLineColor();
    ctx.fill();
    
    ctx.closePath();

    // note draw //
    for(var i = 0 ; i < note_list[Idx].length ; i++) {
        
        ctx.beginPath();
        ctx.strokeStyle = "#00000000";
        ctx.fillStyle = note_list[Idx][i].returnColor();
        ctx.arc(note_list[Idx][i].x * canvas.width, note_list[Idx][i].y * canvas.height, noteSize, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
}

function rhythm_game_score_change(value) {
    rhythm_game_score += value;
    gameScore.innerText = rhythm_game_score;
}

function rhythm_game_update(canvas, Idx, velocity) {

    const note_cooldown = 1;
    const cor_incor_cooldown = 2;

    if(note_cycle[Idx] % note_cooldown == 0) {
        
        for(var i = 0 ; i < note_list[Idx].length ; i++) {
            
            note_list[Idx][i].note_down(velocity);
            
        }

        if(note_list[Idx].length && note_list[Idx][0].is_note_out()) {
            note_list[Idx].shift();
            cor_incor_state[Idx] = "incorrect";
            cor_incor_count[Idx] = 1;
        }
    }
    if(note_cycle[Idx] % cor_incor_cooldown == 0) {
        if(cor_incor_count[Idx] <= 10 && cor_incor_count[Idx] >= -10) {
            if(cor_incor_state[Idx] == "correct") {
                // correct
                if(cor_incor_count[Idx] <= 0) {
                    rhythm_color_code[Idx] = [...cor_color];
                    cor_incor_count[Idx] = 0;
                }
                else {
                    for(var i = 0 ; i < 3 ; i++) {
                        rhythm_color_code[Idx][i] += cor_diff[i];
                    }
                }
                cor_incor_count[Idx]++;
            }
            else if(cor_incor_state[Idx] == "incorrect"){
                //incorrect
                if(cor_incor_count[Idx] >= 0) {
                    rhythm_color_code[Idx] = [...incor_color];
                    cor_incor_count[Idx] = 0;
                }
                else {
                    for(var i = 0 ; i < 3 ; i++) {
                        rhythm_color_code[Idx][i] += incor_diff[i];
                    }
                }
                cor_incor_count[Idx]--;
            }
            else {
                rhythm_color_code[Idx] = [...rhythm_base_bg_color];
            }
        }
    }
}

function rhythm_game_over(canvas, ctx, Idx) {
    isGameScrActive[Idx] = false;
    note_cycle = [0, 0, 0, 0];
    note_list = [[], [], [], []];
}

function rhythm_game(canvas, ctx, scr_count, Idx) {
    note_cycle[Idx] += 1;
    if (note_cycle[Idx] > 99) {
        note_cycle[Idx] = 0;
    }

    rhythm_game_bg_set(canvas, ctx, Idx);
    rhythm_game_obj_gen(canvas, Idx);
    rhythm_game_update(canvas, Idx, 0.005);
    rhythm_game_obj_draw(canvas, ctx, Idx);

    
}
