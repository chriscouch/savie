// Init page module object.
const userAccountCreate = {

// Callback that is being called once userAccountEdit is successfully submit.
formSuccessProcessor : ({detail: {formId, requestPayload, responsePayload}}) => {
  // If forms saved successfully and they have success messages, show them.
  // Take the email and password, and use it to log the user in
  const newPayload = {
    email: requestPayload.email,
    password: requestPayload.password
  }

  httpClient.request({path: '/api/tokens', method: 'POST', payload: newPayload})
    .then(({statusCode: newStatusCode, responsePayload: newResponsePayload}) => {
      // Display an error on the form if needed.
      if (newStatusCode !== 200){
        // Set the formError field with the error text
        document.querySelector(`#${formId} .formError`).innerHTML = 'Sorry, an error has occured. Please try again.'
        document.querySelector(`#${formId} .formError`).style.display = 'block'
      } else {
        // If successful, set the token and redirect the user.
        auth.setToken(newResponsePayload)
        window.location = '/catalog/list'
      }
    })
}, // .formSuccessProcessor close
//Check that both passwords entered are the same. 
bindPasswordInput : () => {
  document.getElementById('password2').addEventListener('keyup', (event) => {
    // Stop it from redirecting anywhere
    event.preventDefault()

    var passwordEl = document.getElementById('password')

    // If the first password is valid set the pattern attribute to the password value.
    if(passwordEl.checkValidity()) {
      event.target.setAttribute('pattern', passwordEl.value)
    }
  })
}, // .bindPassword close

// Init user current page.
init : () => {
  // Subscribe to form events.
  document.addEventListener('userAccountCreateFormSuccess', userAccountCreate.formSuccessProcessor)
  userAccountCreate.bindPasswordInput()

}
} //userCreateAccount close
// Call the init processes after the window loads
window.addEventListener('load', userAccountCreate.init);
