import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { click } from '@testing-library/user-event/dist/click';
import { Route } from 'react-router-dom';

export default function ProductItem({ item }) {
  return (
    <Card>
      <CardActionArea>
        <CardMedia component="img" height="140" image={item && item.image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item && item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item && item.price}$
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
