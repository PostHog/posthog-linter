/**
 * @fileoverview Dont allow for new posthog events
 * @author rick
 */
 "use strict";

 //------------------------------------------------------------------------------
 // Requirements
 //------------------------------------------------------------------------------
 
 const rule = require("../../../lib/rules/posthog-new-events"),
   RuleTester = require("eslint").RuleTester;
 
 
 //------------------------------------------------------------------------------
 // Tests
 //------------------------------------------------------------------------------
 
 const ruleTester = new RuleTester({
   settings: {
     "posthog": {
        "api_key": "phx_TBWDzSZScTcrwiOa2V03eDcztrDm3TESXCmBsliripC",
        "base_url": "https://api.posthog.com",
        "project_id": 1
     } 
   }
 });
 ruleTester.run("posthog-events", rule, {
   valid: [
     // give me some code that won't trigger a warning
   ],
 
   invalid: [
     {
       code: "posthog.capture('new event')",
       errors: [{ message: "Fill me in.", type: "Me too" }],
     },
     {
       code: "something something posthog.capture('new event')",
       errors: [{ message: "Fill me in.", type: "Me too" }],
     },
     {
       code: "posthog.capture('new event')",
       errors: [{ message: "Fill me in.", type: "Me too" }],
     },
   ],
 });
 