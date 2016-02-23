app.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider.state('home', {
        url: '/home',
        // template: '<h1> Hi <h1>',
       templateUrl: 'app/components/home/home.html',
        controller: 'HomeController',
        controllerAs: 'hc'
    })
    
   .state('splash',{
       url: '/splash',
       templateUrl: 'repoChance/splash.html',
       controller: "AuthController",
       controllerAs: 'ac'
   })
})