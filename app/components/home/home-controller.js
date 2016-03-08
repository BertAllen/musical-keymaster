app.controller('HomeController', function ($scope, ConversionEngine) {
    $scope.accidental = "g";
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
            // console.log($scope.lineArr[i], $scope.isTab);
            if($scope.isTab){
               $scope.lineArr[i] = ConversionEngine.convert($scope.lineArr[i], $scope.slider.value, $scope.accidental)
            }
        } //end lineArr for loop
        $scope.musicInput = $scope.lineArr.join(String.fromCharCode(10));
    }//end of peekaboo
    
    $scope.downAndDirty = function () {
        $scope.newTabLine = ConversionEngine.convert($scope.tabLine, $scope.slider.value, $scope.accidental);
        return $scope.newTabLine;
    }
    
    //code for fancy slider bar
    $scope.slider = { //requires angular-bootstrap to display tooltips
 value: 0,
 options: {
   floor: -11,
   ceil: 11,
   showTicksValues: true,
   ticksValuesTooltip: function(v) {
     return 'Tooltip for ' + v;
   }
 }
};

})