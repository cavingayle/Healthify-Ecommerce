DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS cart;

CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    email VARCHAR(250),
    first_name VARCHAR(250),
    last_name VARCHAR(250),
    password VARCAHR(20)
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(200),
    img VARCHAR(500),
    img_two VARCHAR(500),
    img_three VARCHAR(500),
    img_four VARCHAR(500),
    price FLOAT(2),
    description VARCHAR(500)

);

CREATE TABLE cart(
    cart_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(customer_id),
    product_id INT REFERENCES products(product_id),
    quantity INTEGER

);

