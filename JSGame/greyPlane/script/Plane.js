function Plane(descripType, gameController){
    this.gameController = gameController;
    this.descripType = descripType;    
    this.running = false;
    this.animationID = -1;  
    
    this.element = document.createElement("img");
    this.element.className = this.gameController.planeClassName;
    this.element.src = "pic/" + descripType + ".png";
    this.element.width = this.gameController.bodySize.width / this.gameController.planeWidthParam;    
    this.element.style.top = 0;
    this.element.style.left = Math.random() * Math.floor(parseInt(this.gameController.bodySize.width, 10) * (1 - 1.0 / this.gameController.planeWidthParam));
    this.element.style.zIndex = descripType == "grey" ? "70" : "1"; 

    var that = this;
    this.element.onclick = function(){
        if(that.descripType === "grey"){
            ++that.gameController.gameScore;                      
            if(that.gameController.gameScore % that.gameController.LevelUpInterval === 0){
                ++that.gameController.gameLevel;
                that.gameController.LevelUpInterval += that.gameController.gameLevel * 10;
            }
            that.gameController.bombControl.currentTime = 0;
            that.gameController.bombControl.play();
            that.gameController.scoreRecorder.innerHTML = "score:" + that.gameController.gameScore;
            that.gameController.levelRecorder.innerHTML = "level:" + that.gameController.gameLevel;
            that.stopfly();
        }
        else if(that.descripType == "pill"){
            that.gameController.bombControl.currentTime = 0;
            that.gameController.bombControl.play();
            if(parseInt(that.gameController.currentBloods, 10) < 3){
                ++that.gameController.currentBloods;
                that.gameController.bloodArr[that.gameController.currentBloods].src = "pic/blood.png";
            }
            that.stopfly();
        }
        else{   
            that.gameController.errorControl.currentTime = 0;
            that.gameController.errorControl.play();
            if(that.gameController.currentBloods == 0){
            (new GameDialog(that.gameController.gameScore)).show();
            that.gameController.stopGame(that.gameController.intervalId);
            }else{
                that.gameController.bloodArr[that.gameController.currentBloods].src = "pic/blooded.png";
                --that.gameController.currentBloods;
            }
        }
    };    
    return this;
}
Plane.prototype = {
    construcor: Plane,
    fly: function(){
        var updateSpeed = 1;
        this.running = true;
        this.element.style.display = "inline";     

        var that = this;
        var updatePosition = function(){
            var currentHeight = parseInt(that.element.style.top, 10);
            if(currentHeight < that.gameController.bodySize.height){ 
                that.element.style.top = (currentHeight + that.gameController.gameLevel) + "px";  
            }else{             
                that.stopfly();
                if(that.descripType == "grey"){ 
                    if(that.gameController.currentBloods == 0){
                        (new GameDialog(that.gameController.gameScore)).show();
                        that.gameController.stopGame(that.gameController.intervalId);
                    }
                    else{
                        that.gameController.bloodArr[that.gameController.currentBloods].src = "pic/blooded.png";
                        --that.gameController.currentBloods;
                    }
                }
            }   
        };        
        this.animationID = setInterval(updatePosition,updateSpeed);
    },
    stopfly: function(){
        clearInterval(this.animationID);
        this.running = false;
        this.element.style.top = 0;
        this.element.style.display = "none";
    }    
}