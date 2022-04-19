import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import ProductsList from '../../components/ProductsList/ProductsList';
import Navbar from '../../components/Navbar/Navbar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { isAuth } from '../../utils/auth';

import './ProductsPage.css';

function ProductsPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth()) {
      navigate('/');
      return;
    }

    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(json => setCategories(['All', ...json]));
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => setProducts(json));
  }, []);

  useEffect(() => {
    if (selectedCategory !== undefined) {
      setProducts([]);
      const url =
        selectedCategory === 'All'
          ? 'https://fakestoreapi.com/products'
          : `https://fakestoreapi.com/products/category/${selectedCategory}`;
      fetch(url)
        .then(res => res.json())
        .then(json => setProducts(json));
    }
  }, [selectedCategory]);

  useEffect(() => {
    filterProducts('');
  }, [products]);

  const filterProducts = name => {
    const _name = name.toLowerCase();
    const list = products.filter(item => item.title.toLowerCase().includes(_name));
    setFilteredProducts(list);
  };

  return (
    <div className="ProductsPage">
      <Navbar />
      <Container className="container">
        <h1>Products Page</h1>
        <div className="categories">
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
            justifyContent="center"
          >
            {categories.map(item => (
              <Button key={item} onClick={() => setSelectedCategory(item)}>
                {item}
              </Button>
            ))}
          </Stack>
        </div>
        <div className="search-bar">
          <TextField
            id="input-with-icon-textfield"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            sx={{ width: 500, borderRadius: 10 }}
            onChange={event => filterProducts(event.target.value)}
          />
        </div>
        <div className="products-list">
          <ProductsList items={filteredProducts} />
        </div>
      </Container>
    </div>
  );
}

export default ProductsPage;
