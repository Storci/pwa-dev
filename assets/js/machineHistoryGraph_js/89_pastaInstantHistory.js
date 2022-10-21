// Carica le funzioni globali
import * as tw from "../Global/Thingworx/thingworx_api_module.js"
import * as am from "../Global/amchart/amchart_functions.js"
import * as fb from "../Global/Firebase/firebase_auth_module.js"
import * as lang from "../Global/Common/Translation.js"
import * as common from "../Global/Common/commonFunctions.js"

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)

// Recupera l'entity name della thing
// Recupera l'entity name della thing
// Recupera l'entity name della thing
let entityName = urlParams.get('entityName')
let timeStartZoom = urlParams.get('timeStart')
console.log(timeStartZoom)
let timeEndZoom = urlParams.get ('timeEnd')
console.log(timeEndZoom)
// Istanzia i grafici dell'attuale e d

let arrayUM = ['Produzione (kg/h)', 'Pressione Estrusore (Bar)']
let chartActualProduction = am.createXYChart("IDTrendActualProduction", 'IDLegendActualProduzione', 5, 6, arrayUM)
let chartHistoryProduction = am.createXYChart("IDTrendHistoryProduction", 'IDLegendHistoryProduction', 5, 6, arrayUM)
// Crea le series da visualizzare sul grafico
am.createLineSeries(chartHistoryProduction, "PV - Impasto", "time", "PV_Impasto", "kg/h", 5, false, true, true)
am.createLineSeries(chartHistoryProduction, "SP - Impasto", "time", "SP_Impasto", "kg/h", 5, false, true)
am.createLineSeries(chartHistoryProduction, "PV - Pressione", "time", "PV_Pressione", "Bar", 5, false, false)
am.createLineSeries(chartHistoryProduction, "PV - Temperatura Camera", "time", "PV_Temp_Camera", "°C", 5, false, false)
am.createLineSeries(chartHistoryProduction, "PV - Portata Vapore", "time", "PV_Portata_Vapore", "°C", 5, false, false)
// Crea le series da visualizzare nel grafico

// Ricalcola la dimensione del div della legenda - viene eseguito ogni secondo
setInterval(am.refreshLegendSize, 1000, chartHistoryProduction, 'IDLegendHistoryProduction')

// Definisce la query da inviare a influxdb
// I parametri da sostituire sono indicati da {1}, {2}, ecc...
// Invece l'entityName è sempre comune per tutte le query
let query  = 'SELECT '
query += 'mean("Impasto_PV_Impasto_Totale") as "PV_Impasto", '
query += 'mean("Impasto_SP_Impasto_Totale") as "SP_Impasto", '
query += 'mean("Pressa_Motori_Estrusore_PV_Pressione") as "PV_Pressione", '
query += 'mean("Pasta_Instant_PV_Temperatura_Camera") as "PV_Temp_Camera", '
query += 'mean("Pasta_Instant_PV_Portata_Vapore") as "PV_Portata_Vapore" '
query += 'FROM "' + entityName + '" '
query += 'WHERE time > '+ timeStartZoom + 'ms and time < '+ timeEndZoom + 'ms GROUP BY time(10s) fill(previous)'

// ******************** STORICO PRODUZIONI ********************
common.actualLineProduction(chartHistoryProduction, query, entityName)
