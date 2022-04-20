import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Navbar from '../../components/Navbar/Navbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { isAuth } from '../../utils/auth';

import './ProductPage.css';

function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth()) {
      navigate('/');
      return;
    }
    setTimeout(() => {
      fetch(`https://fakestoreapi.com/products/${params.id}`)
        .then(res => res.json())
        .then(json => setProduct(json));
    }, 1500);
  }, []);

  return (
    <div className="ProductPage">
      <Navbar logoutUser />
      <div>
        <IconButton aria-label="delete" onClick={() => navigate('/products')}>
          <ArrowBackIcon />
        </IconButton>
      </div>
      <Grid container className="details" spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h2">{!product ? <Skeleton /> : `Product Name: ${product.title}`}</Typography>
          <Typography variant="h3">{!product ? <Skeleton /> : `Price: ${product.price}`}</Typography>
          <Typography variant="h4">{!product ? <Skeleton /> : `Category: ${product.category}`}</Typography>
          <Typography variant="p">{!product ? <Skeleton /> : `Description: ${product.description}`}</Typography>
        </Grid>
        <Grid item xs={6}>
          {product ? (
            <img src={product && product.image} width="500px" alt={product && product.title} />
          ) : (
            <Skeleton animation="wave" variant="rectangular" width={500} height={500} />
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default ProductPage;
