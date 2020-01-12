/**
 * Frontend logic for application.
 */

// Container for frontend application.
const app = {

  // Bind the logout button.
  bindLogoutButton : () => {
    document.getElementById('logoutButton').addEventListener('click', (event) => {
      // Stop it from redirecting anywhere
      event.preventDefault()
      // Log the user out
      auth.logUserOut(httpClient).then(() => {
        window.location = '/'
      })
    })
  },

  // Set (or remove) the loggedIn class from the body.
  setLoggedInClass : (isLoggedIn) => {
    const target = document.querySelector('body')
    if (isLoggedIn) {
      target.classList.remove('loggedOut')
      target.classList.add('loggedIn')
    } else {
      target.classList.remove('loggedIn')
      target.classList.add('loggedOut')
    }
  },

  // Draw shopping cart counter details on the page.
  drawShoppingCartCounter : (shoppingCart) => {
    const totalItems = shoppingCart.items && shoppingCart.items.length ? shoppingCart.items.reduce((acc, item) => acc + item.quantity, 0) : 0
    const shoppingCartCounter = document.getElementById('shoppingCartCounter')
    shoppingCartCounter.innerHTML = `${totalItems}`
  },
  
  // Set up the Materialize modals. 
  bindModals : () =>{ 
      var elems = document.querySelectorAll('.modal')
      M.Modal.init(elems,{
          opacity: 0.9,
          inDuration: 50,

          // We are only allowing one open modal at a time. Close any open modals just before the new one opens. 
          onOpenStart: (el) => {
            //Look for any open modals
            var openModal = document.querySelector('div.modal.open')
            
              if (!!openModal) {
                var openElem = M.Modal.getInstance(openModal)

                // Override the modal configuration so the user doesn't see a weird screen flash. 
              M.Modal.init(openElem, {
                opacity: 0.9,
                outDuration: 0
              })

              //Close the open modal
              openElem.close()
            }
          }
      })
  }, //bindModals

  bindModalFormLink : () => {
    const elem = document.getElementById('modal-form-link')

    elem.addEventListener('click', (e) => {
      const instance = M.Modal.getInstance(document.getElementsByClassName('modal open'))
      M.Modal.init(instance, {
        opacity: 0.9,
        inDuration: 0
      })
      instance.close()
    })
  }, //bindModalFormLink close

  // Init (bootstrapping).
  init : () => {
    // Get the token.
    const token = auth.getToken()
    app.setLoggedInClass(!!token)
    if (token) {
      // Set token to the http client default headers.
      httpClient.defaults.headers = {token: token.id}

      // Get shopping cart and update shopping cart number of items.
      shoppingCart.getCart(httpClient)
        .then((shoppingCart) => {
          app.drawShoppingCartCounter(shoppingCart)
        })
    }

    // Bind logout button.
    app.bindLogoutButton()

    // Bind all form submissions.
    formProcessor.bindForms(httpClient)
    app.bindModals()
  }
} //app close
// Call the init processes after the window loads.
window.addEventListener('load', app.init);
