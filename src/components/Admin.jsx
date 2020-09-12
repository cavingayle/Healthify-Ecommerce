import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import { Container } from "./footer";

import AdminProduct from "./AdminProduct";

const Admin = (props) => {
  const [products, setProducts] = useState([]);
  const [input, setInput] = useState({
    name: "",
    price: 0,
    description: "",
    img: "",
    img_two: "",
    img_three: "",
    img_four: "",
    type: "",
  });

  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const saveEdit = (
    id,
    name,
    price,
    description,
    img,
    img_two,
    img_three,
    img_four,
    type
  ) => {
    axios
      .put(`/api/products/${id}`, {
        name,
        price,
        description,
        img,
        img_two,
        img_three,
        img_four,
        type
      })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addProduct = () => {
    const {
      name,
      price,
      description,
      img,
      img_two,
      img_three,
      img_four,
      type,
    } = input;
    axios
      .post("/api/products", {
        name,
        price,
        description,
        img,
        img_two,
        img_three,
        img_four,
        type,
      })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setInput({
      name: "",
      price: 0,
      description: "",
      img: "",
      img_two: "",
      img_three: "",
      img_four: "",
      type: "",
    });
  };

  const deleteProduct = (id) => {
    axios
      .delete(`/api/products/${id}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="admin-products-box">
      <section>
        <input
          placeholder="Product Name"
          name="name"
          value={input.name}
          onChange={handleChange}
        />
        <input
          placeholder="Price"
          name="price"
          type="text"
          value={input.price}
          onChange={handleChange}
        />
        <input
          placeholder="description"
          name="description"
          value={input.description}
          onChange={handleChange}
        />
        <input
          placeholder="img"
          name="img"
          value={input.img}
          onChange={handleChange}
        />
        <input
          placeholder="img_two"
          name="img_two"
          value={input.img_two}
          onChange={handleChange}
        />
        <input
          placeholder="img_three"
          name="img_three"
          value={input.img_three}
          onChange={handleChange}
        />
        <input
          placeholder="img_four"
          name="img_four"
          value={input.img_four}
          onChange={handleChange}
        />
        <input
          placeholder="type"
          name="type"
          value={input.type}
          onChange={handleChange}
        />
        <button onClick={addProduct}>Add Product</button>
      </section>
      {products.map((product, index, array) => {
        return (
          <AdminProduct
            key={product}
            saveEdit={saveEdit}
            deleteProduct={deleteProduct}
            product={product}
            index={index}
          />
        );
      })}
    </div>
  );
};

const ContainerCol = styled(Container)`

`;

export default Admin;
