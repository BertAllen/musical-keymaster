
// var app = angular.module('login', [
//     'firebase'
// ]);

app.constant('FBREF', 'https://resplendent-torch-2208.firebaseio.com/')

app.controller('AuthController', function($rootScope, $scope, FBREF, $firebaseArray, $firebaseObject) {
    var ac = this;
    var db = new Firebase(FBREF);
    var authed = db.getAuth();
    if (authed) {
        $rootScope.member = $firebaseObject(new Firebase(FBREF + 'users/' + authed.uid));
    }
    //   $scope.member;
    // social button login
    $scope.socialAuth = function(type) {
        db.authWithOAuthPopup(type, function(err, authData) {
            if (err) {
                console.log(err);
                return;
            }
            var userToSave = {
                username: authData[type].displayName,
                reputation: 0,
                created: Date.now()
            }
            $firebaseObject(new Firebase(FBREF + 'users/' + authData.uid)).$loaded(function(user) {
                $rootScope.member = user;
                if (!user.username) {
                    debugger
                    $rootScope.member.username = userToSave.username;
                    $rootScope.member.reputation = userToSave.reputation;
                    $rootScope.member.created = userToSave.created;
                    $rootScope.member.$save();
                }
            });
            // db.child('users').child(authData.uid).update(userToSave)
        })
    }


    //receives info from the database-server and deals appropriately
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
        // $scope.$apply(function() {
        //     $rootScope.member = userToSave;
        // })
        //THis LINE SAVES THE USER INFO INTO THE FIREBASE DB
        $firebaseObject(new Firebase(FBREF + 'users/' + authData.uid)).$loaded(function(user) {
            $rootScope.member = user;
            if (!user.username) {
                $rootScope.member.username = userToSave.username;
                $rootScope.member.username = userToSave.reputation;
                $rootScope.member.username = userToSave.created;
                $rootScope.member.$save();
            }
        });
    }


    $scope.register = function() {
        db.createUser(ac.user, handleDBResponse);
    }

    $scope.login = function() {
        alert('You\'re logged in');
        console.log(ac.user)

        db.authWithPassword(ac.user, handleDBResponse)
    }

    $scope.save = function(musicInput) {
        $rootScope.member.$save();

        // var authData = db.getAuth();
        // if (authData) {
        //     db.child('users').child(authData.uid).update($rootScope.member);
        // }
    }

});