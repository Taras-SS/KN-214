require(`dotenv`).config();
const fs = require(`fs`);
const axios = require(`axios`);
const sha1 = require(`sha1`);
let order_id = JSON.parse(fs.readFileSync(`./config/orderId.json`));
order_id = Number(order_id.id) - 1;

module.exports = (res) => {

    const html = JSON.stringify({
        'public_key'     : process.env.PAY_PUBLIC_KEY,
        'action'         : 'status',
        'order_id'       : order_id.id,
        'version'        : '3'
    });

    let buff = new Buffer(html);
    let data = buff.toString('base64');

    const hash_binary = sha1(
        process.env.PAY_PRIVATE_KEY +
        data +
        process.env.PAY_PRIVATE_KEY, {asString: true});
    const sign = new Buffer(hash_binary, 'binary');

    let buff2 = new Buffer(sign);
    let signature = buff2.toString('base64');

    axios.post('https://www.liqpay.ua/api/request', {
        data: data,
        signature: signature
    })
        .then( response => {
            if(response.data.status != `success`){
                res.redirect(`/main`);
            }else{

            }
        })
        .catch(error => {
            console.log(error);
        });

}