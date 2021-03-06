const cron = require('node-cron');
require('./database');

const MainCtrl = require("./controllers/MainCtrl").MainCtrl;

/**
 * Argumentos para ejecutar el script
 * 
 * node index.js --nocron 
 * Ejecuta una unica lectura de datos en Binance.com y la registra
 * 
 * node index.js
 * Ejecuta la lectura en Binance.com y registra datos en el segundo #55 de cada minuto
 * 
 * 
 * En el server de produccion, configurar el cron para que ejecute con el argumento --nocron
 * 
 */
const fs = require('fs');

var args = process.argv.slice(2);
const main = async() => {
  await MainCtrl.getPrices();
  process.exit();
}
var dt;
if (args[0] == '--nocron'){
  dt = new Date;
  console.log(dt.toString());
  main();  
}
else {
  /*
   * Crontab cada 1 minuto, en el segundo numero 55 
   * (Al final de cada minuto para tener casi el ultimo precio)
   */
  cron.schedule("55 * * * * *", () => {
    dt = new Date;
    console.log(dt.toString());
    MainCtrl.getPrices();
  });
}


