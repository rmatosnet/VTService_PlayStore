/*
* Develop by: Rodrigo
* Angular JS Configuration for APP
*/
/// <reference path="../jquery-2.1.0/jquery-2.1.0.min.js"/>
/// <reference path="../angular/angular.min.js"/>
/// <reference path="../angular/angular-route.min.js"/>
/// <reference path="../angular/angular-resource.min.js"/>
/// <reference path="../funcoesuteis.js"/>
/// <reference path="../app/app.js"/>
/// <reference path="~/www/scripts/index.js" />

'use strict';

var app = app || {};

app.controller('logoutController', ['$scope', '$http', '$location', logoutController]);

function logoutController($scope, $http, $location) {
 
   
        localStorage.clear();
        $location.url("/");
        $scope.logout = true;
        sairdoapp();
    

       
 

  
};