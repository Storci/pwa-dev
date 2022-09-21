// Carica le funzioni globali
import * as tw from "./Global/Thingworx/thingworx_api_module.js"
import * as am from "./Global/amchart/amchart_functions.js"
import * as fb from "./Global/Firebase/firebase_auth_module.js"
import * as lang from "./Global/Common/Translation.js"
import * as common from "./Global/Common/commonFunctions.js"

// Recupera il nome dell'utente da firebase, controlla che sia loggato.
// Nel caso non fosse loggato richiama la pagina di login
fb.onAuthStateChanged_2()
// funzione per la traduzione 
lang.getLanguage()

// Funzione che ritorna l'anno il mese e il giorno
// partendo da una data completa.
// Il formato è YYYY-MM-DD
function getDate(date){
  // Recupera l'anno
	let year  = date.getFullYear()
  // Recupera il numero del mese - da 0 a 11
	let month = date.getMonth()
  // Recupera il giorno del mese - da 1 a 31
	let day   = date.getDate()
  // Converte la variabile month in number e ci somma 1
  // per portare il range da 1 a 12
	month = Number(month) + 1
  // Aggiunge lo zero nei numeri inferiori a 10, in modo da avere sempre 2 cifre
	month = month < 10 ? '0' + month : month
  // Aggiunge lo zero nei numeri inferiori a 10, in modo da avere sempre 2 cifre
  day = day < 10 ? '0' + day : day
  // Ritorna la stringa
	return year + '-' + month + '-' + day
}

//funzione per recuperare i dati da tw per mettere nella tabella
function getAlarmsNotifications(idTable, startDate, endDate, filter, getHistory){
    tw.getListAlert(startDate, endDate, filter, getHistory)
    .then((list)=>{
        console.log(list)
    $(idTable).empty()

        list.rows.forEach((el,i) =>{
          let timeStart = new Date(el.TimeStart).toLocaleString();
          let timeEnd = new Date(el.TimeStart).toLocaleString();
          // Definisci l' id della riga della tabella
          let id = "IDHistoryTableRow" + i;
          let row = '<tr id=' + id + ' class="hover_tr" style="border-style: none;background: var(--bs-table-bg);">'
          row    += '    <td style="font-size: 12px;border-style: none;">' + el.CustomerName  + '</td>'
          row    += '    <td style="font-size: 12px;border-style: none;">' + el.MachineName    + '</td>'
          row    += '    <td style="font-size: 12px;border-style: none;">' +  el.Gravity + '</td>'
          row    += '    <td style="font-size: 12px;border-style: none;">' + timeStart + '</td>'
          row    += '    <td style="font-size: 12px;border-style: none;">' + timeEnd + '</td>'
          row    += '    <td style="font-size: 12px;border-style: none;">' +el.Message  + '</td>'
          row    += '</tr>'  
				// Aggiunge la riga alla tabella
				$(idTable).append(row);
        })
    })
    .catch((err)=>{
        console.log('promise rejected', err)
    })
    /*function searchTable(value, data){
      var filterData = list
      console.log(filterData)
      for (var i = 0; i < data.length;i++){

      }

    }
    searchTable();*/
}

function alertHistory(){
  let alertStartHistory = new Date()
  let alertEndHistory   = new Date()

  // imposta 30 giorni prima della data odierna
  alertStartHistory.setDate(alertStartHistory.getDate()-9)
  // Imposta i 2 data picker con le date calcolate prima
	// La funzione getDate ritorna solamente l'anno, il mese e il giorno
	// yyyy-MM-dd
  $('#IDtimeStart').val(getDate(alertStartHistory))
  $('#IDtimeEnd').val(getDate(alertEndHistory))

  getAlarmsNotifications('#IDAlertHistoryBody',alertStartHistory,alertEndHistory,"*",true)

  
$("#IDtimeStart").change(function(){
  // Recupera i valori di inizio e fine produzione
  let alertStartHistory = new Date($(this).val())
  let alertEndHistory   = new Date($('#IDtimeStart').val())
  // Recupera la lista delle produzioni
  // Per default viene visualizzata la prima produzione dell'elenco. (l'ultima produzione effettuata in ordine cronologico)
   getAlarmsNotifications('#IDAlertHistoryBody',alertStartHistory,alertEndHistory,"*", true);
  })
  
$("#IDtimeEnd").change(function(){
    // Recupera i valori di inizio e fine produzione
    let alertStartHistory = new Date($('#IDtimeEnd').val())
    let alertEndHistory   = new Date($(this).val())
    // Recupera la lista delle produzioni
    // Per default viene visualizzata la prima produzione dell'elenco. (l'ultima produzione effettuata in ordine cronologico)
     getAlarmsNotifications('#IDAlertHistoryBody',alertStartHistory,alertEndHistory,"*", true);
  })
}
alertHistory();
  
$("#IDsearch").on('keyup', function(){
  let inputSearch = $(this).val()
  console.log(inputSearch)
})

/*function searchTable(value, data){


}*/