UPDATE products
SET 
name = $1, 
img = $2,
img_two = $3,
img_three =$4,
img_four = $5,
price = $6,
description = $7,
type =$9 

WHERE product_id = $8;

SELECT *
FROM products
ORDER BY product_id;


