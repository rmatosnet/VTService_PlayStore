/*
* Develop by: Rodrigo
* Angular JS Configuration for APP
*/

///<reference path="../jquery-2.1.0/jquery-2.1.0.min.js"/>
///<reference path="../angular/angular.min.js"/>
///<reference path="../angular/angular-route.min.js"/>
///<reference path="../angular/angular-resource.min.js"/>
///<reference path="../funcoesuteis.js"/>
///<reference path="../app/app.js"/>

'use strict';

var app = app || {};

app.controller('pageController', ['$scope', '$http', pageController]);

function pageController($scope, $http) {
    var self = this;
    $scope.menuVisible = false;
    $scope.chamadosnlidos = 0;
    $scope.$on('enableMenus', function (event, enablemenu, pname) {
        if (enablemenu === true) {
            $scope.menuVisible = true;
        } else {
            $scope.menuVisible = false;
        }
        if (pname !== undefined) {
            $scope.pagename = pname;
        } else {
            $scope.pagename = "";
        }
    });

    $scope.$on('chamadosNLidos', function (event, qtdchamados) {
        if (qtdchamados !== undefined && parseInt(qtdchamados) > 0) {
            $scope.chamadosnlidos = qtdchamados;
        }
    });
};

