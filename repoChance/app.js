
// var app = angular.module('login', [
//     'firebase'
// ]);

app.constant('FBREF', 'https://resplendent-torch-2208.firebaseio.com/')

app.controller('AuthController', function($rootScope, $scope, FBREF, $firebaseArray, $firebaseObject, SweetAlert) {
//original firebase auth-setup stuff --v
    var ac = this;
    var db = new Firebase(FBREF);
    var authed = db.getAuth();
    if (authed) {
        $rootScope.member = $firebaseObject(new Firebase(FBREF + 'users/' + authed.uid));
    }
//new stuff added to create a public folder on firebase --v
    // debugger; $scope.public = $firebaseObject(new Firebase(FBREF + 'users/Public' + authed.uid)); //flawed code    
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
                $rootScope.member.reputation = userToSave.reputation;
                $rootScope.member.created = userToSave.created;
                $rootScope.member.$save();
            }
        });
    }
    $rootScope.logOut = function() {
        //debugger;
        $rootScope.member = {};
    }

    $scope.register = function() {
        db.createUser(ac.user, handleDBResponse);
    }

    $scope.login = function() {
        alert('You\'re logged in');
        console.log(ac.user)

        db.authWithPassword(ac.user, handleDBResponse)
    }

    $scope.share = function() {
        debugger;
        $scope.public = {};
        $scope.public.songs = $rootScope.member.mySongs[$rootScope.CANSAVE];
        // var pubref = ref.child("users/Public");
        var pubref = new Firebase("https://resplendent-torch-2208.firebaseio.com/users/Public");
        pubref.push($scope.public.songs);
        // $scope.public.$add();
        alert("Thank you for sharing this song with the Musical-Keymaster community.")
    }

    $scope.save = function() {
        //        if ($rootScope.member.mySongs.title) {
        if (!$rootScope.CANSAVE) {
            alert('Before saving, please make sure your song has a title and you press the convert button with a slider setting of zero.')
            return;
        } else {
            $rootScope.member.$save();
        }
    }

    $scope.killSong = function() {
        SweetAlert.swal({
            title: "Are you sure?",
            text: "Your will not be able to recover this song if you continue!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, trash it!",
            closeOnConfirm: false}, 
            function(isConfirm) {
                if (!isConfirm) {
                    return;
                }
               SweetAlert.swal(">crumple, crumple — toss< ... It's gone!!");
               delete $rootScope.member.mySongs[$rootScope.CANSAVE];
               $rootScope.member.$save();
                $rootScope.clrAftrDel();
        });        
    }    

});