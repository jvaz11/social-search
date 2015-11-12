angular.module("myApp", ['ui.router', 'angularMoment', 'angular-clipboard'])

.config(function($stateProvider, $urlRouterProvider) {
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
                .success(function(tweets) {
                    $scope.tweets = tweets;
                    $scope.fetchingResults = false;
                    $scope.resultsCurrentlyShowingTwitter = {
                        prefix: query.prefix,
                        body: query.body,
                        network: 'Twitter'
                    };
                })
                .error(function(error) {
                    $scope.status = 'Unable to load tweets: ' + error.message;
                });
        } else {
            Instagram.getIgPosts(query.body, function(data) {

                $scope.igposts = data;
                console.log(data);
                $scope.fetchingResults = false;
                $scope.resultsCurrentlyShowingInstagram = {
                    prefix: query.prefix,
                    body: query.body,
                    network: 'Instagram'
                };
            });
        }

    };

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
    var Twitter = {
        getTweets: function(query, prefix) {
            if (prefix === '@') {
                return $http.get(urlBase + '/byhandle/' + query);
            }
            return $http.get(urlBase + '/byhashtag/' + query);
        }
    };

    return Twitter;
}])

.factory('Instagram', ['$http', function($http) {

    var Instagram = {
        getIgPosts: function(querybody, callback) {

            var endPoint = 'https://api.instagram.com/v1/tags/' + querybody + '/media/recent?client_id=b1e0e8be521145b8a969e73605a663df&callback=JSON_CALLBACK';

            $http.jsonp(endPoint).success(function(response) {
                callback(response.data);
            });
        }
    };

    return Instagram;

}]);;
