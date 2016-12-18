var app = angular.module("TTTApp", []);
app.controller("TTTController", function($scope){
    var userOccurs = [];
    var AIOccurs = [];
    $scope.result = 0;
    $scope.winner = "";
    $scope.chooseIcon = function(iconChoosed){
        $scope.userIcon = iconChoosed;
    }
    $('.reset-game').click(function(){
        window.location.reload();
    });
    $('.single-unit').click(function(){
        if(legalPosition($(this))){
            $(this).addClass($scope.userIcon === 'X' ? 'iconX' : 'iconO');
            for(var i = 0 ; i < 9 ; i++){
                if($($('.single-unit')[i]).is($(this))){
                    console.log("i is:"+i);
                    break;
                }
            }
            userOccurs.push(i);
            calResult();
            //work by AI
            if($scope.result === 0){
                AISetIcon();
                calResult();
            }
        }
    });    
    function legalPosition($position){
        return ($position.attr("class") === "single-unit") && !$position.hasClass('iconX') && !$position.hasClass('iconO')
    }
    function AISetIcon(){
        var i = parseInt(9 * Math.random());
        while(!legalPosition($($('.single-unit')[i]))){
            i = parseInt(9 * Math.random());
        }
        $($('.single-unit')[i]).addClass($scope.userIcon === "X" ? "iconO" : "iconX");
        AIOccurs.push(i);
    }
    function calResult(){
        userOccurs.sort();
        AIOccurs.sort();
        if(userOccurs.length + AIOccurs.length === 9){
            console.log("TIE");
            $scope.winner = "TIE";
            $scope.result = 1;
        }
        if(winGame(userOccurs)){
            console.log("U Win, Game Over");
            $scope.winner = "YOU WIN";
            $scope.result = 2;
            console.log($scope.result);
        }else if(winGame(AIOccurs)){
            console.log("U loose");
            $scope.winner = "YOU LOOSE";
            $scope.result = 3;
        }
        
        $scope.$apply();
    }

    function winGame(arr){
        for(var i = 0 ; i < arr.length ; i++){
            for(var j = i + 1; j < arr.length ; j++){
                for(var k = j + 1; k < arr.length ; k++){
                    if((arr[i] + 3 === arr[j] && arr[j] + 3 === arr[k])||
                    ((arr[i] + 1 === arr[j] && arr[i] + 2 === arr[k] && Math.floor(arr[i] / 3) === Math.floor(arr[j] / 3) && Math.floor(arr[i] / 3) === Math.floor(arr[k] / 3))||
                    (arr[i] + 4 === arr[j] && arr[j] + 4 === arr[k])||
                    ((arr[i] + 2 === arr[j] && arr[j] + 2 === arr[k] && Math.floor(arr[k] / 3) - 1 === Math.floor(arr[j] / 3) && Math.floor(arr[j] / 3) - 1 == Math.floor(arr[i] / 3) / 3)))){
                        return true;
                    }
                }
            }
        }
        return false;
    }
});