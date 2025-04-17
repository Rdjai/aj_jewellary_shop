import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Footer from '../components/Footer';
import { Search } from 'lucide-react';

export default function Home() {
  const [jewelryCat, setJewelryCat] = useState([]);
  const [jewelryItem, setJewelryItem] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const loadData = async () => {
    try {
      const response = await fetch('http://localhost:5000/users/foodData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setJewelryItem(data[0]);
      setJewelryCat(data[1]);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredItems = jewelryItem.filter(
    (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-neutral-900">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=1920"
            alt="Luxury Jewelry"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-serif text-white sm:text-5xl md:text-6xl mb-6">
              Timeless Elegance
            </h1>
            <p className="text-xl text-neutral-200 max-w-xl mx-auto mb-10">
              Discover our curated collection of fine jewelry, crafted with precision and passion.
            </p>
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <Search className="h-5 w-5 text-neutral-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search our collections..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-full bg-black/90 backdrop-blur-sm border-none focus:ring-2 focus:ring-neutral-300 shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories and Items */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {jewelryCat.map((category) => {
          const categoryItems = filteredItems.filter(
            (item) => item.CategoryName === category.CategoryName
          );

          if (categoryItems.length === 0) return null;

          return (
            <div key={category._id} className="mb-16">
              <h2 className="text-3xl font-serif text-neutral-900 mb-8">
                {category.CategoryName}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {categoryItems.map((item) => (
                  <div key={item._id}>
                    <Card
                      allitems={item}
                      options={item.options}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <Footer />
    </div>
  );
}