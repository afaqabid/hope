import express from "express";

const app = express();
const port = 19000;
const PUBLISHABLE_KEY = "pk_test_51MYieUJyFWW0XhyN6ZLddGK5LcjcVneltxGF3WyqTQMKOXUaFJX8TYmX1GPWv8cahXhhkKYHUbF3XOnOuVnT9wpP00Z0QWaasG";
const SECRET_KEY = "sk_test_51MYieUJyFWW0XhyNjxWnG6seZ4I3oggNko8skNxZSyXbs5mwBvlcvZnEVO9Dxg4PJUiRB6WllIlGnGAhqs1ymPBo00OAu83ZsK";
import Stripe from "stripe";

const stripe = Stripe(SECRET_KEY, { apiVersion: "2022-11-15" });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099, //lowest denomination of particular currency E>g. 10 dollar 99 cents
      currency: "usd",
      payment_method_types: ["card"], //by default
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});
