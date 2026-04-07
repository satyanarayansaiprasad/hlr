import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../data/siteData';
import ProductCard from '../components/ProductCard';

const CategoryPage = () => {
  const { categorySlug } = useParams();
  
  // Find the category display name from the slug
  const categoryDisplayName = CATEGORIES.find(
    cat => cat.toLowerCase().replace(/\s+/g, '-') === categorySlug
  );

  const categoryProducts = PRODUCTS.filter(
    p => p.category.toLowerCase().replace(/\s+/g, '-') === categorySlug
  );

  if (!categoryDisplayName) return (
    <div className="pt-40 text-center min-h-screen bg-[#F8F9FA]">
      <h2 className="text-2xl font-bold text-gray-400">Category Not Found</h2>
      <Link to="/" className="text-[#0052CC] font-bold mt-4 hover:underline">Back to Homepage</Link>
    </div>
  );

  return (
    <div className="bg-[#F8F9FA] min-h-screen pt-40 pb-32">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-24 text-center">
          <Link to="/" className="text-gray-400 font-bold uppercase tracking-widest text-[10px] hover:text-[#0052CC] transition-colors mb-4 inline-block">
            <i className="ri-arrow-left-s-line"></i> Homepage
          </Link>
          <h1 className="font-display font-black text-6xl md:text-7xl text-[#191C1D] mb-6 tracking-tight">
            {categoryDisplayName}
          </h1>
          <p className="text-lg text-gray-400 italic font-serif">
            Expert-vetted reviews and clinical comparisons within the {categoryDisplayName.toLowerCase()} sector.
          </p>
        </div>

        {/* Products List - Stacked Vertical */}
        <div className="flex flex-col gap-16">
          {categoryProducts.length > 0 ? (
            categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="py-40 text-center text-gray-300">
               <i className="ri-search-2-line text-6xl mb-6 block"></i>
               <h3 className="text-xl font-bold">No products found in this category yet.</h3>
               <p className="text-sm">Our medical board is currently auditing new submissions.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
