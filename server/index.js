require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const twilio = require('twilio'); 

const massive = require("massive");
const session = require("express-session");
const stripe = require("stripe")(process.env.SECRET_KEY);


const nodemailer = require('nodemailer');
const creds = require('./config')

// NodeMailer




// Controllers
const authCtrl = require("./authController");
const productCtrl = require("./productController");
const cartCtrl = require("./cartController");


//Middleware


app.use(express.json());
app.use(express.static(`${__dirname}/../build`));

const { SESSION_SECRET, CONNECTION_STRING, SERVER_PORT,  } = process.env;

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 48 },
    secret: SESSION_SECRET,
  })
);


// Massive

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then((db) => {
  app.set("db", db);
  console.log("Db is now connected");
});

// ENDPOINTS



// TWILIO

//twilio requirements -- Texting API 
const accountSid = 'ACe0178ffed83a44e52bda284ab98da709';
const authToken = '10e90b5699b232d182e63a3418fa8082'; 
const client = new twilio(accountSid, authToken);


app.use(cors()); //Blocks browser from restricting any data

//Welcome Page for the Server 

//Twilio 
app.post('/send-text', (req, res) => {    
    const { textmessage } = req.body;

console.log( textmessage)
    //Send Text
    client.messages.create({
        body: textmessage,
        to: "+1" + +creds.num,  // Text this number
        from: '+12029727634' // From a valid Twilio number
    }).then((message) => console.log(message.body));
    res.send('Hello to the Twilio Server')

})


// NODEMAILER!!

const transport = {
  host: 'smtp.gmail.com',
  auth: {
    user: creds.USER,
    pass: creds.PASS
  }
}

const transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('All works fine, congratz!');
  }
});

app.post('/send', (req, res, next) => {
  const { name, message } = req.body
  // const email = req.body.email
  // const content = `name: ${name} \n email: ${email} \n message: ${message} `

  const mail = {
    from: name,
    to: 'cavingayle@gmail.com',  //Change to email address that you want to receive messages on
    subject: 'New Message from Contact Form',
    html: message
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail'
      })
    } else {
      res.json({
        msg: 'success'
      })
    }
  })
})


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
  for (let i = 0; i < amountArray.length; i++) {
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
