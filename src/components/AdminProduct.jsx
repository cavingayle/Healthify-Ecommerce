import React, { useState } from "react";
import styled from 'styled-components'

const AdminProduct = (props) => {
  const [isEditing, setEdit] = useState(false);
  const [input, setInput] = useState({
    name: props.product.name,
    price: props.product.price,
      description: props.product.description,
      img: props.product.img,
      img_two: props.product.img_two,
      img_three: props.product.img_three,
    img_four: props.product.img_four,
      type: props.product.type
    
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const toggleEdit = () => {
    setEdit(!isEditing);
    setInput({
      name: props.product.name,
      price: props.product.price,
        description: props.product.description,
        img: props.product.img,
        img_two: props.product.img_two,
        img_three: props.product.img_three,
      img_four: props.product.img_four,
        type: props.product.type
    });
  };

  return (
    <div key={props.index} className="admin-edit-box">
      {isEditing ? (
        <>
          <input name="name" value={input.name} onChange={handleChange} />
          <input
            name="price"
            type="number"
            value={input.price}
            onChange={handleChange}
          />
          <input
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
                  placeholder="Type"
          name="type"
          value={input.type}
          onChange={handleChange}
        />
          <button onClick={toggleEdit}>Cancel</button>
          <button
            onClick={() => {
              props.saveEdit(
                props.product.product_id,
                input.name,
                input.price,
                input.description
              );
              toggleEdit();
            }}
          >
            Save Changes
          </button>
        </>
      ) : (
        <ProductContainer>
          <p>{props.product.name}</p>
          {/* <p><img src={props.product.img}/></p> */}
          <p>{`Price: $${props.product.price}`}</p>
          <p>{`Description: ${props.product.description}`}</p>
          <button onClick={toggleEdit}>Edit</button>
        </ProductContainer>
      )}
      <button
        onClick={() => {
          props.deleteProduct(props.product.product_id);
        }}
      >
        Delete
      </button>
    </div>
  );
};


const ProductContainer = styled.div`
/* margin: 20 10; */
/* width: 300px;
height: 200px;
display: flex;
flex-direction: column; */
`

export default AdminProduct;
