
// // Initialize i18next
// i18next.init({
// 	lng: 'en', // default language
// 	resources: {
// 	  en: {
// 		translation: {
// 		  "actual_alarms": "Actual Alarms",
// 		  "number_of_alarms": "Numbers of Alarms Present",
//       "days":"Days"
// 		}
// 	  },
// 	  it: {
// 		translation:{
// 		"actual_alarms":"Allarmi Attuale",
// 		"number_of_alarms":"Numeri Allarmi Presenti",
//     	"days":"Giorni"
// 		}
// 	  }
// 	}
	
//   });
  
//   function translatePage() {
// 	$('#dropdown2').text()
// 	$('[data-i18n]').each(function() {
// 	  var key = $(this).data('i18n');
// 	  $(this).text(i18next.t(key));
// 	});
//   }

//   $(".translate1").click(function() {
// 	console.log($(this).attr('id'))
// 	console.log($(this).attr('value'))
// 	$("#dropdown1").text($(this).attr('value'))
// 	$(this).text(i18next.t(key));
//   });
  
  
//   translatePage();
  

/*i18next.init({
	lng: localStorage.getItem("select_language") || 'en', // default language
	resources: {
	  en: {
		translation: {
		  "actual_alarms": "Actual Alarms",
		  "number_of_alarms": "Numbers of Alarms Present",
		  "days": "Days",
		  "language": "Change language",
		  "line":"Line"
		}
	  },
	  it: {
		translation: {
		  "actual_alarms": "Allarmi Attuale",
		  "number_of_alarms": "Numeri Allarmi Presenti",
		  "days": "Giorni",
		  "language": "Cambia lingua",
		  "line":"Linea"
  
		}
	  }
	}
  });
  
  // Function to translate page content
  function translatePage() {
	let select_language = localStorage.getItem("select_language");
	let select_language_complete = localStorage.getItem("select_language_complete");
	$('#dropdown2').text(select_language_complete);
	$('[data-i18n]').each(function() {
	  var key = $(this).data('i18n');
	  $(this).text(i18next.t(key));
	});
  }
  
  // Translate the page content when language is changed
  $(".translate").click(function() {
	let select_language = $(this).attr('id');
	let select_language_complete = $(this).attr('value');
	$("#dropdown1").text(select_language_complete);
	localStorage.setItem('select_language', select_language);
	localStorage.setItem('select_language_complete', select_language_complete);
	i18next.changeLanguage(select_language, function(err, t) {
	  if (err) return console.log('something went wrong loading', err);
	  translatePage();
	});
  });
  
  // Translate the page content on initial load
  $(document).ready(function() {
	translatePage();
  });
  export{translatePage}
*/