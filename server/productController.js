module.exports = {
  getProducts: async (req, res) => {
    const db = req.app.get("db");
    const products = await db.products.get_products();
    if (products) {
      res.status(200).send(products);
    } else {
      res.sendStatus(404)
    }
    
  },
  getProduct: async (req, res) => {
    const { id } =req.params
    const db = req.app.get("db");
    const products = await db.products.get_product(id);
    res.status(200).send(products);
  },
  // will need to pull everything off body that I will be using for the products
  addProduct: async (req, res) => {
    const db = req.app.get("db");
    const {
      name,
      img,
      img_two,
      img_three,
      img_four,
      price,
      description,
      type
    } = req.body;
    const products = await db.products.add_product([
      name,
      img,
      img_two,
      img_three,
      img_four,
      price,
      description,
      type
    ]);
    if (!products) {
      res.status(204).send("Error, product cannot be added");
    } else {
      res.status(200).send(products);
    }
  },
  // will need to pull verything off the body again to update it
  //for the sql I will need to pass in the parameters like $name
  // may not work with the structure of sql sheet
  editProduct: async (req, res) => {
    const db = req.app.get("db");
    const {
      name,
        price,
        description,
        img,
        img_two,
        img_three,
        img_four,
        type
    } = req.body;
    const { id } = req.params;
    const products = await db.products.edit_product([
      
        name,
        img,
        img_two,
        img_three,
        img_four,
        price,
        description,
        id,
        type
      
    ]);
    if (!products) {
      res.status(204).send("Error, product cannot be edited");
    } else {
      res.status(200).send(products);
    }
  },

  deleteProduct: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    const product = await db.products.delete_product(id);
    if (!product) {
      res.status(404).send("Post not found");
    } else {
      res.status(200).send("Product successfully deleted");
    }
  },
};
