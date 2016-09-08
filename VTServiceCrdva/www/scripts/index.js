// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";
    
    document.addEventListener('deviceready', onDeviceReady, false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause, false);
        document.addEventListener('resume', onResume, false);
        document.addEventListener("backbutton", onBackKeyDown, false);

        /**
         * Cria os eventos bindins para verificar se o aparelho esta ou não com internet
         */
        document.addEventListener("offline", onOffline, false);
        document.addEventListener("online", onOnline, false);
        document.addEventListener("backbutton", onBackKeyDown, false);

        //Plugin de SIM card
        /**
         * Info about SIM Plugin: https://www.npmjs.com/package/cordova-plugin-sim
         */
        // window.plugins.sim.getSimInfo(successSimCallback, errorSimCallback);

        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.

      //  $("#cpf").mask("999.999.999-99");

    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };

     /**
     * Verifica se o aparelho esta com a conexao com internet
     * @returns {} 
     */
    function testCheckConnection() {
        var networkState = navigator.connection.type;

        var states = {};
        states[Connection.UNKNOWN] = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI] = 'WiFi connection';
        states[Connection.CELL_2G] = 'Cell 2G connection';
        states[Connection.CELL_3G] = 'Cell 3G connection';
        states[Connection.CELL_4G] = 'Cell 4G connection';
        states[Connection.CELL] = 'Cell generic connection';
        states[Connection.NONE] = 'No network connection';

        console.log('Connection type: ' + states[networkState]);

        alert("Você está sem conexão com internet.");
    };

    function onOnline() {
        // Handle the online event
        var networkState = navigator.connection.type;

        if (networkState !== Connection.NONE) {
            console.log("Conexão efetuada com sucesso");
        }

        window.display('Connection type: ' + networkState);
    };

    function onOffline() {
        var networkState = navigator.connection.type;

        if (networkState === Connection.NONE || networkState === Connection.UNKNOWN) {
            // ativado pelo offline event
            console.log("lost connection");
            window.display('Perda de conecxão: ' + networkState);
        }
    };


    /**
     * Callback function to receive success result from cordova plugin sim data
     * @param {} result 
     * @returns {} 
     */
    function successSimCallback(result) {
        console.log(result);
    };

    /*
    *  Callback function to receive errors results from cordova plugin sim data
    * @param {} result
    * @returns {}
    */
    function errorSimCallback(error) {
        console.log(error);
    };

    /**
     * Para Android 6.0 its required a grant permission API level 23
     * @returns {} 
     */

    // check permission 
    function hasReadPermission() {
        window.plugins.sim.hasReadPermission(successCallback, errorCallback);
    }

    // request permission 
    function requestReadPermission() {
        // no callbacks required as this opens a popup which returns async 
        window.plugins.sim.requestReadPermission();
    }

    function onBackKeyDown(event) {
        sairdoapp();

       // if (cordova.platformId !== 'windows') {
       //     return;
       // }

       // if (window.location.href !== 'index.html') {
       //     window.history.back();
       // } 
       //else 
       // {
       //     sairdoapp();
       //    throw new Error('Exit'); // This will suspend the app
       // }
    };
        
    

})();

//function bindMask() {
//    $("#cpf").mask("999.999.999-99");
//}

function sairdoapp() {
    navigator.app.exitApp();
}

