
var score = 0, life = 3;
var ghost=false, ghost2= false, ghost3=false, ghost4=false, countblink=30;
var pacalive = true; countdeath=30000;
var dots = [];
    
var player = {
    x:280,
    y:400,
    pacmouth:160,
    pacdir:0,
    pacsize:32,
    speed:5
}
var enemy = {
    x:150,
    y:200,
    dirx: 0,
    diry: 0,
    esize:32,
    speed:2,
    points: 50,
    moving: 0,
    flash: 0,
    name: "enemy 1"
}
var enemy2 = {
    x:150,
    y:200,
    dirx: 0,
    diry: 0,
    esize:32,
    speed:3,
    points: 100,
    moving: 0,
    flash: 0,
    name: "enemy 2"
}
var enemy3 = {
    x:150,
    y:200,
    dirx: 0,
    diry: 0,
    esize:32,
    speed:4,
    points: 150,
    moving: 0,
    flash: 0,
    name: "enemy 3"
}
var enemy4 = {
    x:150,
    y:200,
    dirx: 0,
    diry: 0,
    esize:32,
    speed:5,
    points: 200,
    moving: 0,
    flash: 0,
    name: "joe"
}
var powerdot = {
    x:10,
    y:10,
    powerup: false,
    pcountdown: 0,
    ghostNum: 0,
    ghostNum2: 0,
    ghostNum3: 0,
    ghostNum4: 0,
    ghosteat:false
}
var dot ={
    x:80,
    y:50,
    eaten: false
}

var keyclick = {};
var canvas = document.createElement('canvas');
var ctx = canvas.getContext("2d");

canvas.height = 550;
canvas.width = 600;
mainImage = new Image();
mainImage.ready = false;
mainImage.onload = checkReady;
mainImage.src = "pac-sheet.png";

document.addEventListener("keydown",function(event){
    keyclick[event.keyCode]=true;
    move(keyclick);
},false);
document.addEventListener("keyup",function(event){
    delete keyclick[event.keyCode];
},false);

//moving player 
function move(keyclick){
    //going right 
    if(37 in keyclick){
        player.x -= player.speed;
        player.pacdir = 64; 
    }
    //going up 
    if(38 in keyclick){
        player.y -= player.speed;
        player.pacdir = 96;
    }
    //going left
    if(39 in keyclick){
        player.x += player.speed;
        player.pacdir = 0;
    }
    //going down
    if(40 in keyclick){
        player.y += player.speed;
        player.pacdir = 32;
    }
    //cross screen 
    if(player.x >= (canvas.width - player.pacsize)){
        player.x = 0;
    }
    if(player.y >= (canvas.height - player.pacsize)){
        player.y = 0;
    }
    if(player.x < 0){
        player.x = (canvas.width - player.pacsize);
    }
    if(player.y < 0){
        player.y = (canvas.height - player.pacsize);
    }
    //mouth animation 
    if(player.pacmouth == 160){
        player.pacmouth = 192;
    }else{
        player.pacmouth = 160;
    }
    render();
}

function checkReady(){
    this.ready = true;
    playGame();
}

function playGame(){
    render();
    requestAnimationFrame(playGame);
}

//creates random value 
function myNum(n){
    return Math.floor(Math.random()*n);
}

