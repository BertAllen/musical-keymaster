
// var app = angular.module('login', [
//     'firebase'
// ]);

app.constant('FBREF', 'https://realstackunderflow.firebaseio.com/')

app.controller('AuthController', function ($scope, FBREF, $firebaseArray) {
    var ac = this;
    var db = new Firebase(FBREF);
    $scope.member;
    // social button login
    $scope.socialAuth = function (type) {
        db.authWithOAuthPopup(type, function (err, authData) {
            if (err) {
                console.log(err);
                return;
            }
            var userToSave = {
                username: authData[type].displayName,
                reputation: 0,
                created: Date.now()
            }     
            $scope.$apply(function () {
                $scope.member = userToSave;
            })
            db.child('users').child(authData.uid).update(userToSave)
        })
    }
    
    
    
    function handleDBResponse(err, authData) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(authData);
        var userToSave = {
            username: ac.user.email,
            reputation: 0,
            created: Date.now()
        }
        $scope.$apply(function () {
            $scope.member = userToSave;
        })
        //THis LINE SAVES THE USER INFO INTO THE FIREBASE DB
        db.child('users').child(authData.uid).update(userToSave);
    }


    $scope.register = function () {
        db.createUser(ac.user, handleDBResponse);
    }

    $scope.login = function () {
        alert('You\'re logged in');
        console.log(ac.user)

        db.authWithPassword(ac.user, handleDBResponse)
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