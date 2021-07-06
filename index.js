const cron = require('node-cron');
const { db } = require("./util");
const MainCtrl = require("./controllers/MainCtrl").MainCtrl;

//MainCtrl.getPrices();
//process.exit();

/*
  Crontab cada 1 minuto, en el segundo numero 55 
  (Al final de cada minuto para tener casi el ultimo precio)
  */
cron.schedule("55 * * * * *", () => {
  let dt = new Date;
  console.log(dt.toString());
  MainCtrl.getPrices();
});