//move ghosts function 
function moveGhost(enemy) {
       //enemy movement 
       if(enemy.moving<0){
        enemy.moving = (myNum(20)*3)+(myNum(1));
        enemy.speed = (myNum(2)+1);
        enemy.dirx = 0;
        enemy.diry = 0;
        if(powerdot.ghosteat){
            enemy.speed = enemy.speed * -1;
        }
        if (enemy.moving % 2){
            if(player.x < enemy.x){
                enemy.dirx = -enemy.speed;
            }else{
                enemy.dirx = +enemy.speed;
            }
        }else{
            if(player.y < enemy.y){
                enemy.diry = -enemy.speed;
            }else{
                enemy.diry = +enemy.speed;
            }
        }
    }
    //set enemy movement 
    enemy.moving--;
    enemy.x = enemy.x + enemy.dirx;
    enemy.y = enemy.y + enemy.diry;
    //enemy cross screen 
    if(enemy.x >= (canvas.width - enemy.esize)){
        enemy.x = 0;
    }
    if(enemy.y >= (canvas.height - enemy.esize)){
        enemy.y = 0;
    }
    if(enemy.x < 0){
        enemy.x = (canvas.width - enemy.esize);
    }
    if(enemy.y < 0){
        enemy.y = (canvas.height - enemy.esize);
    }
}
//check collisions function
function checkCollisionGhost(enemy) {
    //collision detection ghost
    if (player.x <= (enemy.x+26) && enemy.x <= (player.x+26) && player.y <= (enemy.y+26) && enemy.y <=(player.y+32)){
        if (powerdot.ghosteat) {
            score = score + enemy.points;
            console.log("you hit "+ enemy.name + " for " + score);
        }else{ 
            life--; 
            pacalive = false;    
            //pause ghosts, display death animation 
            while (countdeath > 0 ) {
                console.log ("this is hapenning");
                countdeath --;
            }     
        } 

        //reset positions for player and ghosts 
        player.x = 280; 
        player.y = 400; 
        enemy.x = 230; 
        enemy.y = 120; 
        enemy2.x = 400; 
        enemy2.y = 120; 
        enemy3.x = 130; 
        enemy3.y = 120; 
        enemy4.x = 180; 
        enemy4.y = 120; 
        pacalive = true; 
        countdeath=30000
        powerdot.pcountdown = 0;     
    }
} 
//collision detection powerdot
function checkCollisionPowerDot(powerdot) { 
    if (player.x <= powerdot.x && powerdot.x <= (player.x+32) && player.y <= powerdot.y && powerdot.y <=(player.y+32)){ 
        powerdot.powerup = false; 
        powerdot.pcountdown = 500; 
        powerdot.ghostNum = enemy.ghostNum; 
        powerdot.ghostNum2 = enemy2.ghostNum; 
        powerdot.ghostNum3 = enemy3.ghostNum; 
        powerdot.ghostNum4 = enemy4.ghostNum; 
        enemy.ghostNum = 384; 
        enemy2.ghostNum = 384; 
        enemy3.ghostNum = 384; 
        enemy4. ghostNum = 384; 
        powerdot.x = 0; 
        powerdot.y = 0; 
        powerdot.ghosteat = true; 
        player.speed = 10; 
    }
}

// WIP STILL NOT WORKING 
function checkCollisionDot(dot){
    //collision with upper dots
    if ((player.x) <= dot.x && dot.x <= (player.x+15) && (player.y) <= (dot.y) && (dot.y) <=(player.y+30) && !dot.eaten){
        dot.eaten = true;        
        score += 10;
    }   
}

//render energy power dot 
function renderPowerDot(powerdot) { 
    if (powerdot.powerup) { 
        ctx.fillStyle = "#ffffff"; 
        ctx.beginPath(); 
        ctx.arc(powerdot.x, powerdot.y , 7, 0, Math.PI * 2, true); 
        ctx.closePath(); 
        ctx.fill(); 
    }
}

