var app = angular.module("simonApp", []);
app.controller("simonController", ["$scope", "$timeout", function($scope, $timeout){
    $scope.points = "00";
    $scope.activeIndex = -1;
    $scope.isStrictMode = false;
    $scope.isActive = false;
    $scope.orderList = [];
    $scope.currentSelectedIndex = 0;
    playList();
    $scope.startGame = function(){
        if($scope.isActive){
            //init
            initGame();
            $scope.isActive = true;
            //create a random num
            createNumAndPlay();
        }
    }
    function initGame(){
        $scope.points = "00";
        $scope.activeIndex = -1;
        $scope.isStrictMode = false;
        $scope.isActive = false;
        $scope.orderList = [];
        $scope.currentSelectedIndex = 0;
    }
    function createNumAndPlay(){
        $timeout(function(){
            var i = Math.floor(Math.random() * 4);
            $scope.orderList.push(i);
            $scope.activeIndex = i;
            $('#area-' + (i + 1) + '-sound').trigger("play");
            $timeout(function(){
                $scope.activeIndex = -1;
            }, 1000);           
        }, 1000);
    }
    function playList(){
        var i = 0;
        playAll(i);
    }
    
    function playAll(i){
        $timeout(function(){
            if(i < $scope.orderList.length){
                $scope.activeIndex = $scope.orderList[i];
                $('#area-' + ($scope.activeIndex + 1) + '-sound').trigger("play");
                i++;
                $timeout(function(){
                    $scope.activeIndex = -1;
                }, 1000);
                playAll(i);
            }
        }, 2000);
    }
    $scope.selectArea = function(index){
        $('#area-' + (index + 1) + '-sound').trigger("play");
        $scope.activeIndex = index;
        $timeout(function(){
            $scope.activeIndex = -1;
            if(index !== $scope.orderList[$scope.currentSelectedIndex]){
                $scope.activeIndex = index;
                $timeout(function(){
                    $scope.activeIndex = -1;
                    $timeout(function(){
                        $scope.activeIndex = index;
                        $timeout(function(){
                            $scope.activeIndex = -1;                        
                        },100);
                    }, 100);
                }, 100);
                if($scope.isStrictMode){
                    initGame();
                }else{
                    $scope.currentSelectedIndex = 0;
                    playList();
                }
            }else{
                $scope.currentSelectedIndex++;
                if($scope.currentSelectedIndex === $scope.orderList.length){
                    $scope.addPoints();
                    if($scope.points === 12){
                        $scope.points = "Congratulation!!!"
                        $timeout(function(){
                            initGame();
                        }, 2000)
                        return;
                    }
                    $scope.currentSelectedIndex = 0;
                    createNumAndPlay();                
                }
            }
        }, 100);    
    }
    $scope.addPoints = function() {
        var i = parseInt($scope.points);
        if(i < 9)
            $scope.points = "0" + (++i);
        else if(i == 9)
            $scope.points = "10";
        else $scope.points = ++i;
    }
    
    $scope.toggleGameActive = function(){
        if($scope.isActive === true)
            $scope.isActive = false;
        else
            $scope.isActive = true;
    }
    
    $scope.toggleGameMode = function(){
        if($scope.isActive === true){
            if($scope.isStrictMode === true)
                $scope.isStrictMode = false;
            else
                $scope.isStrictMode = true;
        }
    }
}]);