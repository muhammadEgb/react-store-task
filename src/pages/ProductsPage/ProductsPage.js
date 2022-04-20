import React, { useEffect, useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import ProductsList from '../../components/ProductsList/ProductsList';
import Navbar from '../../components/Navbar/Navbar';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { isAuth } from '../../utils/auth';

import './ProductsPage.css';

const dummyData = [
  { title: '', loading: true },
  { title: '', loading: true },
  { title: '', loading: true },
  { title: '', loading: true },
  { title: '', loading: true },
  { title: '', loading: true },
  { title: '', loading: true },
  { title: '', loading: true },
  { title: '', loading: true },
];

function ProductsPage() {
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState(dummyData);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth()) {
      navigate('/');
      return;
    }
    const productsUrl = params.category
      ? `https://fakestoreapi.com/products/category/${params.category}`
      : 'https://fakestoreapi.com/products';
    params.category && setSelectedCategory(params.category.toLowerCase());
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(json => setCategories(['all', ...json]));

    loadProducts(productsUrl);
  }, []);

  useEffect(() => {
    if (selectedCategory !== undefined) {
      setProducts(dummyData);
      const url =
        selectedCategory === 'all'
          ? 'https://fakestoreapi.com/products'
          : `https://fakestoreapi.com/products/category/${selectedCategory}`;
      loadProducts(url);
    }
  }, [selectedCategory]);

  useEffect(() => {
    filterProducts('');
  }, [products]);

  const loadProducts = url => {
    setTimeout(() => {
      fetch(url)
        .then(res => res.json())
        .then(json => setProducts(json));
    }, 1500);
  };

  const filterProducts = name => {
    const _name = name.toLowerCase();
    const list = products.filter(item => item.title.toLowerCase().includes(_name));
    setFilteredProducts(list);
  };

  const handleCategorySelection = category => {
    setSelectedCategory(category);
    navigate(`/products/${category}`);
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
              <Button
                key={item}
                onClick={() => handleCategorySelection(item)}
                variant={selectedCategory === item ? 'contained' : 'text'}
              >
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
