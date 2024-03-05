
// Initialize i18next
i18next.init({
	lng: 'en', // default language
	resources: {
	  en: {
		translation: {
		  "actual_alarms": "Actual Alarms",
		  "number_of_alarms": "Numbers of Alarms Present",
      "days":"Days"
		}
	  },
	  it: {
		translation:{
		"actual_alarms":"Allarmi Attuale",
		"number_of_alarms":"Numeri Allarmi Presenti",
    "days":"Giorni"
		}
	  }
	}
	
  });
  
  function translatePage() {
	$('#dropdown2').text()
	$('[data-i18n]').each(function() {
	  var key = $(this).data('i18n');
	  $(this).text(i18next.t(key));
	});
  }

  $(".translate1").click(function() {
	console.log($(this).attr('id'))
	console.log($(this).attr('value'))
	$("#dropdown1").text($(this).attr('value'))
	$(this).text(i18next.t(key));
  })
  
  translatePage();
  