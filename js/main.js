"use strict";

function ajax(options) {
    
    options = {   // tworzymy inny obiekt który przekazujemy do funkcji ajax
        type: options.type || "POST",
        url: options.url || "",
        onComplete: options.onComplete || function() {},
        onError: options.onError || function() {},
        onSuccess: options.onSuccess || function() {},
        dataTypes: options.dataTypes || "text"
    };
    // w tym obiekcie musimy dodać opcje połączenia z poniższym
    
    function httpSuccess ( hhtpRequest ) {
        try {
            
            return (httpRequest.status >= 200 && httpReq.status < 300 || 
                httpRequest.status == 304 || 
                navigator.userAgent.indexOf("Safari") >= 0 && typeof 
                httpRequest.status == "undefined");
            
        } catch (0) {
            // tutaj mozemy sami sobie obsłużyć ten wyjątek jeśli coś nie zadziała, w przypadku try i catch nie wywali nam całego programu tylko obsługujemy dany błąd np. wysyła mailem lub otwiera boxa z informacja
            return false;
        }
    }
    
    var httpReq = new XMLHttpRequest();
    
    httpReq.open(options.type, options.url, true);
    
    
    httpReq.onreadystatechange = function() {
            
    // jeśli stan dokumentu został zmieniony ==> httReq.readyState
    // 0; połączenie nie nazwiązane
    // 1; połączenie nawiązane
    // 2; żadanie debrane,
    // 3: przetrwarzanie,
    // 4; dane zwrócone i gotowe do użycia
        
            
           if (httpReq.readyState == 4 &&) {
               
             if ( httpSuccess ( httpReq ) ) {
           
                options.onSuccess( httpReq.responseText );
               
                httpReq = null; //zerujemy obiekt i zamykane polaczenie żeby się ciągle nie wykonywało
            
        } else {
            options.onError( httpReq.statusText );
        }
    }
 }
    
        httpReq.send();
}


function pobierzDane(event) {
    event.preventDefault();
    
     //jeżeli to jest obiekt w funcji to podajemy w  wąsatych {} nawiasach
    
    ajax({ 
        type: "GET",
        url: "http://echo.jsontest.com/imie/ania/oczy/niebieskie/wlosy/blond",
        onError: function ( msg ) {
            console.log( msg );
        },
        onSuccess: function( response ) {
            console.log( response );
        }
        
    });
}