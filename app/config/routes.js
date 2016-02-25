app.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/oldsplash');
    
    $stateProvider.state('home', {
        url: '/home',
        // template: '<h1> Hi <h1>',
       templateUrl: 'app/components/home/home.html',
        controller: 'HomeController',
        controllerAs: 'hc'
    })
    
   .state('oldsplash',{
       url: '/splash',
       templateUrl: 'repoChance/oldsplash.html',
       controller: "AuthController",
       controllerAs: 'ac'
   })
})