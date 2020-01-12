// Init page module object.
const userSessionCreate = {

// Callback that is being called once userAccountEdit is successfully submit.
formSuccessProcessor : ({detail: {formId, requestPayload, responsePayload}}) => {
  // If forms saved successfully and they have success messages, show them.
  auth.setToken(responsePayload)
  window.location = '/catalog/list'
},

// Init user current page.
init : () => {
  // Subscribe to form events.
  document.addEventListener('userSessionCreateFormSuccess', userSessionCreate.formSuccessProcessor)
}
}
// Call the init processes after the window loads
window.addEventListener('load', userSessionCreate.init);

