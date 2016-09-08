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

app.controller('chamadoController', ['$scope', '$http', '$location', '$routeParams', chamadoController]);

function chamadoController($scope, $http, $location, $routeParams) {
    var chamados = util.data.chamadosVT;

    $scope.enablemenu = function () {
        //habilita do menu, passando parametro para o controller Pai : pageController
        $scope.$emit('enableMenus', true, "Meus Chamados");
    }

    $scope.enablemenu();

    if ($routeParams.id !== undefined) {
        $scope.chamadoOk = false;
        $scope.carregarDadosChamado = function (id) {
            id = parseInt(id) > 0 ? id : $routeParams.id;
            var chamadoVTService = util.data.chamadosVT.filter(function (chamadoVT) {
                return (chamadoVT.solicitacao_id === parseInt(id));
            });



            if (chamadoVTService.length > 0) {
                $scope.protocolo = chamadoVTService[0].solicitacao_id;
                $scope.tipochamado = chamadoVTService[0].tipo_solicitacao;
                $scope.cpf = chamadoVTService[0].cpf;
                $scope.numerocard = chamadoVTService[0].tipo_cartao;
                $scope.nomecartao = chamadoVTService[0].tipo_solicitacao;
                $scope.statuschamado = chamadoVTService[0].status;
                $scope.audiochamado = chamadoVTService[0].UrlAudio;
                $scope.mensagemusuario = chamadoVTService[0].observacao;
                $scope.respostacallcenter = chamadoVTService[0].retorno;
                $scope.chamadoOk = true;

             } else {
                $.notify("Chamado solicitado não existe", "info");
                $location.url("/meuschamados");
                return false;
            }
            return false;
        }

        $scope.carregarDadosChamado($routeParams.id);
    } else {

        //  $http.get(util.service.listarchamadosVTservice + util.stringUtil.unformatCPF(util.data.cpf))
        $http.get("http://usuario.vtservice.com.br/api/v1/cards/list_solicitations?cpf=" + util.data.cpf, {
            headers: { 'Authorization': 'Token token=1356040299f3b0b0f68a16ce609214f6' }
        }).success(function (response) {
            console.log(response);
            //var chamadoVTService = util.data.chamadosVT;
            //    var chamadosNlidos = response.filter(function (chamadoVTService) {
            //        //return (chamado.statuschamado.toLowerCase() === "fechado" && chamado.lidocli.toLowerCase() === "n");
            //        if (chamadoVTSERVICE.lidocli != null)
            //        return (chamadoVTService.status.toLowerCase() === "finalizado" && chamadoVTSERVICE.lidocli.toLowerCase() === "n");
            //    });

              //  $scope.$emit('chamadosNLidos', chamadosNlidos);
                //Link Ref: http://www.w3schools.com/jsref/jsref_sort.asp
                //Link ref2: http://www.egtry.com/javascript/array/sort
                //Efetua o orderby descending
                var chamadoVTService = response;
                chamadoVTService = chamadoVTService.sort(function (a, b) { return (b.solicitacao_id - a.solicitacao_id) });
                util.data.chamadosVT = chamadoVTService;
                $scope.chamadosVT = chamadoVTService;
                console.log(response);
            });

       

        $scope.lerchamado = function (chamadosVT) {
            console.log(chamadosVT);
            $http.get(util.service.atualizarChamado + "?idchamado=" + chamadosVT.solicitacao_id)
                .success(function (response) {
                    if (response[0].Status === true) {
                        $.notify(response[0].Msg);
                        $location.url('/detalheschamado/' + chamadosVT.solicitacao_id);
                    } else {
                        $.notify(response[0].Msg);
                    }
                });
        }

        $scope.lerchamadoVTSERVICE = function (chamadosVT) {
            console.log(chamadosVT);
            $http.get(util.service.atualizarChamadoVTService + chamadosVT.solicitacao_id,{
            headers: { 'Authorization': 'Token token=1356040299f3b0b0f68a16ce609214f6' }
        }).success(function (response) {
                        $location.url('/detalheschamado/' + chamadosVT.solicitacao_id);
                    
                });
        }

        $scope.DetalhechamadoVTService = function (chamadosVT) {
             $location.url('/detalheschamado/' + chamadosVT.solicitacao_id);
           

        }

    }

};