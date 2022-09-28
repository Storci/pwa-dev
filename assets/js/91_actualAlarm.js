// Carica le funzioni globali
import * as tw from "./Global/Thingworx/thingworx_api_module.js"
import * as am from "./Global/amchart/amchart_functions.js"
import * as fb from "./Global/Firebase/firebase_auth_module.js"
import * as lang from "./Global/Common/Translation.js"
import * as common from "./Global/Common/commonFunctions.js"



/*async function getAlarmsNotifications(days, filter, getHistory){
    let alarmResponse = await tw.getListAlert(days, filter, getHistory)
    console.log(alarmResponse)
}*/



// Recupera il nome dell'utente da firebase, controlla che sia loggato.
// Nel caso non fosse loggato richiama la pagina di login
fb.onAuthStateChanged_2()
// funzione per la traduzione 
lang.getLanguage()

/* Sorting table*/
/*$(document).ready(function () {
   // $('#alertTable').DataTable();
  // var data = alarmi
    
    var columns = []

    var rowdata = data

    Object.keys( data ).forEach( function (key, index) {
        columns.push( {data: key, title: key} ); 
    

        var table = $('#alertTable').DataTable({
            data: data,
            columns: columns
          });
        });
});*/
$(document).ready(function(){
    $('#alertTable').DataTable();
})





//funzione per recuperare i dati da tw per mettere nella tabella
function getAlarmsNotifications(startDate, endDate, filter, getHistory){
    tw.getListAlert(startDate, endDate, filter, getHistory)
    .then((list)=>{
        console.log(list)
    $("#IDAlertActualBody")

        list.rows.forEach(el =>{
            let timeStart = new Date(el.TimeStart).toLocaleString();
        let row = '<tr class="alert" role="alert">'

				row    += '    <td >' + el.CustomerName  + '</td>'
				row    += '    <td >' + el.MachineName    + '</td>'
				row    += '    <td >' + el.Gravity + '</td>'
				row    += '    <td >' + timeStart  + '</td>'
				row    += '    <td >' + el.Message  + '</td>'
				row    += '</tr>'
				// Aggiunge la riga alla tabella
				$('#IDAlertActualBody').append(row);
        })
       /*for(let i=0; i < list.length; i++){
        console.log(list[i].CustomerName)
       }*/
    })
    .catch((err)=>{
        console.log('promise rejected', err)
    })
}
const alarmi = getAlarmsNotifications("*", false);