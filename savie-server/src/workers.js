/*
* worker related tasks
*
*/ 

//Dependencies

const path = require("path")
const fs = require("fs")
const _data = require("./data")
const https = require("https")
const http = require("http")
const helpers = require("./helpers")
const url = require("url")

const workers = {
   
   //Look up all services and send to the validator
   gatherAllServices: () => {
      //Get all services that exist
      _data.list("services", (err, services) => {
         if(!err && services && services.length > 0){
            services.forEach((service) => {
               //Read the servie data 
               _data.read("services", service, (err, originalServiceData) => {
                  if(!err && originalServiceData){
                     //Pass the service data to the validator
                     workers.validateServiceData(originalServiceData)
                  } else
                  console.log("Error: reading one of the services data")
               })

            })

         }else {
            console.log("Error: Could not find any services to process.")
         }
      })
   }, //workers.gatherAllServices close
   
   // Sanity check the service data
   //@TODO: add other relevant checks. Do we need the ones that are here?
   validateServiceData: (originalServiceData) => {
      originalServiceData = typeof(originalServiceData) == "object" && originalServiceData !== null ? originalServieData : {}
      origianlServiceData.id = typeof(originalServieData.id) == "string" && originalServiceData.id.trim().length == 20 ? originalServiceData.id.trim() : false
      origianlServiceData.userPhone = typeof(originalServieData.userPhone) == "string" && originalServiceData.userPhone.trim().length == 10 ? originalServiceData.userPhone.trim() : false
      origianlServiceData.protocol = typeof(originalServieData.protocol) == "string" && ["http", "https"].indexOf(originalServiceData.protocol) > -1 ? originalServiceData.protocol.trim() : false

      //Set the keys that may not be set if workers have never seen this service before
      originalServiceData.state = typeof(originalServieData.state) == "string" && ["up", "down"].indexOf(originalServiceData.state) > -1 ? originalServiceData.state.trim() : "down"
      originalServiceData.lastChecked = typeof(originalServiceData.lastChecked) == "number" && originalServiceData.lastChecked > 0 ? originalServiceData.lastChecked : false 

      // If all the checks pass, pass the data along to the next task
      if(originalServiceData.id &&
         originalServiceData.userPhone &&
         originalServiceData.protocol) {

            workers.performServiceCheck(originalServiceData)

         }else {
            console.log("Error: one of the service checks is not properly formatted. Skipping.")
         }
   }, //workers.validateServiceData close

   // Perform a check on the Services 
   performServiceCheck: (originalServiceData) => {
      //Prepare the initial check outcome
      const checkOutcome ={
         "error" : false,
         "responseCode" : false
      }

      // Mark that the outcome has not been sent yet
      const outcomeSent = false

      // Parse the hostname and path from the originalServiceData
      const parsedUrl = url.parse(originalServiceData.protocol+"://"+originalServiceData.url, true)
      const hostName = paredUrl.hostname
      const path = parsedUrl.path //Using path not pathname because we want the query string

      // Construct the request
      const requestDetails ={
         "protocol" : originalServiceData.protocol+":",
         "hostname" : hostName, 
         "method" : originalServiceData.method.toUpperCase(),
         "path" : path
      }

      // Instantiate request object
      const _moduleToUse = originalServiceData.protocol == "http" ? http : https
      const req = _moduleToUse(requestDetails, (req) => {

      })
   }, //workers.performServiceCheck close

   loop: () => {
      setInterval(()=>{
         workers.gatherAllServices()
      }, 1000 * 60)
   },


   init: () => {
      //execute services checks 
      workers.gatherAllServices()

      //Launch loop for services logic
      workers.loop()
   }

}

module.exports = workers