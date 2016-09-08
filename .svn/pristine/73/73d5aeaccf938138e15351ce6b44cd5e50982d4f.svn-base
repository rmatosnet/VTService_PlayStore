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

app.controller('cartoesController', ['$scope', '$http', '$location', '$routeParams', cartoesController]);

function cartoesController($scope, $http, $location, $routeParams) {

    if ($routeParams.id !== undefined) {
        var cartaoid = $routeParams.id;
        var cartao = util.data.cards.filter(function (card) {
            return (card.numero === cartaoid);
        });

        $scope.tipocartao = cartao[0].numero;
        $scope.tiposervico = "0";
        $scope.mensagem = "";
        $scope.cpf = util.data.cpf;

        $scope.abrirChamado = function (cartao) {
            var tservico = "";
            try {
                tservico = parseInt(cartao.tiposervico);
            } catch (e) {
                $.notify("Por favor, selecione o tipo de servico correto");
                return false;
            }

            if (!isNaN(tservico) && parseInt(cartao.tiposervico) === 0) {
                $.notify("Por favor, selecione o tipo de servico correto");
                return false;
            }

            console.log(cartao);

            var chamado = {
                numerocard: cartao.tipocartao,
                desccard: cartao.tipocartao,
                msg: cartao.mensagem,
                cpf: cartao.cpf,
                tipo: cartao.tiposervico
            };

            var chamadoVTService = {
                cpf: cartao.cpf,
                msg: cartao.mensagem,
                observacao: "",
                retorno: "",
                solicitacao_id: "",
                status: "",
                tipo_cartao: "",
                tipo_solicitacao: "",
                lidocli:""
            };
               



            try {
               
                //abertura de chamado no cliente

                var card = chamado.desccard.replace(".", "").replace(".", "").replace(".", "");
                //console.log("URL::: " + url);

                //http://usuario.vtservice.com.br/api/v1/cards/called?cpf=431.411.448-77&desccard=cartao&tipo=outros&msg=teste&numerocard=123456789
                //

                $http.get("http://usuario.vtservice.com.br/api/v1/cards/called?cpf=" + chamado.cpf + "&desccard=cartao&tipo=" + chamado.tipo + "&msg=" + chamado.msg + "&numerocard=" + card, {
                    headers: { 'Authorization': 'Token token=1356040299f3b0b0f68a16ce609214f6' }
                }).success(function (response) {
                    if (response.status) {
                        $.notify("Chamado aberto com sucesso. Status: " + response.status, "success");

                        //limpa os campos
                        $scope.tipocartao = "";
                        $scope.tiposervico = "0";
                        $scope.mensagem = "";
                        $scope.cpf = "";
                        //util.data.chamados = response[0].Model;

                        $location.url("/meuscartoes");
                    } else {
                        $.notify(response[0].Msg, "error");
                    }
                }).error(function (err) {
                    $.notify(err, "error");
                    console.log(err);
                });



            } catch (evnt) {
                $.notify(evnt.message, "error");
            }


            return false;
        }


    } else {

        $scope.cards = [];
        var cards = util.data.cards;

        $scope.enablemenu = function () {
            //habilita do menu, passando parametro para o controller Pai : pageController
            $scope.$emit('enableMenus', true, "Meus Cartões");
        }

        $scope.enablemenu();

        //itera os cartoes para setar as imagens

        cards.forEach(function (item) {
            var nitem = util.stringUtil.removerAcentos(item.nome_item.toLowerCase());
            if (nitem.indexOf('alimentacao') > -1)
                item.imagem = "images/ticket-alimentacao.png";
            else if (nitem.indexOf('refeicao') > -1)
                item.imagem = "images/ticket-refeicao.png";
            else if (nitem.indexOf('legal') > -1)
                item.imagem = "images/vale-transporte.png";
            else if (nitem.indexOf('bom') > -1 || nitem.indexOf('cartao bom'))
                item.imagem = "images/vale-transporte.png";

            $scope.cards.push(item);
        });

        //evento de abertura de detalhes do chaamdo
        $scope.goChamadoDetalhe = function (card) {
            var id = card.numero;
            $location.url('/aberturachamado/' + card.numero);
        }



        //atualiza o objeto cards com as imagens
        util.data.cards = cards;
    }

    $scope.carregarChamados = function () {
        //var cpfunf = util.stringUtil.unformatCPF(util.data.cpf);
        var cpfunf = util.data.cpf;
        $http.get(util.service.listarchamadosVTservice + cpfunf,{ 
            headers: { 'Authorization': 'Token token=1356040299f3b0b0f68a16ce609214f6' }
            }).success(function (response) {
               var chamadosNlidos = response.filter(function (chamadoVTSERVICE) {
                   //return (chamado.statuschamado.toLowerCase() === "fechado" && chamado.lidocli.toLowerCase() === "n");
                   util.data.chamadosVT = chamadoVTSERVICE;
                   if (chamadoVTSERVICE.lidocli!=null)
                   return (chamadoVTSERVICE.status.toLowerCase() === "finalizado" && chamadoVTSERVICE.lidocli.toLowerCase() === "n");
               });
               var qutd = chamadosNlidos.length;
               $scope.$emit('chamadosNLidos', qutd);
             

           });
    }

    $scope.carregarChamados();
};
