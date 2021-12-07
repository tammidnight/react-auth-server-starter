const router = require("express").Router();

// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51K43suFBl2fRzim5ZLhTq1q6sl6qHhLO2CR3swyIBpi8I3GHr03w2Dj2mm8ZRXy8V4uFn17i3L5hpiSPrCRrnPZ400Vy5GGNuC"
);

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

router.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports = router;
