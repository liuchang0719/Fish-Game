var can1;
var can2;

var ctx1;
var ctx2;

var canWidth;
var canHeight;

var lastTime;//上一帧执行时间
var deltaTime;//两帧之间的时间间隔

var bgPic = new Image();

var ane;
var fruit;
var mom;
var baby;

var mx;
var my;

var babyTail = [];
var babyEye = [];
var babyBody = [];

var momTail = [];
var momEye = [];
var momBodyOrange = [];
var momBodyBlue = [];

var data;
var wave;
var halo;
var dust;
var dustPic = [];

var start = false;
var startControl = document.getElementById("start");
var reset = document.getElementById("restart");
var firstPic = document.getElementById("first-pic");

startControl.addEventListener('click', startClick, false);
reset.addEventListener('click', startClick, false);


function startClick(){
    start = true;
    firstPic.style.display = "none";
    game();
}


function game() {

    if(start){
        init();
        lastTime = Date.now();
        deltaTime = 0;
        gameLoop();
    }
}

function init() {
    //get canvas context
    can1 = document.getElementById("canvas1");
    ctx1 = can1.getContext('2d');
    can2 = document.getElementById("canvas2");
    ctx2 = can2.getContext('2d');

    can1.addEventListener('mousemove', onMouseMove, false);
    ctx1.font = "20px Verdana";
    ctx1.textAlign = "center";//left center right, left default

    bgPic.src = "src/background.jpg";

    canWidth = can1.width;
    canHeight = can1.height;

    ane = new aneObj();
    ane.init();

    fruit = new fruitObj();
    fruit.init();

    mom = new momObj();
    mom.init();
    baby = new babyObj();
    baby.init();

    mx = canWidth * 0.5;
    my = canHeight * 0.5;

    for(var i = 0; i < 8; i++){
        babyTail[i] = new Image();
        babyTail[i].src = "./src/babyTail" + i + ".png";
    }

    for(var i = 0; i < 2; i++){
        babyEye[i] = new Image();
        babyEye[i].src = "./src/babyEye" + i + ".png";
    }
    for(var i = 0; i < 20; i++){
        babyBody[i] = new Image();
        babyBody[i].src = "./src/babyFade" + i + ".png";
    }

    for(var i = 0; i < 8; i++){
        momTail[i] = new Image();
        momTail[i].src = "./src/bigTail" + i + ".png";
    }
    for(var i = 0; i < 2; i++){
        momEye[i] = new Image();
        momEye[i].src = "./src/bigEye" + i + ".png";
    }
    for(var i = 0; i < 8; i++){
        momBodyOrange[i] = new Image();
        momBodyBlue[i] = new Image();
        momBodyOrange[i].src = "./src/bigSwim" + i + ".png";
        momBodyBlue[i].src = "./src/bigSwimBlue" + i + ".png";
    }

    data = new dataObj();
    wave = new waveObj();
    wave.init();
    halo = new haloObj();
    halo.init();

    for(var i = 0; i < 7; i++){
        dustPic[i] = new Image();
        dustPic[i].src = "./src/dust" + i + ".png";
    }

    dust = new dustObj();
    dust.init();
}


function gameLoop() {
    window.requestAnimationFrame(gameLoop);

    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
    if(deltaTime > 40){
        deltaTime = 40;
    }

    background();
    ane.draw();
    fruitMonitor();
    fruit.draw();

    ctx1.clearRect(0, 0, canWidth, canHeight);
    mom.draw();
    momFruitsCollision();
    baby.draw();
    momBabyCollision();

    data.draw();
    wave.draw();
    halo.draw();
    dust.draw();

}

//获取鼠标位置
function onMouseMove(e){
    if(!data.gameOver){
        if(e.offsetX || e.layerX){
            mx = e.offsetX == undefined ? e.layerX : e.offsetX;
            my = e.offsetY == undefined ? e.layerY : e.offsetY;

        }
    }
}

function background(){
    ctx2.drawImage(bgPic, 0, 0, canWidth, canHeight);
}


