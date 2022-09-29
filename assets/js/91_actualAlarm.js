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


let customerName = localStorage.getItem('global_customer')
console.log(customerName)

// Cancella tutte le righe della tabella
$("#IDAlertActualBody").empty()

let direction = true
$("th").click(function() {
	let icon = "#" + $(this)[0].children[0].children[1].id
	$(".icon-table").addClass("d-none")
  $(icon).removeClass("d-none")

	if(direction){
		$(icon).text("expand_more")
	}else{
		$(icon).text("expand_less")
	}

	let column = $(this).index()
	let table = $("#IDAlertActualBody")

	//let start = new Date().getTime()
	insertionSort(table[0], column, direction)
	//let stop  = new Date().getTime()
	//console.log(stop-start + " ms")

	direction = !direction
})

function convertDate(s){
	let sdate = s
	sdate = sdate.split(", ")
	let date = sdate[0]
	date = date.split("/")
	let time = sdate[1]

	let day = date[0]
	let month = date[1]
	let year = date[2]

	return Date.parse(year + "/" + month + "/" + day + " " + time)
}

function insertionSort(table, column, dir){
	let rows = 	table.children
	let parent = table

	for(let i=1; i<rows.length; i++){
		for(let j=i-1; j>-1; j--){
			let value1 = rows[j].getElementsByTagName("TD")[column].innerHTML
			let value2 = rows[j+1].getElementsByTagName("TD")[column].innerHTML

			if(column == 0 || column == 1){
				value1 = convertDate(value1)
				value2 = convertDate(value2)
			}

			if(dir){
				if(value2 < value1){
					parent.insertBefore(rows[j+1], rows[j])
				}
			}else{
				if(value2 > value1){
					parent.insertBefore(rows[j+1], rows[j])
				}
			}
		}
	}
}

//funzione per recuperare i dati da tw per mettere nella tabella
function getAlarmsNotifications(filter, getHistory,customerName){
    tw.getListAlert("","",filter, getHistory,customerName)
    .then((list)=>{
        console.log(list)
    $("#IDAlertActualBody").empty()
        list.rows.forEach(el =>{
            let timeStart = new Date(el.TimeStart).toLocaleString();
        let row = '<tr class="alert" role="alert">'
				row    += '    <td >' + timeStart  + '</td>'
				row    += '    <td >' + el.MachineName    + '</td>'
				row    += '    <td >' + el.Gravity + '</td>'
				row    += '    <td >' + el.CustomerName  + '</td>'
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
// richiamo della funzione
 getAlarmsNotifications("*", false,customerName);