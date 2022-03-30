
 "use strict";

 //------------------------------------------------------------------------------
 // Rule Definition
 //------------------------------------------------------------------------------
 
const GET_FAILURE_REASON_NEW_EVENT = (eventName) =>`Event with name, ${eventName}, does not exist in PostHog.`
const GET_FAILURE_REASON_NEW_PROPERTY = (eventName, eventProperty) =>`Event with name, ${eventName}, has never seen the property ${eventProperty}.`

 /**
  * @type {import('eslint').Rule.RuleModule}
  */
 module.exports = {
   meta: {
     type: null, // `problem`, `suggestion`, or `layout`
     docs: {
       description: "Dont allow for new posthog events",
       category: "Fill me in",
       recommended: false,
       url: null, // URL to the documentation page for this rule
     },
     fixable: null, // Or `code` or `whitespace`
     schema: [], // Add a schema if the rule has options
   },
 
   create(context) {
     const posthogSettings = context.settings?.posthog
     if (!posthogSettings){
       throw('Must include posthog settings in eslint config')
     } if(!posthogSettings.api_key){
        throw('Must include posthog api_key in eslint config')
     } if(!posthogSettings.base_url){
        throw('Must include posthog base_url in eslint config')
    }  if(!posthogSettings.project_id){
      throw('Must include posthog project_id in eslint config')
  }
     // variables should be defined here
 
     //----------------------------------------------------------------------
     // Helpers
     //----------------------------------------------------------------------
    
    const isPosthogCapture = (node) => {
      if (
        node.callee.type === 'MemberExpression' 
        && node.callee.object.name === 'posthog' 
        && node.callee.property.name === 'capture'
      ){
        if (node.arguments.length === 1){
          return typeof node.arguments[0].value === 'string'
        }
        if (node.arguments.length >= 2){
          return (
            typeof node.arguments[0].value === 'string'
            && typeof node.arguments[1].value === 'object'
          )
        }
      }
      return false
    }

    const parseCaptureArguments = (node) => {
      const args = {}
      if (node.arguments.length >= 1){
        args.eventName = node.arguments[0].value
      } 
      if (node.arguments.length >= 2){
        args.properties = node.arguments[1].value
      } 
      return args
    }

    const fetchPosthogEventDefinition = async (captureArgs) => {
      const url = `${posthogSettings.base_url}/api/projects/${posthogSettings.project_id}/events?event=${args.eventName}&limit=1&personal_api_key=${posthogSettings.api_key}`
      
      const response = await fetch(url);
      if(response.status !== 200){
        throw new Error(`Posthog event definition fetch failed with status code ${response.status}`)
      }
      const json = await response.json();

      if(json.results.length === 0){
        return null
      }
      else{
        return json.results[0]
      }
    }

     // any helper functions should go here or else delete this section
 
     //----------------------------------------------------------------------
     // Public
     //----------------------------------------------------------------------
 
     return {
       CallExpression(node) {
        if (isPosthogCapture(node)){
          const args = parseCaptureArguments(node)
          const eventDefinition = fetchPosthogEventDefinition(args)
          if(eventDefinition === null){
            context.report({
              node,
              message: GET_FAILURE_REASON_NEW_EVENT(args.eventName),
            })
          }
        }
       }
     };
   },
 };
 