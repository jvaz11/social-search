angular.module("myApp", ['ui.router', 'angularMoment', 'angular-clipboard'])

.config(function($stateProvider, $urlRouterProvider) {
        //
        // For any unmatched url, redirect to /mainsearch
        $urlRouterProvider.otherwise("/mainsearch");
        //
        // Now set up the states
        $stateProvider
            .state('mainsearch', {
                url: "/mainsearch",
                templateUrl: "partials/mainsearch.html",
                controller: 'MainCtrl'
            });
        // .state('mainsearch.list', {
        //     url: "/list",
        //     templateUrl: "partials/mainsearch.list.html",
        //     controller: function($scope) {
        //         $scope.items = ["A", "List", "Of", "Items"];
        //     }
        // })
        // .state('state2', {
        //     url: "/state2",
        //     templateUrl: "partials/state2.html"
        // })
        // .state('state2.list', {
        //     url: "/list",
        //     templateUrl: "partials/state2.list.html",
        //     controller: function($scope) {
        //         $scope.things = ["A", "Set", "Of", "Things"];
        //     }
        // });
    })
    .controller('MainCtrl', function($scope, $http, twitterFactory) {
        $scope.status;
        $scope.fetchingResults = false;
        $scope.query = {};
        $scope.query.prefix = '#';
        $scope.tweets;

        $scope.setPrefix = function(p) {
            $scope.query.prefix = p;
            console.log(p);
        };

        $scope.searchPosts = function(query, prefix) {
            $scope.fetchingResults = true;
            getTweets(query, prefix);

        };

        function getTweets(query, prefix) {

            twitterFactory.getTweets(query, prefix)
                .success(function(tweets) {
                    $scope.tweets = tweets;
                    $scope.fetchingResults = false;
                })
                .error(function(error) {
                    $scope.status = 'Unable to load tweets: ' + error.message;
                });
        };

        $scope.textToCopy = 'I can copy by clicking!';

        $scope.success = function () {
            console.log('Copied!');
        };

        $scope.fail = function (err) {
            console.error('Error!', err);
        };
        
    })

.factory('twitterFactory', ['$http', function($http) {

    var urlBase = '/api/tweetsearch';
    var twitterFactory = {
        getTweets: function(query, prefix) {
            if (prefix === '@') {
                console.log('its a tag');
                            return $http.get(urlBase + '/byhandle/' + query);
            }
            return $http.get(urlBase + '/byhashtag/' + query);
        }
    };

    return twitterFactory;
}]);;
