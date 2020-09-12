DELETE FROM cart
WHERE customer_id = ($1);

SELECT * FROM cart
WHERE customer_id = ($1);