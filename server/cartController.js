module.exports = {
  getCart: async (req, res) => {
    const db = req.app.get("db");
    const { customer_id } = req.session.user;
    const cart = await db.cart.get_cart(customer_id);
    if (!cart) {
      res.sendStatus(204);
    } else {
      res.status(200).send(cart);
    }
  },
  // First checks to see if product is in cart
  //if it is, it will only increase the quantity by one
  //if it is not it will add it to the cart
  addToCart: async (req, res) => {
    const db = req.app.get("db");
    const { customer_id } = req.session.user;
    const { id } = req.body;
    if (req.session.user) {
      console.log(customer_id, id)
      const [check] = await db.cart.check_cart([customer_id, id])
      if (check) {
        const cartInc = await db.cart.increase_cart_quantity([customer_id , id]);
        if (cartInc) {
          res.status(209).send(cartInc);
        } else {
          res.sendStaus(404);
        }
      } else { 
        const cart = await db.cart.add_to_cart([customer_id, id]);
      if (cart) {
        res.status(200).send(cart);
      } else {
        res.sendStatus(204);
      }
      }
    } else {
        res.sendStatus(404)
    }
  },
  // Depricated for  now. Do not need update cart as it was meant for quantity but now using decrease
  // and increase functionality instead. may be useful on the cart page to click out of box and update quantity
  // updateCart: async (req, res) => {
  //     const db = req.app.get('db')
  //     const { id } = req.params
  //     const { quantity } = req.body
  //     const cart = await db.cart.update_cart([id, quantity])
  //     if (!cart) {
  //         res.status(404).send('Could not update cart')

  //     } else {
  //         res.status(200)
  //     }

  // },
  deleteFromCart: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    const { customer_id  } = req.session.user;
    const cart = await db.cart.delete_from_cart([customer_id, id]);
    if (!cart) {
      res.status(204).send("Error, item cant be deleted");
    }
    res.status(200).send(cart);
  },

  decreaseCartQuantity: async (req, res) => {
    const db = req.app.get("db");
    const { customer_id  } = req.session.user;
    const { id } = req.body;
    const cartInc = await db.cart.decrease_cart_quantity([customer_id , id]);
    if (cartInc) {
      res.status(200).send(cartInc);
    } else {
      res.sendStaus(404);
    }
  },
  increaseCartQuantity: async (req, res) => {
    const db = req.app.get("db");
    const { customer_id } = req.session.user;
    const { id } = req.body;
    const cart = await db.cart.increase_cart_quantity([customer_id , id]);
    if (cart) {
      res.status(200).send(cart);
    } else {
      res.sendStaus(404);
    }
  },
  clearCart: async (req, res) => {
    const db = req.app.get("db");
    const { customer_id  } = req.session.user;
    const cart = await db.cart.clear_cart(customer_id );
    if (cart) {
      res.status(200).send(cart);
    } else {
      res.status(404).send("Error");
    }
  },
};
