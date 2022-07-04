// definisce l'url di base della pagina attuale (in questo caso della pagina index.html).
// il risultato è http(s)://xxx.xxx.xxx.xxx:xxxx
// baseURL verrà utilizzato come base per il cambio pagina.
let baseURL = window.location.protocol + "//" + window.location.host;

// Funzione che controlla se il tema di default è Dark
// Nel caso, imposta le pagine con il tema Dark
function checkDefaultTheme(){
	// Controlla se l'utente abbia impostato come tema di default dark
	if(localStorage.getItem("global_theme")	== "Dark"){
		// Cambia il toggle button da light a dark
		$('#mycheck').prop('checked', true);
	
		// Cambia le icone light/dark da black a white
		$('#IDDarkModeIcon').css("background-image", "url("  + "./assets/img/loghi/dark/dark_mode_black_24dp.svg)");  
		$('#IDLightModeIcon').css("background-image", "url(" + "./assets/img/loghi/dark/light_mode_black_24dp.svg)");  
		
		$("html").addClass("dark")
		
	}else{
		// Cambia il toggle button da light a dark
		$('#mycheck').prop('checked', false);
	
		// Cambia le icone light/dark da black a white
		$('#IDDarkModeIcon').css("background-image", "url("  + "./assets/img/loghi/Light/dark_mode_white_24dp.svg)");  
		$('#IDLightModeIcon').css("background-image", "url(" + "./assets/img/loghi/Light/dark_mode_white_24dp.svg)");  
		
		$("html").removeClass("dark")
	}	
}
checkDefaultTheme();

// HOW SET A CSS PROPERTY
//var r = document.querySelector(':root');
//r.style.setProperty('--bs-primary', '#004071');


// Toggle button per il cambio del tema light/dark
$('#mycheck').change(function() {
	// Se il selettore è ON abilito il tema dark
	if(this.checked){	
				
		// Salvo il tema dark nella variabile locale, questo permette di ricordarmi la scelta alla prossima riapertura della pagina
		// le local storage non vengono cancellate (bisogna cancellare la cache)
		localStorage.setItem('global_theme', "Dark");
		
		// Cambia le icone light/dark da black a white
		$('#IDDarkModeIcon').css("background-image", "url("  + "/assets/img/Icone/Light/dark_mode_white_24dp.svg)");  
		$('#IDLightModeIcon').css("background-image", "url("  + "/assets/img/Icone/Light/light_mode_white_24dp.svg)");  

		$("html").addClass("dark")
		
	}else{
		
		// Salvo il tema dark nella variabile locale, questo permette di ricordarmi la scelta alla prossima riapertura della pagina
		// le local storage non vengono cancellate (bisogna cancellare la cache)
		localStorage.setItem('global_theme', "Light");
		
		// Cambia le icone light/dark da white a black
		$('#IDDarkModeIcon').css("background-image", "url("  + "/assets/img/Icone/Dark/dark_mode_black_24dp.svg)");  
		$('#IDLightModeIcon').css("background-image", "url("  + "/assets/img/Icone/Dark/light_mode_black_24dp.svg)");  
		
		$("html").removeClass("dark")
	}
})

function logoFunction(){
        //let image= document.getElementById("storci_logo");
        window.location.href = baseURL + "/index.html";
        }


/*
document.getElementById(id).onclick = function(){
		// Carica la pagina.
		window.location.href = baseURL + "/Customer/customerLineDetails.html";
	    };
        
        
*/