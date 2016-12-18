var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $interval){
    $scope.inProcess = false;
    $scope.currentPriod = "Session";
    $scope.breakPeriod = 5;
    $scope.sessionPeriod = 25;
    $scope.remainTime = {'min': 25, 'sec': '00'};
    var pomoTimer;
    var needReset = true;
    
    $scope.changeBreakPeriod = function(target){
        if($scope.inProcess === false){
            if(target.srcElement.className === "add"){
                $scope.breakPeriod++;
            }else if(target.srcElement.className === "sub" && $scope.breakPeriod != 1){
                $scope.breakPeriod--;
            }
        }
    };
    
    $scope.changeSessionPeriod = function(target){
        if($scope.inProcess === false){
            if(target.srcElement.className === "add"){
                $scope.sessionPeriod++;
                $scope.remainTime.min++;
            }else if(target.srcElement.className === "sub" && $scope.sessionPeriod != 1){
                $scope.sessionPeriod--;
                $scope.remainTime.min--;
            }
        }
    };

    $scope.resetPomodoro = function(){
        $scope.breakPeriod = 5;
        $scope.sessionPeriod = 25;
        $scope.remainTime = {'min': 25, 'sec': '00'};
    }
    
    $scope.timerBegin = function(){
        if($scope.inProcess === false){
            //set timer
            $scope.inProcess = true;            
            pomoTimer = $interval(updateTimer, 1000);
        }else{
            //stop timer
            $scope.inProcess = false;
            $interval.cancel(pomoTimer);
        }
    };    
    
    function updateTimer(){
        //reset value
        if(needReset === true){
            $scope.remainTime.sec = '00';
            if($scope.currentPriod === "Session"){
                $scope.remainTime.min = $scope.sessionPeriod;   
            }else{
                $scope.remainTime.min = $scope.breakPeriod;                
            }
            needReset = false;
        }
        //update value
        if($scope.remainTime.sec == "00"){
            //all to zero, change period status
            if($scope.remainTime.min === 0){
                if($scope.currentPriod === "Session"){
                    $scope.currentPriod = "Break"
                }else{                
                    $scope.currentPriod === "Session"
                }
                needReset = true;
            }else{
                $scope.remainTime.min--;
                $scope.remainTime.sec = "59";
            }
        }else{
            $scope.remainTime.sec = (parseInt($scope.remainTime.sec) - 1);
            if($scope.remainTime.sec < 10)
                $scope.remainTime.sec = '0' + $scope.remainTime.sec;
        }
    }
});
