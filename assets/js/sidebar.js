// Carica le funzioni globali
import * as tw from "./Global/Thingworx/thingworx_api_module.js"

let entityName = localStorage.getItem('global_entityName')
// Recupera l'url della pagina visualizzata
// Effettua uno split dell'url recuperato dividendo la stringa tramite lo /
// recupera il nome della pagina
let pageURL = window.location.href
pageURL = pageURL.split('\/')
let pageName = pageURL[pageURL.length-1]

// Recupera i dati generali delle celle installate dal cliente
tw.service_90_sidebar(entityName)
.then(res => {
  try{
    // Controlla se sono presenti delle celle
    if(JSON.stringify(res.dryers) !== '[]'){
      // Recupera l'id dell'elemento accordion delle celle.
      // L'accordion è gia presente nella sidebar, è nascosto tramite la classe d-none
      // Se un cliente ha una cella, il codice sottostante elimina la classe d-none
      let idAccordion = '#id-accordion-dryers'

      // Visualizza il menu delle celle
      $(idAccordion).removeClass('d-none')

      // Visualizza le celle presenti dal cliente.
      // Nella sidebar sono presenti 16 celle, nascoste tramite la classe d-nome
      // Modifica l'href da richiamare quando si preme il pulsante del menu
      // ref deve passare alla pagina 30_Dryer_Dashboard.html l'entityName della cella
      // In questo modo la pagina riesce a recuperare i dati dalla cella corretta
      for(let i=1; i<=res.dryers.length; i++){
        let href = '32_dryer_dashboard.html?entityName=' + res.dryers[i-1].entityName
        let id_nav_dryer = '#id-nav-dryer-' + i
        let nav_link = id_nav_dryer + ' a'
        let span_status = id_nav_dryer + ' a :last-child'

        $(span_status).text(res.dryers[i-1].status)

        $(id_nav_dryer).removeClass('d-none')
        $(nav_link).attr('href', href)

        if(pageName == href){ $(nav_link).addClass('active') }
      }
    }
  }catch(e){
    console.error(e)
  }

  try{
    // Controlla se sono presenti delle celle
    if(JSON.stringify(res.lines) !== '[]'){
      // Visualizza le celle presenti dal cliente.
      // Nella sidebar sono presenti 16 celle, nascoste tramite la classe d-nome
      // Modifica l'href da richiamare quando si preme il pulsante del menu
      // ref deve passare alla pagina 30_Dryer_Dashboard.html l'entityName della cella
      // In questo modo la pagina riesce a recuperare i dati dalla cella corretta
      for(let i=1; i<=res.lines.length; i++){
        // Recupera l'id dell'elemento accordion delle celle.
        // L'accordion è gia presente nella sidebar, è nascosto tramite la classe d-none
        // Se un cliente ha una cella, il codice sottostante elimina la classe d-none
        let idAccordion = '#id-accordion-line-' + i

        // Visualizza il menu delle celle
        $(idAccordion).removeClass('d-none')

        let href_dashboard = '40_line_dashboard.html?entityName=' + res.lines[i-1].entityName
        let href_history = '41_line_history.html?entityName=' + res.lines[i-1].entityName

        let id_nav_dashboard_line = '#id-nav-dashboard-line-' + i
        let id_nav_history_line   = '#id-nav-history-line-' + i
        let nav_dashboard_link    = id_nav_dashboard_line + ' a'
        let nav_history_link      = id_nav_history_line + ' a'
        let idBtnAccordion        = '#id-btn-accordion-line-' + i
        let span_status           = id_nav_dashboard_line + ' a :last-child'

        $(nav_dashboard_link).attr('href', href_dashboard)
        $(nav_history_link).attr('href', href_history)

        $(span_status).text(res.lines[i-1].status)

        if(pageName == href_dashboard){
          $(idBtnAccordion).trigger('click')
          $(nav_dashboard_link).addClass('active')
        }

        if(pageName == href_history){
          $(idBtnAccordion).trigger('click')
          $(nav_history_link).addClass('active')
        }
      }
    }
  }catch(e){
    console.error(e)
  }
})
.catch(err => console.error(err))

setInterval(refreshStatus, 10000, entityName)

function refreshStatus(entityName){
  // Recupera i dati generali delle celle installate dal cliente
  tw.service_90_sidebar(entityName)
  .then(res => {
    // Controlla se sono presenti delle celle
    if(JSON.stringify(res.dryers) !== '[]'){
      for(let i=1; i<=res.dryers.length; i++){
        let span_status = '#id-nav-dryer-' + i + ' a :last-child'
        $(span_status).text(res.dryers[i-1].status)
      }
    }

    if(JSON.stringify(res.lines) !== '[]'){
      for(let i=1; i<=res.lines.length; i++){
        let span_status = '#id-nav-dashboard-line-' + i + ' a :last-child'
        $(span_status).text(res.lines[i-1].status)
      }
    }
  })
  .catch(err => console.error(err))
}
