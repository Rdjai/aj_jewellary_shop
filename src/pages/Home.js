import React, {useEffect, useState} from 'react';
import Navbar from '../components/Navbar';
import CardComponent from '../components/Card';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';

// ... (imports and other code)

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
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
      console.log(data);
      setFoodItem(data[0]);
      setFoodCat(data[1]);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    // Load data when the component mounts
    loadData();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredItems = foodItem.filter(
    (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <Carousel onSearch={handleSearch} />
      <div className="container">
        {foodCat.map((category) => (
          <div key={category._id} className="fs-3 m-3">
            <div className="fs-3 m-3" style={{ background: 'white', color: '#333', fontWeight: 'bold' }}>
  {category.CategoryName}
</div>


            <hr />
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
              {filteredItems
                .filter((filteredItem) => filteredItem.CategoryName === category.CategoryName)
                .map((filteredItem) => (
                  <div key={filteredItem._id} className="col-lg-3 col-md-3 col-sm-6 m-3.5 mb-3">
                    <CardComponent
                    allitems={filteredItem}
                      // foodName={filteredItem.name}
                      options={filteredItem.options}
                      // imgSrc={filteredItem.img}
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
