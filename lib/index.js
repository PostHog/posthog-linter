const preferQResolve = require("./lib/rules/");
import noNewPosthogEvents from "./lib/rules/no-new-posthog-events";

module.exports = {
    rules: {
        "no-new-posthog-events": noNewPosthogEvents,
    },
};