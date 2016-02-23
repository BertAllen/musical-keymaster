
// var app = angular.module('login', [
//     'firebase'
// ]);

app.constant('FBREF', 'https://stackunderflow.firebaseio.com/')

app.controller('AuthController', function ($scope, FBREF, $firebaseArray) {
    var ac = this;
    var db = new Firebase(FBREF);
    
    $scope.userData = $firebaseArray(db);
    $scope.member;
    // facebook login
    $scope.facebookLogin = function () {
        db.authWithOAuthPopup('facebook', function (err, authData) {
            if (err) {
                console.log(err);
                return;
            }
            var userToSave = {
                username: authData.facebook.displayName,
                reputation: 0,
                created: Date.now()
            }
            $scope.$apply(function () {
                $scope.member = userToSave;
            })

            var cutOffFacebookIndex = authData.uid.indexOf(':') + 1;
            db.child('users').child(authData.uid.slice(cutOffFacebookIndex)).update(userToSave)
        })
    }
    
    
    // Twitter login
    $scope.twitterLogin = function () {
        db.authWithOAuthPopup('twitter', function (err, authData) {
            if (err) {
                console.log(err);
                return;
            }
            var userToSave = {
                username: authData.twitter.displayName,
                reputation: 0,
                created: Date.now()
            }
            $scope.$apply(function () {
                $scope.member = userToSave;
            })

            var cutOffTwitterIndex = authData.uid.indexOf(':') + 1;
            db.child('users').child(authData.uid.slice(cutOffTwitterIndex)).update(userToSave)
        })
    }
    
    // Google login
    $scope.googleLogin = function () {
        db.authWithOAuthPopup('facebook', function (err, authData) {
            if (err) {
                console.log(err);
                return;
            }
            var userToSave = {
                username: authData.google.displayName,
                reputation: 0,
                created: Date.now()
            }
            $scope.$apply(function () {
                $scope.member = userToSave;
            })

            var cutOffGoogleIndex = authData.uid.indexOf(':') + 1;
            db.child('users').child(authData.uid.slice(cutOffGoogleIndex)).update(userToSave)
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
// firebase upload may need to look like this ......................
// $scope.addMessage = function() {
//     $scope.messages.$add({
//       text: $scope.newMessageText
//     });
//   };


    $scope.register = function () {
        db.createUser(ac.user, handleDBResponse);
    }

    $scope.login = function () {
        alert('You\'re logged in');
        console.log(ac.user)

        db.authWithPassword(ac.user, handleDBResponse)
    }


})