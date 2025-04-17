import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  const fetchMyOrder = async () => {
    try {
      const response = await fetch('http://localhost:5000/users/myOrderes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: localStorage.getItem('userEmail'),
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch orders. Status: ${response.status}`);
      }

      const data = await response.json();
      setOrderData(data.orderedData.order_data || []);
    } catch (error) {
      console.error('Error fetching orders:', error.message);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  useEffect(() => {
    console.log('Order Data:', orderData);

    // Calculate total value of orders
    let total = 0;
    orderData.forEach(item => {
      if (Array.isArray(item)) {
        item.forEach(arrayData => {
          total += (parseFloat(arrayData.price) || 0) * (parseFloat(arrayData.qty) || 1);
        });
      }
    });

    console.log('Total Value:', total);

    setTotalValue(total);
  }, [orderData]);


  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="container">
        <div className="row">
          {/* Render your orders */}
          {orderData.length !== 0 &&
            orderData.map((item, index) => (
              <div key={index}>
                {Array.isArray(item) && item.map((arrayData, arrayIndex) => (
                  <div key={arrayIndex}>
                    {arrayData.Order_date ? (
                      <div className="m-auto mt-5">
                        <span>{arrayData.Order_date}</span>
                        <hr />
                      </div>
                    ) : (
                      <div className="col-12 col-md-6 col-lg-3">
                        <div
                          className="card mt-3"
                          style={{
                            width: '16rem',
                            maxHeight: '360px',
                          }}
                        >
                          <img
                            src={arrayData.img}
                            className="card-img-top"
                            alt="..."
                            style={{
                              height: '120px',
                              objectFit: 'fill',
                            }}
                          />
                          <div className="card-body">
                            <h5 className="card-title">{arrayData.name}</h5>
                            <div
                              className="container w-100 p-0"
                              style={{ height: '38px' }}
                            >
                              <span className="m-1">{arrayData.qty}</span>
                              <span className="m-1">{arrayData.size}</span>
                              <div className="d-inline ms-2 h-100 w-20 fs-5">
                                ₹{arrayData.price}/-
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
        </div>

        {/* Display the total value */}
        <div className="mt-4">
          <h4>Total Value of Your Orders: ₹{isNaN(totalValue) ? 0 : totalValue.toFixed(2)}</h4>
        </div>
      </div>

      <Footer />
    </div>
  );
}
