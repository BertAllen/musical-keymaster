app.controller('HomeController', function($rootScope, $scope, ConversionEngine) {
    $scope.accidental = "g";
    $scope.peekaboo = function() {
        if (!$scope.musicInput) {
            alert("Blank songs cannot be converted. Please input chord and lyric information before attempting to convert.");
            return;
         }
        var originalInput = $scope.musicInput;
        // splits original input into individual lines --v
        $scope.lineArr = $scope.musicInput.split(String.fromCharCode(10));

        for (var i = 0; i < $scope.lineArr.length; i++) {
            // debugger;
            // makes sure that the "isTab" flag is set to false before running the parser
            $scope.isTab = false;
            // $scope.lineArr[i].isTab = ConversionEngine.analyze($scope.lineArr[i]);
            $scope.isTab = ConversionEngine.analyze($scope.lineArr[i]);
            // v--- this line is for debugging and checking the parser
            // console.log($scope.lineArr[i], $scope.isTab);
            if ($scope.isTab) {
                $scope.lineArr[i] = ConversionEngine.convert($scope.lineArr[i], $scope.slider.value, $scope.accidental)
            }
        } //end lineArr for loop
//reassembles the individual lines back into one solid string --v
        $scope.musicInput = $scope.lineArr.join(String.fromCharCode(10));
//stuff to save the song info into firebase --v
        debugger;        
        $rootScope.member.mySongs = $rootScope.member.mySongs || {};
        $rootScope.CANSAVE = $scope.title;
        var newSong = {"originalInput": originalInput, musicInput: $scope.musicInput, title: $scope.title };
        $rootScope.member.mySongs[newSong.title] = newSong;

    }//end of peekaboo

    $scope.downAndDirty = function() {
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