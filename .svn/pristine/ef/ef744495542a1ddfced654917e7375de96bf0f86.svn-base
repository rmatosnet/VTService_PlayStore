/*
* Develop by: Rodrigo
* Angular JS Configuration for APP
*/

///<reference path="../jquery-2.1.0/jquery-2.1.0.min.js"/>
///<reference path="../angular/angular.min.js"/>
///<reference path="../angular/angular-route.min.js"/>
///<reference path="../angular/angular-resource.min.js"/>
///<reference path="../funcoesuteis.js"/>

'use strict';

var app = angular.module('vtservice', ['ngRoute', 'ngAnimate']);

app.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
    //configura o HashBang
    //$locationProvider.hashPrefix('!');

    $routeProvider
        //pagina de login
        .when("/", { templateUrl: "pages/login.html", controller: "loginController" })
        .when("/meuscartoes", { templateUrl: "pages/listacartoes.html", controller: "cartoesController" })
        .when("/aberturachamado/:id", { templateUrl: "pages/aberturachamado.html", controller: "cartoesController" })
        .when("/meuschamados", { templateUrl: "pages/listachamados.html", controller: "chamadoController" })
        .when("/detalheschamado/:id", { templateUrl: "pages/detalheschamado.html", controller: "chamadoController" })
        .when("/logout", { templateUrl: "pages/logout.html", controller: "logoutController" })
        .otherwise({ redirectTo: '/' });

    //configura o httpProvider RESPONSE interceptor, usado para exibir uma mensagem de erro caso o servidor retorne algum erro
    $httpProvider.interceptors.push('vtInterceptor');
}]);

app.factory('vtInterceptor', ['$q', function ($q) {
 
    return function (promisse) {
        
        return promisse.then(function (response) {
            return response;
        },
            function (response) {
                var $data = response.data;
                var $error = $data.error;
                console.error($error);
                if ($error && $error.text) {
                    $.notify("ERROR: " + $error.text, "error");
                } else {
                    if (response.status === 404) {
                        $.notify("Erro ao acessar o servidor, página não encontrada: " + $error.text, "error");
                    } else {
                        console.error($error.text);
                        $.notify("ERROR, see log console", "error");
                    }
                }
                return $q.reject(response);
            });
    };
}]);
