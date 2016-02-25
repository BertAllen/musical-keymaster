app.controller('HomeController', function($scope, ConversionEngine){
    
    // $scope.test = "<p>hello</p>"
    $scope.peekaboo = function(){
        $scope.lineArr = $scope.musicInput.split(String.fromCharCode(10));

        console.log($scope.musicInput);
        for(var i=0; i< $scope.lineArr.length; i++){
            console.log($scope.lineArr[i]);
            console.log("~~next line~~");
        }
    for(var i=0; i< $scope.musicInput.length; i++){
        console.log($scope.musicInput.charCodeAt(i))}
    }
    
    $scope.logout = function(){
        alert("logged out")
    }
})