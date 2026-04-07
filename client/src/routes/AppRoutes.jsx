import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import ProductReview from '../pages/ProductReview';
import ReviewsList from '../pages/ReviewsList';
import About from '../pages/About';
import Contact from '../pages/Contact';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/review/:slug" element={<ProductReview />} />
        <Route path="/reviews" element={<ReviewsList />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
