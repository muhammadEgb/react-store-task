import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Box, CardActionArea } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

export default function ProductItem({ item }) {
  return (
    <Box>
      {!item.loading ? (
        <Card>
          <CardActionArea>
            <CardMedia component="img" height="200" image={item && item.image} />
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
      ) : (
        <Skeleton animation="wave" variant="rectangular" height={200} />
      )}
    </Box>
  );
}
