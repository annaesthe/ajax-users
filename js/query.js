"use strict";
// GET JSON W JQUERY

$(function(){
		
	$("#pobierz-dane").click(function(data){
	  $.getJSON("http://echo.jsontest.com/imie/ania/oczy/niebieskie/wlosy/blond");
	  
	  };

});

                