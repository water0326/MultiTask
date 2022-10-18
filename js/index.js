let indexDiv = document.getElementById('index');
let indexWebName = document.getElementById('index_web_name');
let indexButton = document.getElementsByClassName('index_button');
let indexWave = document.getElementById('index_wave');
let gameSelectDiv = document.getElementById('select_div');
let modSel = document.getElementsByClassName('select_mod');
let modbackBtn = document.getElementById('select_mod_back');
let aboutbackBtn = document.getElementById('about_back');
let aboutDiv = document.getElementById('about_game');
let aboutTexts = document.getElementById('about_content').children;
let updateDiv = document.getElementById('index_update_note');

    
// 1858 X 977

function indexButtonHover(num) {
    if(num == 0) {
        document.body.style.backgroundColor = "#B5B2FF";
    }
    else if(num == 1) {
        document.body.style.backgroundColor = "rgb(105, 223, 166)";
    }
    else if(num == 2) {
        document.body.style.backgroundColor = "rgb(223, 105, 105)";
    }
    else if(num == 3) {
        document.body.style.backgroundColor = "rgb(170, 105, 223)";
    }
}

function fadeOut(item, time) {
    setTimeout((item) => {
        item.style.opacity = 0;
        item.style.pointerEvents = "none";
    }, time, item);
}

function fadeIn(item, time, opacity) {
    setTimeout((item, opacity) => {
        item.style.opacity = opacity;
        item.style.pointerEvents = "auto";
    }, time, item, opacity);
}

function waterVisible(state) {
    if(state == true) {
        fadeIn(indexWave, 0, 1.0);
        indexWave.style.animation = "water_down 2s linear forwards";
        setTimeout(() => {
            indexWave.style.animation = "wave_rotate 10s linear infinite";
        }, 2000);
    }
    else {
        indexWave.style.animation = "water_up 4s cubic-bezier(0.1, -0.15, 0.3, 0.2)";
        fadeOut(indexWave, 1900);
    }
}

function indexButtonClick(num) {
    fadeOut(indexDiv, 0);
    waterVisible(false);
    if(num == 0) {
        fadeIn(gameSelectDiv, 1300, 1.0);
        for(var i = 0 ; i < modSel.length ; i++) {
            setTimeout((Idx) => {
                modSel[Idx].style.animation = "select_mod_fadeIn 1s cubic-bezier(0.4, 1.4, 0.6, 1.1) forwards";
            }, 1300 + i * 200, i);
        }
        setTimeout(() => {
            modbackBtn.style.animation = "back_fadeIn 1s cubic-bezier(0.4, 1.4, 0.6, 1.1) forwards";
        }, 2000 + i * 200);
        
    }
    else if(num == 1) {
        fadeIn(aboutDiv, 0, 1);
        for(var i = 0 ; i < aboutTexts.length ; i++) {
            setTimeout((Idx) => {
                aboutTexts[Idx].style.animation = "text_fadeIn 1.5s cubic-bezier(0.4, 1.2, 0.6, 1.1) forwards";
            }, 800 + 200 * i, i);
        }
        setTimeout(() => {
            aboutbackBtn.style.animation = "back_fadeIn 1s cubic-bezier(0.4, 1.4, 0.6, 1.1) forwards";
        }, 2500);
    }
}

function screenSetting(num) {
    for(var i = 0 ; i < gameScrElements.length ; i++) {
        if(i < num) {
            gameScrElements[i].style.width = "90%";
            setTimeout((Idx) => {
                gameScrElements[Idx].style.height = "calc(100% - 50px)";
                gameScrElements[Idx].style.margin = "50px 20px";
                //gameScrElements[Idx].style.opacity = "1";
            }, 1500 + i * 300, i);
        }
        else {
            gameScrElements[i].style.width = "0";
            gameScrElements[i].style.height = "0";
            gameScrElements[i].style.margin = "0";
            //gameScrElements[i].style.opacity = "0";
        }    
    }
}

function modSelect(num) {
    var isContinue = true;
    if(num == -1) {
        isContinue = false;
        num = 0;
    }
    for(var i = 0 ; i < modSel.length ; i++) {
        setTimeout((Idx) => {
            modSel[Idx].style.animation = "select_mod_fadeOut 1s cubic-bezier(0.4, 1.1, 0.6, 1.4) forwards";
        }, i * 200, (num + i + 1) % modSel.length);
    }
    modbackBtn.style.width = 0;
    modbackBtn.style.height = 0;
    setTimeout(() => {
        modbackBtn.style.animation = "back_fadeOut 1s cubic-bezier(0.4, 1.1, 0.6, 1.4) forwards";
    }, 200);
    fadeOut(gameSelectDiv, 1000);
    if(isContinue) {
        
    }
    else {
        waterVisible(true);
        fadeIn(indexDiv, 2000, 1.0);
    }
    if(num >= 2) {
        gameStart(num);
        fadeIn(gameStartDiv, 1000, 1);
    }
    
}	

function aboutEvent(num) {
    if(num == -1) {
        for(var i = 0 ; i < aboutTexts.length ; i++) {
            setTimeout((Idx) => {
                aboutTexts[Idx].style.animation = "text_fadeOut 1.5s cubic-bezier(0.4, -0.1, 0.6, -0.2) forwards";
            }, 200 * i, i);
        }
        setTimeout(() => {
            aboutbackBtn.style.animation = "back_fadeOut 1s cubic-bezier(0.4, 1.1, 0.6, 1.4) forwards";
        }, 0);
        fadeOut(aboutDiv, 1500);
        waterVisible(true);
        fadeIn(indexDiv, 2000, 1.0);
    }
}

