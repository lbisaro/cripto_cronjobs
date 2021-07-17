var moment = require('moment'); 
const mongoose = require('mongoose');
const { Schema } = mongoose;

const TickerSchema = new Schema({
    _id: String,
    created: Number,
    updated: Number,
    price: Number,
    perc_1m: Number,
    perc_3m: Number,
    perc_5m: Number,
    perc_15m: Number,
    perc_1h: Number,
    perc_price_vs_ma200: Number,
    flag_1m_ema: String, //'u' Alcista, 'd' Bajista 
    flag_1m_ema_change: String,
    flag_1m_bb: String, //'o' Precio Arriba, 'b' Precio Abajo, 'i' Precio dentro
    flag_1m_bb_change: String,
    prices_1m:  [{_id : false, 
                  dt: Number , 
                  price: Number,
                  ind_ema7: Number,
                  ind_ema14: Number,
                  ind_bb_u: Number,
                  ind_bb_m: Number,
                  ind_bb_l: Number
                }],
    prices_5m:  [{_id : false, 
                  dt: Number , 
                  price: Number,
                  ind_ema7: Number,
                  ind_ema14: Number,
                  ind_bb_u: Number,
                  ind_bb_m: Number,
                  ind_bb_l: Number
                }],
    prices_15m: [{_id : false, 
                  dt: Number , 
                  price: Number,
                  ind_ema7: Number,
                  ind_ema14: Number,
                  ind_bb_u: Number,
                  ind_bb_m: Number,
                  ind_bb_l: Number
                }],
    prices_1h:  [{_id : false, 
                  dt: Number , 
                  price: Number,
                  ind_ma200: Number,
                  ind_ema7: Number,
                  ind_ema14: Number,
                  ind_bb_u: Number,
                  ind_bb_m: Number,
                  ind_bb_l: Number
                }],
});

TickerSchema.statics.getTickerDateTime = function() { 
    //Definiendo el ID (Relacionado al momento en que se obtienen los precios)
    const dateToIdForPrice = moment().subtract(1, 'minute').format('YYYYMMDDHHmm');
    return dateToIdForPrice; 
};

module.exports = mongoose.model('Ticker',TickerSchema);
