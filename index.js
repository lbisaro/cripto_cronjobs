const cron = require('node-cron');
const { db } = require("./util");
const MainCtrl = require("./controllers/MainCtrl").MainCtrl;

var evento = 0;

evento++
MainCtrl.getPrices();
console.log('Evento: ', evento);
//Crontab cada 1 minuto
cron.schedule("* * * * *", () => {
  
  evento++
  MainCtrl.getPrices();
  console.log('Evento: ', evento);
  
  
    

});
