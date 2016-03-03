app.controller('HomeController', function ($scope, ConversionEngine) {
    
    $scope.peekaboo = function () {
        $scope.lineArr = $scope.musicInput.split(String.fromCharCode(10));

        /*
                console.log($scope.musicInput);
                for(var i=0; i< $scope.lineArr.length; i++){
                    console.log($scope.lineArr[i]);
                    console.log("~~next line~~");
                }
                
            for(var i=0; i< $scope.musicInput.length; i++){
                console.log($scope.musicInput.charCodeAt(i))}
            }
          */
        for (var i = 0; i < $scope.lineArr.length; i++) {
            $scope.isTab = false;
            // $scope.lineArr[i].isTab = ConversionEngine.analyze($scope.lineArr[i]);
                        $scope.isTab = ConversionEngine.analyze($scope.lineArr[i]);
                        // v--- this line is for debugging and checking the parser
            console.log($scope.lineArr[i], $scope.isTab);
            if($scope.isTab){
                ConversionEngine.convert($scope.lineArr[i], $scope.slider, $scope.accidental)
            }
        } //end lineArr for loop
    }

})