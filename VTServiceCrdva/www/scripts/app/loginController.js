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

app.controller('loginController', ['$scope', '$http', '$location', loginController]);

function loginController($scope, $http, $location) {
    var urlconsultarcartao = util.service.consultarCartao;
    var token = util.data.token;
    $scope.showLogin = true;

    $scope.hideMenu = function () {
        //habilita do menu
        $scope.$emit('enableMenus', false, "");
    }
    $scope.hideMenu();



    $scope.loadingbutton = "CONSULTAR";
    $scope.consultar = function() {
        $scope.loadingbutton = "PROCESSANDO...";
        //valida o cpf
        var $isValid = util.validator.validarCPF($scope.cpf);
        if (!$isValid) {
            $(".btn-signin").notify("CPF inválido, tente novamente.", { position: "bottom center", className: "error" });
            $scope.loadingbutton = "CONSULTAR";
            return false;
        }
        var cpfmask = util.stringUtil.formatCPF($scope.cpf);
        $scope.cpf = cpfmask;
        $http({
            method: 'GET',
            url: urlconsultarcartao + $scope.cpf,
            headers: {
                'Authorization': 'Token token=' + token
               
            }
        }).success(function(response) {
            $scope.loadingbutton = "CONSULTAR";
            $scope.showLogin = false;
            if (response) {
                //guarda os cards em um datasource temporário
                util.data.cards = response.cards;
                $scope.logout = false;
                var urlatual = window.location.href;
                $(".btn-signin").notify("Login efetuado com sucesso, carregando cartões", { position: "bottom center", className: "success" });
                $location.url('/meuscartoes');
                util.data.cpf = $scope.cpf;
            } else {
                $scope.loadingbutton = "CONSULTAR";
                $(".btn-signin").notify("CPF não encontrado, tente novamente.", { position: "bottom center", className: "warning" });
             
            }
        }).error(function(error) {
            console.log(error);
            $scope.loadingbutton = "CONSULTAR";
            $(".btn-signin").notify("Falha, tente mais tarde.", { position: "bottom center", className: "warning" });
            
        });
        return false;
       
    };


    //bindMask();
};
