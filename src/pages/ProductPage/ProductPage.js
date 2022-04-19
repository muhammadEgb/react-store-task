import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Navbar from '../../components/Navbar/Navbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

import './ProductPage.css';
import { isAuth } from '../../utils/auth';

function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth()) {
      navigate('/');
      return;
    }

    fetch(`https://fakestoreapi.com/products/${params.id}`)
      .then(res => res.json())
      .then(json => setProduct(json));
  }, []);

  return (
    <div className="ProductPage">
      <Navbar />
      <div>
        <IconButton aria-label="delete" onClick={() => navigate('/products')}>
          <ArrowBackIcon />
        </IconButton>
      </div>
      <Grid container className="details" spacing={2}>
        <Grid item xs={6}>
          <h1>Product Name: {product && product.title}</h1>
          <h2>Price: {product && product.price}</h2>
          <h2>Category: {product && product.category}</h2>
          <h3>Description: {product && product.description}</h3>
        </Grid>
        <Grid item xs={6}>
          <img src={product && product.image} width="500px" alt={product && product.title} />
        </Grid>
      </Grid>
    </div>
  );
}

export default ProductPage;
