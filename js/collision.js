function momFruitsCollision(){
    if(!data.gameOver){
        for(var i = 0; i < fruit.num; i++){
            if(fruit.alive[i]){
                var l = caldistance(fruit.x[i], fruit.y[i], mom.x, mom.y);
                if(l < 900){
                    fruit.dead(i);
                    data.fruitNum++;
                    //blue fruit double score
                    mom.momBodyCount++;
                    if(mom.momBodyCount > 7){
                        mom.momBodyCount = 7;
                    }
                    if(fruit.fruitType[i] == "blue"){
                        data.double = 2;
                    }else{
                        data.double = 1;
                    }
                    wave.born(fruit.x[i], fruit.y[i]);
                }
            }
        }
    }
}

function momBabyCollision(){
    if(data.fruitNum > 0 && !data.gameOver){
        var l = caldistance(mom.x, mom.y, baby.x, baby.y);
        if(l < 900){
            //baby's color recover
            baby.babyBodyCount = 0;
            mom.momBodyCount = 0;
            //score update
            data.addScore();
            //draw halo
            halo.born(baby.x, baby.y);
        }
    }
}

function caldistance(x1, y1, x2, y2){
    return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
}