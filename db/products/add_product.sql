INSERT INTO products
(name, img, img_two, img_three, img_four, price, description, type)
VALUES
($1,$2,$3,$4,$5,$6,$7, $8);

SELECT * FROM products
ORDER BY product_id;
