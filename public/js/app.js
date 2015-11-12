angular.module("myApp", ['ui.router', 'angularMoment', 'angular-clipboard'])

.config(function($stateProvider, $urlRouterProvider) {
<<<<<<< HEAD
    $urlRouterProvider.otherwise("/mainsearch");

    $stateProvider
        .state('mainsearch', {
            url: "/mainsearch",
            templateUrl: "partials/mainsearch.html",
            controller: 'MainCtrl'
        });
})

.controller('MainCtrl', function($scope, $http, Twitter, Instagram, moment) {

    $scope.status;
    $scope.fetchingResults = false;
    $scope.query = {};
    $scope.query.prefix = '#';
    $scope.query.network = 'twitter';
    $scope.tweets;

    $scope.setPrefix = function(p) {
        $scope.query.prefix = p;
        console.log(p);
    };

    $scope.setNetwork = function(n) {
        $scope.query.network = n;
        console.log($scope.query);
    };

    $scope.searchPosts = function(query) {
        console.log('query', query);
        $scope.fetchingResults = true;
        if (query.network === 'twitter') {
            Twitter.getTweets(query.body, query.prefix)
=======
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
>>>>>>> 37fc8f5b50efb5c791699e639dd11a7d54bad89e
                .success(function(tweets) {
                    $scope.tweets = tweets;
                    $scope.fetchingResults = false;
                })
                .error(function(error) {
                    $scope.status = 'Unable to load tweets: ' + error.message;
                });
<<<<<<< HEAD
        } else {
            Instagram.getIgPosts(function(data) {

                $scope.igposts = data;
                console.log(data);
                $scope.fetchingResults = false;

            });
        }

    };

    function getTweets(query, prefix) {
        Twitter.getTweets(query, prefix)
            .success(function(tweets) {
                $scope.tweets = tweets;
                $scope.fetchingResults = false;
            })
            .error(function(error) {
                $scope.status = 'Unable to load tweets: ' + error.message;
            });
    };
=======
        };

        $scope.textToCopy = 'I can copy by clicking!';

        $scope.success = function () {
            console.log('Copied!');
        };

        $scope.fail = function (err) {
            console.error('Error!', err);
        };
        
    })
>>>>>>> 37fc8f5b50efb5c791699e639dd11a7d54bad89e

    $scope.success = function() {
        console.log('Copied!');
    };

    $scope.fail = function(err) {
        console.error('Error!', err);
    };

    // Create Tweet URL
    $scope.getTweetUrl = function(screenName, idStr) {
        return 'http://twitter.com/' + screenName + '/status/' + idStr;
    };

    // Moment time converters
    $scope.amCreatedAt = function(dateTime, network) {
        if (network === 'twitter') {
            return moment(dateTime).format('dddd, MMMM Do YYYY, h:mm:ss a');
        } else {
            return moment.unix(dateTime).format('dddd, MMMM Do YYYY, h:mm:ss a');
        }
    };
})

.factory('Twitter', ['$http', function($http) {

    var urlBase = '/api/tweetsearch';
<<<<<<< HEAD
    var Twitter = {
        getTweets: function(query, prefix) {
            if (prefix === '@') {
                return $http.get(urlBase + '/byhandle/' + query);
=======
    var twitterFactory = {
        getTweets: function(query, prefix) {
            if (prefix === '@') {
                console.log('its a tag');
                            return $http.get(urlBase + '/byhandle/' + query);
>>>>>>> 37fc8f5b50efb5c791699e639dd11a7d54bad89e
            }
            return $http.get(urlBase + '/byhashtag/' + query);
        }
    };

    return Twitter;
}])

.factory('Instagram', ['$http', function($http) {

    var Instagram = {
        getIgPosts: function(callback) {

            var endPoint = "https://api.instagram.com/v1/tags/bobabear/media/recent?client_id=b1e0e8be521145b8a969e73605a663df&callback=JSON_CALLBACK";

            $http.jsonp(endPoint).success(function(response) {
                callback(response.data);
            });
        }
    };

    return Instagram;

}]);;
