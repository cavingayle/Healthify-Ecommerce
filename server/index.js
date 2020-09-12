require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const stripe = require("stripe")(process.env.SECRET_KEY);

const authCtrl = require("./authController");
const productCtrl = require("./productController");
const cartCtrl = require("./cartController");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/../build`));

const { SESSION_SECRET, CONNECTION_STRING, SERVER_PORT } = process.env;

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 48 },
    secret: SESSION_SECRET,
  })
);

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then((db) => {
  app.set("db", db);
  console.log("Db is now connected");
});

// ENDPOINTS

//Auth Endpoints
app.post("/register", authCtrl.register);
app.post("/login", authCtrl.login);
app.post("/logout", authCtrl.logout);
app.get("/user", authCtrl.getUser);

// Product Endpoints
app.get("/api/products", productCtrl.getProducts);
app.get("/api/products/:id", productCtrl.getProduct);
app.post("/api/products", productCtrl.addProduct);
app.put("/api/products/:id", productCtrl.editProduct);
app.delete("/api/products/:id", productCtrl.deleteProduct);

// CART Endpoints
app.get("/cart", cartCtrl.getCart);
app.post("/cart/", cartCtrl.addToCart);
app.delete("/cart/:id", cartCtrl.deleteFromCart);
app.put("/incqty", cartCtrl.increaseCartQuantity);
app.put("/decqty", cartCtrl.decreaseCartQuantity);
app.delete("/clearcart", cartCtrl.clearCart);

// Stripe
app.post("/api/payment", function (req, res, next) {
  //convert amount to pennies
  const amountArray = req.body.amount.toString().split("");
  const pennies = [];
  for (var i = 0; i < amountArray.length; i++) {
    if (amountArray[i] === ".") {
      if (typeof amountArray[i + 1] === "string") {
        pennies.push(amountArray[i + 1]);
      } else {
        pennies.push("0");
      }
      if (typeof amountArray[i + 2] === "string") {
        pennies.push(amountArray[i + 2]);
      } else {
        pennies.push("0");
      }
      break;
    } else {
      pennies.push(amountArray[i]);
    }
  }
  const convertedAmt = parseInt(pennies.join(""));

  const charge = stripe.charges.create(
    {
      amount: convertedAmt, // amount in cents, again
      currency: "usd",
      source: req.body.token.id,
      description: "Test charge from react app",
    },
    function (err, charge) {
      if (err) return res.sendStatus(500);
      return res.sendStatus(200);
      // if (err && err.type === 'StripeCardError') {
      //   // The card has been declined
      // }
    }
  );
});

app.listen(SERVER_PORT, () =>
  console.log(`Server is now running on port ${SERVER_PORT}`)
);
