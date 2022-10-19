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
            return "#44444444";
        }
        else {
            return "#44444488";
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
let rhythm_game_note_speed;
let rhythm_note_cooldown_rate;
let cor_incor_maxCount;

function rhythm_game_init() {
    noteSize = 40;
    note_cycle = [0, 0, 0, 0];
    note_list = [[], [], [], []];
    note_curTime = [1, 1, 1, 1];
    note_cooldown = [1, 1, 1, 1];
    ranTime = [50, 100];
    touchLineList = [new TouchLine(0.5, 0.8), new TouchLine(0.5, 0.8), new TouchLine(0.5, 0.8), new TouchLine(0.5, 0.8)];
    rhythm_base_bg_color = [218,217,255];
    rhythm_color_code = [[...rhythm_base_bg_color], [...rhythm_base_bg_color], [...rhythm_base_bg_color], [...rhythm_base_bg_color]];
    cor_color = [206,242,121];
    incor_color = [255, 167, 167];
    cor_diff = [0, 0, 0];
    incor_diff = [0, 0, 0];
    cor_incor_maxCount = 20;
    for(var i = 0 ; i < 3 ; i++) {
        cor_diff[i] = (rhythm_base_bg_color[i] - cor_color[i]) / cor_incor_maxCount;
        incor_diff[i] = (rhythm_base_bg_color[i] - incor_color[i]) / cor_incor_maxCount;
    }
    cor_incor_count = [0, 0, 0, 0];
    cor_incor_state = ["", "", "", ""];
    rhythm_game_score = 0;
    rhythm_game_note_speed = 0.008;
    rhythm_note_cooldown_rate = 1;
}

function rhythm_game_control(e, isDown) {

    var keyInput = e.key;
    if (keyInput >= 'A' && keyInput <= 'Z') {
        keyInput = String.fromCharCode(keyInput.codePointAt(0) + 32);
    }
    var idx = scrKeyCode.indexOf(keyInput);
    if (idx == -1) return;
    

    if(isDown) {
        if(touchLineList[idx].pressed) return;
        touchLineList[idx].pressed = true;
        for(var i = 0 ; i < note_list[idx].length ; i++) {
            if(note_list[idx][i].is_touched_line(touchLineList[idx].y, noteSize * 1.3, gameScrElements[idx].children[0].height)) {
                note_list[idx].splice(i, 1);
                cor_incor_state[idx] = "correct";
                cor_incor_count[idx] = -1;
                rhythm_game_score_change(100);
                break;
            }
            if(i == note_list[idx].length - 1) {
                cor_incor_state[idx] = "incorrect";
                cor_incor_count[idx] = 1;
            }
            /*else if(note_list[idx][i].is_touched_line(touchLineList[idx].y - (noteSize * 1.5 / gameScrElements[idx].children[0].height), noteSize * 0.5, gameScrElements[idx].children[0].height)) {
                note_list[idx][i].isLive = false;
            }
            */
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
        // if(Idx == 3) {
        //     console.log("-----");
        //     for(var i = 0 ; i < 4 ; i++) {
        //         console.log(i + " : " + note_curTime[i]);
        //     }
        //     console.log("-----");
        // }
        
        
        note_list[Idx].push(new Note(0.5, 0));
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
    ctx.arc(touchLineList[Idx].x * canvas.width, touchLineList[Idx].y * canvas.height + (noteSize * 0.65), noteSize, 0, Math.PI);
    ctx.arc(touchLineList[Idx].x * canvas.width, touchLineList[Idx].y * canvas.height - (noteSize * 0.65), noteSize, Math.PI, 2 * Math.PI);
    ctx.lineTo(touchLineList[Idx].x * canvas.width + noteSize, touchLineList[Idx].y * canvas.height + (noteSize * 0.65))
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

function rhythm_game_score_change(value, Idx) {
    rhythm_game_score += value;
    gameScore.innerText = rhythm_game_score;

    
    if(rhythm_game_score >= 10000) {
        rhythm_game_note_speed = 0.01;
        //rhythm_note_cooldown_rate = 0.8;
    }
}

function error_value_calculate(pass_error_val, canvas, scr_count) {
    var percentage;
    var count = 0;
    for(var k = 1 ; k < scr_count ; k++) {
        //var j = 0;
        for(var i = 0 ; i < note_list[k].length ; i++) {
            for(var j = 0; j < note_list[0].length ; j++) {
                percentage = Math.abs(note_list[k][i].y - note_list[0][j].y) / note_list[0][j].y * 100;
                
                if(percentage > 0.2 && percentage < pass_error_val) {
                    count++;
                    note_list[k][i].y = note_list[0][j].y;
                    //note_list[k][i].isLive = false;
                    break;
                }
            }
        }
    }
    console.log(count);
    
    
}

function rhythm_game_update(canvas, Idx, velocity, scr_count) {

    const note_cooldown = 1;
    const cor_incor_cooldown = 2;
    //const note_reset_cooldown = 1000;


    // if(Idx == 0 && note_cycle[Idx] % note_reset_cooldown == 0) {
    //     error_value_calculate(2, canvas, scr_count);
    // }

    if(note_cycle[Idx] % note_cooldown == 0) {
        j = 0;
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
        if(cor_incor_count[Idx] <= cor_incor_maxCount && cor_incor_count[Idx] >= (-1) * cor_incor_maxCount) {
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
    if (note_cycle[Idx] > 999) {
        note_cycle[Idx] = 0;
    }


    // if(note_list[Idx].length > 0) {
    //     console.log(note_list[Idx][0].y);
    // }
    // if(Idx == 3) {
    //     console.log("------");
    // }
    rhythm_game_bg_set(canvas, ctx, Idx);
    rhythm_game_obj_gen(canvas, Idx);
    rhythm_game_update(canvas, Idx, rhythm_game_note_speed, scr_count);
    rhythm_game_obj_draw(canvas, ctx, Idx);

    
}
