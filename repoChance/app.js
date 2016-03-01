// app.js
// angular.module('login', ['auth0', 'angular-storage', 'angular-jwt'])
// .config(function (authProvider) {
//   authProvider.init({
//     domain: 'keymaster.auth0.com',
//     clientID: 'RqkkaDYUm5BB9qfWe5rLAQDIbOcbX4dX'
//   });
// })
// .run(function(auth) {
//   // This hooks al auth events to check everything as soon as the app starts
//   auth.hookEvents();
// });

// // app.js
// myApp.config(function (authProvider, $routeProvider, $httpProvider, jwtInterceptorProvider) {
//   // ...

//   // We're annotating this function so that the `store` is injected correctly when this file is minified
//   jwtInterceptorProvider.tokenGetter = ['store', function(store) {
//     // Return the saved token
//     return store.get('token');
//   }];

//   $httpProvider.interceptors.push('jwtInterceptor');
//   // ...
// });
// angular.module('myApp', ['auth0', 'angular-storage', 'angular-jwt'])
// .run(function($rootScope, auth, store, jwtHelper, $location) {
//   // This events gets triggered on refresh or URL change
//   $rootScope.$on('$locationChangeStart', function() {
//     var token = store.get('token');
//     if (token) {
//       if (!jwtHelper.isTokenExpired(token)) {
//         if (!auth.isAuthenticated) {
//           auth.authenticate(store.get('profile'), token);
//         }
//       } else {
//         // Either show the login page or use the refresh token to get a new idToken
//         $location.path('/');
//       }
//     }
//   });
// });












var app = angular.module('login', [
    'firebase'
]);

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


})