function renderDot(dot) {
    if (!dot.eaten) {
        ctx.fillStyle = '#FFFF00';
        ctx.beginPath();
        ctx.arc(dot.x, dot.y , 4, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }
}

function createPowerDot(powerdot) {
    if (!powerdot.powerup  && powerdot.pcountdown < 5) {
        powerdot.x = myNum(420)+30;
        powerdot.y = myNum(250)+30;
        powerdot.powerup = true;
    }
}

function renderMap() {

    //upper dots
    //THIS should be a power dot
    renderDot(dots[0]);
    // ----------//
    dots[1].x = 130;
    renderDot(dots[1]);
    dots[2].x = 180;
    renderDot(dots[2]);
    dots[3].x = 230;
    renderDot(dots[3]);     
    dots[4].x = 280;
    renderDot(dots[4]);     
    dots[5].x = 330;
    renderDot(dots[5]);            
    dots[6].x = 380;
    renderDot(dots[6]);  
    dots[7].x = 430;
    renderDot(dots[7]);  
    dots[8].x = 480;
    renderDot(dots[8]);
    //THIS should be a power dot     
    dots[9].x = 530;
    renderDot(dots[9]); 
    // ----------//

    //bottom dots

    //THIS should be a power dot    
    dots[10].y = 500;        
    dots[10].x = 80;
    renderDot(dots[10]);
    // ----------//  
    dots[11].y = 500;        
    dots[11].x = 130;
    renderDot(dots[11]);
    dots[12].y = 500;                
    dots[12].x = 180;
    renderDot(dots[12]);
    dots[13].y = 500;                
    dots[13].x = 230;
    renderDot(dots[13]);  
    dots[14].y = 500;                   
    dots[14].x = 280;
    renderDot(dots[14]);
    dots[15].y = 500;                     
    dots[15].x = 330;
    renderDot(dots[15]);  
    dots[16].y = 500;                          
    dots[16].x = 380;
    renderDot(dots[16]);  
    dots[17].y = 500;                
    dots[17].x = 430;
    renderDot(dots[17]);
    dots[18].y = 500;                  
    dots[18].x = 480;
    renderDot(dots[18]); 
    //THIS should be a power dot        
    dots[19].y = 500;                
    dots[19].x = 530;
    renderDot(dots[19]);  
    //THIS should be a power dot    

    //left dots 
    dots[20].y = 100;                
    dots[20].x = 80;
    renderDot(dots[20]); 
    dots[21].y = 150;                
    dots[21].x = 80;
    renderDot(dots[21]); 
    dots[22].y = 200;                
    dots[22].x = 80;
    renderDot(dots[22]); 
    dots[23].y = 250;                
    dots[23].x = 80;
    renderDot(dots[23]); 
    dots[24].y = 300;                
    dots[24].x = 80;
    renderDot(dots[24]); 
    dots[25].y = 350;                
    dots[25].x = 80;
    renderDot(dots[25]); 
    dots[26].y = 400;                
    dots[26].x = 80;
    renderDot(dots[26]);
    dots[27].y = 450;                
    dots[27].x = 80;
    renderDot(dots[27]);  
    
    //right dots
    dots[28].y = 100;                
    dots[28].x = 530;
    renderDot(dots[28]); 
    dots[29].y = 150;                
    dots[29].x = 530;
    renderDot(dots[29]); 
    dots[30].y = 200;                
    dots[30].x = 530;
    renderDot(dots[30]); 
    dots[31].y = 250;                
    dots[31].x = 530;
    renderDot(dots[31]); 
    dots[32].y = 300;                
    dots[32].x = 530;
    renderDot(dots[32]); 
    dots[33].y = 350;                
    dots[33].x = 530;
    renderDot(dots[33]); 
    dots[34].y = 400;                
    dots[34].x = 530;
    renderDot(dots[34]);
    dots[35].y = 450;                
    dots[35].x = 530;
    renderDot(dots[35]);  
}

function render(){

    var dotindex = 0;
    
    if (life > 0) {
        ctx.fillStyle="#000000";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        createPowerDot(powerdot);
        //check if ghost 1 exist, if not create it
        if(!ghost){
            enemy.ghostNum = 64;
            enemy.x = 230;
            enemy.y = 120;
            ghost = true;
        }
        //check if ghost 2 exist, if not create it
        if(!ghost2){
            enemy2.ghostNum = 0;
            enemy2.x = 400;
            enemy2.y = 120;
            ghost2 = true;
        }
        //check if ghost 3 exist, if not create it
        if(!ghost3){
            enemy3.ghostNum = 96;
            enemy3.x = 130;
            enemy3.y = 120;
            ghost3 = true;
        }
        //check if ghost 4 exist, if not create it
        if(!ghost4){
            enemy4.ghostNum = 32;
            enemy4.x = 180;
            enemy4.y = 120;
            ghost4 = true;
        }

        //create dot object
        for (i = 0; i < 36; i++) {
            var copydot = Object.assign({}, dot);
            dots.push(copydot);
        
        }
        
        if (pacalive) {
            moveGhost(enemy);
            moveGhost(enemy2);
            moveGhost(enemy3);
            moveGhost(enemy4);
        }

        checkCollisionGhost(enemy);
        checkCollisionGhost(enemy2);
        checkCollisionGhost(enemy3);
        checkCollisionGhost(enemy4);
        checkCollisionPowerDot(powerdot);
        while (dotindex < 36) {
            checkCollisionDot(dots[dotindex]);  
            dotindex ++;
        }
                                                  
        //powerup countdown
        if (powerdot.ghosteat) {
            powerdot.pcountdown--;
            if (powerdot.pcountdown<=0) {
                player.speed = 6;
                powerdot.ghosteat = false;
                enemy.ghostNum = powerdot.ghostNum; 
                enemy2.ghostNum = powerdot.ghostNum2; 
                enemy3.ghostNum = powerdot.ghostNum3; 
                enemy4.ghostNum = powerdot.ghostNum4; 
            }
        }
       
        renderPowerDot(powerdot);
        
        //filling the map with dots   
        renderMap();
        
        //enemy blink animation 
        if (countblink>0) {
            countblink--;
        }else{
            countblink = 30;
            if(enemy.flash == 0){
                enemy.flash = 32;
                enemy2.flash = 32;
                enemy3.flash = 32;
                enemy4.flash = 32; 
            }else{
                enemy.flash = 0;
                enemy2.flash = 0;
                enemy3.flash = 0;
                enemy4.flash = 0;
            }
        }

        //render text
        ctx.font = "20px Verdana";
        ctx.fillStyle ="white";
        ctx.fillText("Score: "+score+" Life: "+life,2,18);
        //render sprites
        ctx.drawImage(mainImage,enemy.ghostNum,enemy.flash,32,32,enemy.x,enemy.y,enemy.esize,enemy.esize);    
        ctx.drawImage(mainImage,enemy2.ghostNum,enemy2.flash,32,32,enemy2.x,enemy2.y,enemy2.esize,enemy2.esize);                
        ctx.drawImage(mainImage,enemy3.ghostNum,enemy3.flash,32,32,enemy3.x,enemy3.y,enemy3.esize,enemy3.esize);        
        ctx.drawImage(mainImage,enemy4.ghostNum,enemy4.flash,32,32,enemy4.x,enemy4.y,enemy4.esize,enemy4.esize);            
        ctx.drawImage(mainImage,player.pacmouth,player.pacdir,32,32,player.x,player.y,player.pacsize,player.pacsize);
    }else{
        //Game over: clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle="#000000";    
        ctx.fillRect(0,0,canvas.width,canvas.height);    
        //render game over text
        ctx.font = "30px Verdana";
        ctx.fillStyle ="white";
        ctx.fillText("Game Over",(canvas.width/2.8),(canvas.height/2.5));
        //Retry option
        ctx.fillText("Retry?: Y/N",(canvas.width/2.8),(canvas.height/2));
            // if yes, reset game
            if (event.keyCode == 89) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                score = 0;
                life = 3;
                dot.eaten = false;
                dotindex = 0;
                while (dotindex < 36) {
                    dots[dotindex].eaten = false ;  
                    dotindex ++;
                }
                playGame();
            // if not end game and show score     
            }else if (event.keyCode == 78) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle="#000000";    
                ctx.fillRect(0,0,canvas.width,canvas.height);
                ctx.font = "30px Verdana";
                ctx.fillStyle ="white"
                ctx.fillText("OK Bye!",(canvas.width/2.8),(canvas.height/2.5));  
                ctx.fillText("Your score: " + score,((canvas.width/2)-120),(canvas.height/2));
            }
    }
}

document.body.appendChild(canvas);



