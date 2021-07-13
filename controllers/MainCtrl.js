const Binance = require('node-binance-api');

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
        const TickerCtrl = require("./TickerCtrl").TickerCtrl;
        
        //Generando el Log
        const Log = require('../models/LogMdl');
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
        await log.save();


        
        
    }
}
module.exports = { MainCtrl };
