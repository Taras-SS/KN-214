require(`dotenv`).config();
const LiqPay = require('liqpay');
const sha1 = require(`sha1`);
const fs = require(`fs`);

module.exports = price => {
    const order_id = JSON.parse(fs.readFileSync(`./config/orderId.json`));
    const liqpay = new LiqPay(process.env.PAY_PUBLIC_KEY, process.env.PAY_PRIVATE_KEY);
    const html = JSON.stringify({
        'public_key'     : process.env.PAY_PUBLIC_KEY,
        'action'         : 'pay',
        'amount'         : price,
        'currency'       : 'UAH',
        'description'    : 'Оплата замовалення',
        'version'        : '3',
        'language'       : 'uk',
        'order_id'       : order_id.id,
        'server_url'     : process.env.HOST + `/completed`,
        'result_url'     : process.env.HOST + `/completed`
    });

    fs.writeFileSync(`./config/orderId.json`, JSON.stringify({id: Number(order_id.id) + 1}));

    let buff = new Buffer(html);
    let data = buff.toString('base64');

    const hash_binary = sha1(
        process.env.PAY_PRIVATE_KEY +
        data +
        process.env.PAY_PRIVATE_KEY, {asString: true});
    const sign = new Buffer(hash_binary, 'binary');

    let buff2 = new Buffer(sign);
    let signature = buff2.toString('base64');

  /*  return {
        data: "eyJwdWJsaWNfa2V5IjoiaTI4Mjc5MjkzNjk2IiwiYWN0aW9uIjoicGF5IiwiYW1vdW50IjoiMSIsImN1cnJlbmN5IjoiVUFIIiwiZGVzY3JpcHRpb24iOiJkZXNjcmlwdGlvbiB0ZXh0IiwidmVyc2lvbiI6IjMiLCJsYW5ndWFnZSI6InVrIiwicmVzdWx0X3VybCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9jb21wbGV0ZWQifQ==",
        signature: "aCVYHqEpueHbwyS+SG8yrKMcBkw="
    } */

  return {
      data: data,
      signature: signature
  }

}