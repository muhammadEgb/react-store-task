import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ProductItem from '../ProductItem/ProductItem';
import { useNavigate } from 'react-router-dom';

export default function ProductsList({ items }) {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {items.map((item, index) => (
          <Grid item xs={2} sm={4} md={4} key={index} onClick={() => navigate(`/product/${item.id}`)}>
            <ProductItem item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
