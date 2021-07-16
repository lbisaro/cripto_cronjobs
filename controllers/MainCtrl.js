const Binance = require('node-binance-api');
var TickerCtrl = require("./TickerCtrl").TickerCtrl;
var Log = require('../models/LogMdl');

class MainCtrl {
    static async getPrices() {
        
        /*
            Video sobre variables de entorno para proteger datos confidenciales en el codigo
            https://www.youtube.com/watch?v=U6st9-lNUyY
        */
        const binance = new Binance().options(/*{
        APIKEY: '<key>',
        APISECRET: '<secret>'
        }*/);
        
        
        //Generando el Log
        const logDocId = Log.getDocId();
        let log = await Log.findById(logDocId);
        if (!log) 
        {
            log = await new Log({_id: logDocId});
        }
        const logStart = Log.getLogTime();
        log.daily.push({start: logStart});
        await log.save();

        //Actualizando precios
        let prices = await binance.prices();
        let updated = await TickerCtrl.updatePrices(prices);
        console.log('Prices updated: ',updated);

        //Finalizando log
        const logEnd = Log.getLogTime();
        if (log.daily.length>1)
        {
            const diffLast = Log.compareLast(log._id+''+log.daily[log.daily.length-2].start);
            log.daily[log.daily.length-1].diffLast = (diffLast=='a minute ago'?'OK':diffLast);
        }
        log.daily[log.daily.length-1].end = logEnd;
        log.daily[log.daily.length-1].tickersUpdated = updated.tickersUpdated;

        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        log.daily[log.daily.length-1].memory = `Used ${Math.round(used * 100) / 100} MB`;

        await log.save();

        await Log.deleteMany({_id:{$lt:logDocId}});
        /*
        const https = require('http');
        const options = {
          hostname: '127.0.0.1',
          port: 3000,
          path: '/dbUpdated',
          method: 'GET'
        };

        const req = https.request(options, res => {
          console.log(`statusCode: ${res.statusCode}`);

          res.on('data', d => {
            //OK
          })
        });

        req.on('error', error => {
          console.error(error);
        });


        req.end();
        */
        
    }
}
module.exports = { MainCtrl };
