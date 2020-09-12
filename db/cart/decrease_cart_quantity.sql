UPDATE cart
SET quantity = quantity - 1
WHERE customer_id = $1 
AND product_id = $2;

 SELECT cart.customer_id, products.name, products.price, products.img, cart.product_id, cart.quantity
 FROM cart
 FULL OUTER JOIN products ON cart.product_id=products.product_id
 WHERE customer_id = $1;
