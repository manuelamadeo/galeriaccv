"use strict";self.addEventListener("install",function(n){self.skipWaiting(),console.log("install",n)}),self.addEventListener("activate",function(n){console.log("activate",n)}),self.addEventListener("pushsubscriptionchange",function(n){console.log("pushsubscriptionchange",n)}),self.addEventListener("push",function(n){n.waitUntil(fetch("https://apiweb.devicepush.com:8081/1.0/lastnotification/YTA2Zi0wMjE5LTA0NjQtYjk1M181YTE4MzgxMzg5MzAyZjExMmU0NGQwNTQ=").then(function(n){if(200!==n.status)throw console.log("Looks like there was a problem. Status Code: "+n.status),new Error;return n.json().then(function(n){var o;return n[0].info.actions&&""!=n[0].info.actions&&(o=JSON.parse([n[0].info.actions])),self.registration.showNotification(n[0].info.title,{body:n[0].info.content,icon:n[0].info.icon,badge:n[0].info.badge,data:n[0].info.data,actions:o,requireInteraction:!0,isClickable:!0})})}))}),self.addEventListener("notificationclick",function(n){n.notification.close();var o;n.notification.data&&""!=n.notification.data&&(o=JSON.parse([n.notification.data]));var t;o&&o[0].action&&o[0].url&&"open"==o[0].action&&(t=o[0].url),void 0!=t?n.waitUntil(clients.matchAll({type:"window"}).then(function(n){n.length>0?(console.log("load clients"),n[0].navigate(t),n[0].focus()):(console.log("load client"),clients.openWindow(t).then(function(n){console.log("Click in Push Notifications"),console.log(n),console.log(t),n.postMessage({msg:"Hey I just got a fetch from you!",url:t},t)}))})):n.action&&console.log(n.action)}),self.addEventListener("notificationclose",function(n){console.log("Click close Push Notifications")}),self.addEventListener("message",function(n){console.log("SW Received Message: "+n.data)});