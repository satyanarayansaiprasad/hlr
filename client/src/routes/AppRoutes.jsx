import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import ProductReview from '../pages/ProductReview';
import ReviewsList from '../pages/ReviewsList';
import About from '../pages/About';
import Contact from '../pages/Contact';

// Admin Page Imports
import AdminLayout from '../components/AdminLayout';
import AdminLogin from '../pages/AdminLogin';
import AdminDashboard from '../pages/AdminDashboard';
import AdminBlogList from '../pages/AdminBlogList';
import AdminBlogEditor from '../pages/AdminBlogEditor';
import AdminCategories from '../pages/AdminCategories';
import AdminTags from '../pages/AdminTags';
import AdminMedia from '../pages/AdminMedia';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages with Main Layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/review/:slug" element={<ProductReview />} /> {/* Legacy */}
        <Route path="/reviews/:category/:slug" element={<ProductReview />} />
        <Route path="/reviews/:category" element={<ReviewsList />} />
        <Route path="/reviews" element={<ReviewsList />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Admin Panel Pages */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="blogs" element={<AdminBlogList />} />
        <Route path="blogs/new" element={<AdminBlogEditor />} />
        <Route path="blogs/edit/:id" element={<AdminBlogEditor />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="tags" element={<AdminTags />} />
        <Route path="media" element={<AdminMedia />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
