"use strict";

function ajax( options ) {  //przekazuje obiekt options
	
	options = {					//ustawiam wewnetrznie dane tak jak w json
		type: options.type || "POST",   //ustawiam  typ metody, lub domyslnie metode POST
		url: options.url || "",
		onComplete: options.onComplete || function () {},
		onError: options.onError || function () {},
		onSuccess: options.onSuccess || function () {}, 
		dataType: options.dataType || "tekst"
	};
	
	console.log("dziala");
	
	//domyslne dzialanie przegladarki wyrzuca error do consoli, jezeli chce obsłużyc jakos błąd inaczej, nie w przegladarce to wrzucam do try catch
	
	function httpSuccess ( httpRequest ) {   //sprawdzam status, jezeli cokolwiek jest nie tak, 													zwraca false
		try {
			return (httpRequest.status >= 200 && httpRequest.status<300 ||
			httpRequest.status == 304 || 
			navigator.userAgent.indexOf("Safari") >= 0 && typeof 
			httpRequest.status == "undefined");
			
		}catch (e) {
			return false;
		}
	}
	
	
	var httpReq = new XMLHttpRequest();    //w tym obiekcie tworzymy sobie nasz obiekt połączenia
	httpReq.open(options.type, options.url, true);     //otwieramy polaczenie

	
	httpReq.onreadystatechange = function() {
		
			
	//jesli stan dokumentu został zmieniony na http.Req.readyState
	//0: połączenie nie nawiązane,
	//1: połączenie nawiązane,
	//2: żądanie odebrane,
	//3: przetwarzanie,
	//4: dane zwrócone i gotowe do użycia
		
		if (httpReq.readyState == 4) {
			
			if (httpSuccess (httpReq.status)) {
				
					options.onSuccess(httpReq.responseText);  //wywolaj funckje onSucces, która pobiera jeden 												argument - w funkcji ajax wartosc msg!! pobiera 											odpowiedź z serwera z naszego obiektu za pomocoa 											responeText
			
					httpReq = null;	
			}
			
//			(httpReq.status >= 200 && httpReq.status<300 ||
//			httpReq.status == 304 || 
//			navigator.userAgent.indexOf("Safari") >= 0 && typeof 
//			httpReq.status == "undefined")		
//			alert(httpReq.responseText);  //wyswietla odpowiedź serwera responseText
			
			
		} else {
			options.onError(httpReq.statusText);   //zwroci status z 404
		}
		
	}
		
	httpReq.send();
	
}

function pobierzDane(event) {
	event.preventDefault();     //zeby nam sie nie przeladowala strona!! zawsze to rob!!
	
	ajax({
		type: "GET",
		url: "http://echo.jsontest.com/imie/ania/oczy/niebieskie/wlosy/blond",
		onError: function (msg) {    //message która dostaniemy dla obsługi błedu to wywali do logow
			console.log( msg ); 
		},
		onSuccess: function (response) {
            
            var jsonObj = JSON.parse(response); // parse zmienia tekst na OBIEKT
            
//            console.log( jsonObj );
            
            var imie = document.createElement("p");
            imie.innerHTML=("Imię: " + jsonObj.imie);
            
            var oczy = document.createElement("p");
            oczy.innerHTML=("Oczy: " + jsonObj.oczy);
            
            var wlosy = document.createElement("p");
            wlosy.innerHTML=("Włosy: " + jsonObj.wlosy);
            
            document.body.appendChild(imie);
            document.body.appendChild(oczy);
            document.body.appendChild(wlosy);
          
		}
		
	});  //wowłuje funkcje [płączenie z serwerem zdefiniowana w ajax
}