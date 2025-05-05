// Carica le funzioni globali
import * as tw from "./Global/Thingworx/thingworx_api_module.js"
import * as am from "./Global/amchart/amchart_functions.js"
import * as fb from "./Global/Firebase/firebase_auth_module.js"
import * as lang from "./Global/Common/Translation.js"
import * as common from "./Global/Common/commonFunctions.js"
import * as theme from "./Global/Common/Theme.js"

theme.changeColorTheme()

// definisce l'url di base della pagina attuale (in questo caso della pagina index.html).
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)


// Recupera dei dati dalle local storage
let selectedCustomer = localStorage.getItem("global_selected_customer")
let selectedLine = localStorage.getItem("global_selected_cell")
//let entityName			 = localStorage.getItem('global_selected_cell_entityName')



let entityName = urlParams.get('entityName')
console.log(entityName)
let timeStartZoom = urlParams.get('timeStart')
console.log(timeStartZoom)
let timeEndZoom = urlParams.get('timeEnd')
console.log(timeEndZoom)


let arrayUM = ['Essicazione', 'Calorie']
let chartHistoryProduction = am.createXYChart("IDTrendHistoryProduction", 'IDLegendHistoryProduction', 0, 2, arrayUM)
// Crea le series da visualizzare sul grafico
am.createLineSeries(chartHistoryProduction, "PV - Temperature Ambient", "time", "PV_Temperatura_Ambiente", "°C", 0, false, true)
am.createLineSeries(chartHistoryProduction, "PV - Temperature", "time", "PV_Temperatura_Cella", "°C", 0, true, false, true)
am.createLineSeries(chartHistoryProduction, "SP - Temperature", "time", "SP_Temperatura_Cella", "°C", 0, false, false)
am.createLineSeries(chartHistoryProduction, 'PV - Humidity Ambient', 'time', 'PV_Umidita_Ambiente', '%H', 0, false, true)
am.createLineSeries(chartHistoryProduction, 'PV - Humidity', 'time', 'PV_Umidita_Cella', '%H', 0, true, false)
am.createLineSeries(chartHistoryProduction, 'SP - Humidity', 'time', 'SP_Umidita_Cella', '%H', 0, false, false)
am.createLineSeries(chartHistoryProduction, 'PV - kcal/h', 'time', 'PV_Consumo_Ciclo', 'kcal', 1, false, true)

// Ricalcola la dimensione del div della legenda - viene eseguito ogni secondo
setInterval(am.refreshLegendSize, 1000, chartHistoryProduction, 'IDLegendHistoryProduction')

// Definisce la query da inviare a influxdb
// I parametri da sostituire sono indicati da {1}, {2}, ecc...
// Invece l'entityName è sempre comune per tutte le query
let query = 'SELECT '
query += 'mean("Dati_Aggiuntivi_Temperatura_Ambiente") as "PV_Temperatura_Ambiente", '
query += 'mean("Dati_Ciclo_Temperatura_PV") as "PV_Temperatura_Cella", '
query += 'mean("Dati_Ciclo_Temperatura_SP") as "SP_Temperatura_Cella", '
query += 'mean("Dati_Aggiuntivi_Umidita_Ambiente") as "PV_Umidita_Ambiente", '
query += 'mean("Dati_Ciclo_Umidita_PV") as "PV_Umidita_Cella", '
query += 'mean("Dati_Ciclo_Umidita_SP") as "SP_Umidita_Cella", '
query += 'mean("Dati_Aggiuntivi_Kcal_Ciclo") as "PV_Consumo_Ciclo" '
query += 'FROM "' + entityName + '" '
query += 'WHERE time > ' + timeStartZoom + 'ms and time < ' + timeEndZoom + 'ms GROUP BY time(10s) fill(previous)'
console.log(query)

// ******************** STORICO PRODUZIONI ********************
common.actualDryerProduction(chartHistoryProduction, query, entityName)

$('#backToPrev').click(function () {
    //let url ='60_cellGrapHistory.html?'+'entityName='+ entityName  +'&timeStart=' + timeStartZoom  + '&timeEnd=' + timeEndZoom
    let url = './32_dryer_dashboard.html?' + 'entityName=' + entityName
    window.open(url, '_blank')
})
