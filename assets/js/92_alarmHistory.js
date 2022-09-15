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

//funzione per recuperare i dati da tw per mettere nella tabella
function getAlarmsNotifications(startDate, endDate, filter, getHistory){
    tw.getListAlert(startDate, endDate, filter, getHistory)
    .then((list)=>{
        console.log(list)
    $("#IDAlertHistoryBody")

        list.fieldDefinitions.forEach(el =>{
            let row = '<tr class="hover_tr" style="border-style: none;background: var(--bs-table-bg);">'
				row    += '    <td style="font-size: 12px;border-style: none;">' + el.CustomerName  + '</td>'
				row    += '    <td style="font-size: 12px;border-style: none;">' + el.tempo_fase    + '</td>'
				row    += '    <td style="font-size: 12px;border-style: none;">' + el.delta_T + '</td>'
				row    += '    <td style="font-size: 12px;border-style: none;">' + el.temperatura  + '</td>'
				row    += '    <td style="font-size: 12px;border-style: none;">' + el.umidita  + '</td>'
				row    += '    <td style="font-size: 12px;border-style: none;">' + el.hz_inverter  + '</td>'
				row    += '    <td style="font-size: 12px;border-style: none;">' + el.tempo_ventilazione  + '</td>'
				row    += '    <td style="font-size: 12px;border-style: none;">' + el.tempo_pausa  + '</td>'
				row    += '</tr>'
				// Aggiunge la riga alla tabella
				$('#IDAlertHistoryBody').append(row);
        })
       /*for(let i=0; i < list.length; i++){
        console.log(list[i].CustomerName)
       }*/
    })
    .catch((err)=>{
        console.log('promise rejected', err)
    })
}
const alarmi = getAlarmsNotifications(2, "*", true);


var $table = $('#fresh-table')
var $alertBtn = $('#alertBtn')

window.operateEvents = {
  'click .like': function (e, value, row, index) {
    alert('You click like icon, row: ' + JSON.stringify(row))
    console.log(value, row, index)
  },
  'click .edit': function (e, value, row, index) {
    alert('You click edit icon, row: ' + JSON.stringify(row))
    console.log(value, row, index)
  },
  'click .remove': function (e, value, row, index) {
    $table.bootstrapTable('remove', {
      field: 'id',
      values: [row.id]
    })
  }
}

function operateFormatter(value, row, index) {
  return [
    '<a rel="tooltip" title="Like" class="table-action like" href="javascript:void(0)" title="Like">',
      '<i class="fa fa-heart"></i>',
    '</a>',
    '<a rel="tooltip" title="Edit" class="table-action edit" href="javascript:void(0)" title="Edit">',
      '<i class="fa fa-edit"></i>',
    '</a>',
    '<a rel="tooltip" title="Remove" class="table-action remove" href="javascript:void(0)" title="Remove">',
      '<i class="fa fa-remove"></i>',
    '</a>'
  ].join('')
}

$(function () {
  $table.bootstrapTable({
    classes: 'table table-hover table-striped',
    toolbar: '.toolbar',

    search: true,
    showRefresh: true,
    showToggle: true,
    showColumns: true,
    pagination: true,
    striped: true,
    sortable: true,
    pageSize: 8,
    pageList: [8, 10, 25, 50, 100],

    formatShowingRows: function (pageFrom, pageTo, totalRows) {
      return ''
    },
    formatRecordsPerPage: function (pageNumber) {
      return pageNumber + ' rows visible'
    }
  })

  $alertBtn.click(function () {
    alert('You pressed on Alert')
  })
})