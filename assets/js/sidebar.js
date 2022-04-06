// Carica le funzioni globali
import * as tw from "./Global/Thingworx/thingworx_api_module.js"
/*
try{
  let entityName = localStorage.getItem('global_entityName')


  // Recupera i dati generali delle linee installate dal cliente
  tw.service_02_getLinesGeneralInfo(entityName)
  .then(res => {
    if(JSON.stringify(res) !== '{}'){
      res.array.forEach((item, i) => {
        // Recupera l'url della pagina visualizzata
        // Effettua uno split dell'url recuperato dividendo la stringa tramite lo /
        // recupera il nome della pagina
        let pageURL = window.location.href
        pageURL = pageURL.split('\/')
        let pageName = pageURL[pageURL.length-1]

        // Calcola il numero della linea, somma 1 all'indice del for
        let num = i + 1

        // Recupera l'id dell'elemento accordion della linea.
        // L'accordion è gia presente nella sidebar, è nascosto tramite la classe d-none
        // Se un cliente ha una linea, il codice sottostante elimina la classe d-none
        let idacc = '#accordionLine0' + num
        $(idacc).removeClass('d-none')

        // Modifica l'href da richiamare quando si preme il pulsante del menu
        // ref deve passare alla pagina 04_Line.html l'entityName della linea
        // In questo modo la pagina riesce a recuperare i dati dalla linea corretta
        let href = '04_Line.html?entityName=' + item.entityName
        let idnav = '#nav-line0' + num + '-dashboard'
        $(idnav).attr('href', href)


        if(pageName == href){
          $(idnav).addClass('active')
          $(idnav).attr('href', '#')


          accordionButtonClass = 'accordion-button'
          aria_expanded = "true"
          panelCollapse = 'accordion-collapse collapse show'

        }
      })
    }
  })
}catch(e){}
*/


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

          $(nav_dashboard_link).attr('href', href_dashboard)
          $(nav_history_link).attr('href', href_history)

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
