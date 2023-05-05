/**
 * !! ATTENTION PLEASE !!
 * Please refer to the documentation at https://developer.bka.sh for information on bKash.
 */
import { createPayment, executePayment, status } from './bkash.entity';
import Bkash from './bkash.functions';

export default async function bkash() {
  const { username, password, appKey, appSecret, isSandbox } = this.config.bkash;
  const bkash = await Bkash.init(username, password, appKey, appSecret, isSandbox);
  console.log(bkash)
  // Routes
  this.route.post('/createPayment', async (req, res) => {
    try {
      const createAgreement = await bkash.createAgreement({
        payerReference: req.body.phone,
        email: req.body.email,
        totalPrice: req.body.totalPrice,
        mode: "0000",
        callbackURL: "localhost:3000",
      });
      res.status(200).send(createAgreement?.bkashURL);
    } catch (error) {
      res.status(500).send('something went wrong');
    }
  });
  // this.route.post('/createPayment'), createPayment({ ...this, bkash });
  this.route.get('/bkash/execute', executePayment({ ...this, bkash }));
  this.route.get('/bkash/status', status({ ...this, bkash }));
}