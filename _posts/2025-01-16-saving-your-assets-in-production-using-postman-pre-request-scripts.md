---
layout: post
title: Saving Your Ass(ets) in Production using Postman Pre-Request Scripts
date: 2025-01-16 
image: save-ass-prod.jpg
categories: 
  - development
  - tools
tags:
  - postman
  - api-testing
  - devops
---

Ever accidentally fired off a `DELETE` request to production while showing your colleague "how the API works"? 🙈
  
Yeah, me neither *nervous laughter*  

Picture this: It's 4:55 PM on a Friday. You're testing this fancy new endpoint. Spotify shuffle is really vibing with you. Everything's going great. You hit send and... wait. Was that the production environment? *Cold sweat intensifies*

 In that moment, all of your other problems seem to go away. I may or may not be speaking from a recent experience. 

## How to not f**k up?

Thankfully, Postman has support for Pre-Request scripts. Pre-request scripts in Postman are JavaScript code snippets that run before your API request is sent. With these scripts you can check, modify, or validate things before the request goes through.

They have access to Postman's built-in `pm` object, letting you do things like:

```javascript

// Access current environment 
const env = pm.environment.get('variable_name'); 

// Set variables 
pm.environment.set('timestamp', new Date().toISOString()); 

// Read request details 
const method = pm.request.method; 
const headers = pm.request.headers; 

// Modify request data 
pm.request.headers.add({key: 'X-Custom-Header',    value: 'value' });


```

The scripts run in a sandbox environment, so while you can't access Node.js modules, you get all the standard JavaScript functionality plus Postman's own API utilities. Learn more [here](https://learning.postman.com/docs/tests-and-scripts/write-scripts/pre-request-scripts/)

So using this we can cook something that can save our ass:

```javascript

const currentEnv = pm.environment.name?.toLowerCase() || '';
const protectedEnvs = ['prod', 'production', 'staging'];
const dangerousMethods = ['POST', 'DELETE'];

// Check for override in either headers or environment variables
const hasOverride = pm.request.headers.has('X-Allow-Protected-Env') || 
                   pm.environment.get('ALLOW_PROTECTED_ENV') === 'true';

if (protectedEnvs.some(env => currentEnv.includes(env)) && !hasOverride) {
    if (dangerousMethods.includes(pm.request.method)) {
        throw new Error(`${pm.request.method} requests are not allowed in ${currentEnv}`);
    }
}

```

And that's it. Just three arrays and an if statement. Add it to the Pre-Request scripts on your collection and you're done!

## But what if I really want to f**k up?

Well if you're into that kinda thing, no judging. We've got overrides. Just add either:

- A header: `X-Allow-Protected-Env: true`
- Or an environment variable: `ALLOW_PROTECTED_ENV: true`

Still dangerous, but at least you won't accidentally hit any endpoints that make you want to call out for mamma!