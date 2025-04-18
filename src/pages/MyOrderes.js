import React, { useEffect, useState } from 'react';
import Footer from '../components/Navbar';
import Navbar from '../components/Navbar';
import { ShoppingBag, Package } from 'lucide-react';

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
    let total = 0;
    orderData.forEach(item => {
      if (Array.isArray(item)) {
        item.forEach(arrayData => {
          total += (parseFloat(arrayData.price) || 0) * (parseFloat(arrayData.qty) || 1);
        });
      }
    });
    setTotalValue(total);
  }, [orderData]);

  const styles = {
    container: {
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      paddingBottom: '2rem'
    },
    header: {
      backgroundColor: 'white',
      padding: '2rem 0',
      marginBottom: '2rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    },
    headerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    headerIcon: {
      color: '#3b82f6',
      width: '32px',
      height: '32px'
    },
    headerTitle: {
      fontSize: '1.875rem',
      fontWeight: '600',
      color: '#1f2937',
      margin: '0'
    },
    mainContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    orderDate: {
      backgroundColor: 'white',
      padding: '1rem',
      borderRadius: '0.5rem',
      marginBottom: '1.5rem',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    dateText: {
      color: '#4b5563',
      fontSize: '0.875rem',
      fontWeight: '500'
    },
    orderGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    orderCard: {
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      overflow: 'hidden',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'translateY(-2px)'
      }
    },
    cardImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover'
    },
    cardContent: {
      padding: '1rem'
    },
    cardTitle: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '0.5rem'
    },
    cardDetails: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: '#6b7280',
      fontSize: '0.875rem'
    },
    price: {
      color: '#2563eb',
      fontWeight: '600',
      fontSize: '1.125rem'
    },
    totalSection: {
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      marginTop: '2rem'
    },
    totalText: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#1f2937',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    totalAmount: {
      color: '#2563eb'
    },
    emptyState: {
      textAlign: 'center',
      padding: '4rem 0',
      color: '#6b7280'
    },
    emptyStateIcon: {
      width: '48px',
      height: '48px',
      margin: '0 auto 1rem',
      color: '#9ca3af'
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />

      <div style={styles.header}>
        <div style={styles.headerContent}>
          <ShoppingBag style={styles.headerIcon} />
          <h1 style={styles.headerTitle}>My Orders</h1>
        </div>
      </div>

      <div style={styles.mainContent}>
        {orderData.length === 0 ? (
          <div style={styles.emptyState}>
            <Package style={styles.emptyStateIcon} />
            <h3>No orders found</h3>
            <p>Looks like you haven't placed any orders yet.</p>
          </div>
        ) : (
          orderData.map((item, index) => (
            <div key={index}>
              {Array.isArray(item) && (
                <>
                  {item.some(arrayData => arrayData.Order_date) && (
                    <div style={styles.orderDate}>
                      <Package size={20} />
                      <span style={styles.dateText}>
                        Order placed on {item.find(data => data.Order_date)?.Order_date}
                      </span>
                    </div>
                  )}
                  <div style={styles.orderGrid}>
                    {item.map((arrayData, arrayIndex) => (
                      !arrayData.Order_date && (
                        <div key={arrayIndex} style={styles.orderCard}>
                          <img
                            src={arrayData.img}
                            alt={arrayData.name}
                            style={styles.cardImage}
                          />
                          <div style={styles.cardContent}>
                            <h3 style={styles.cardTitle}>{arrayData.name}</h3>
                            <div style={styles.cardDetails}>
                              <span>Quantity: {arrayData.qty}</span>
                              <span>{arrayData.size}</span>
                            </div>
                            <div style={styles.price}>
                              ₹{(parseFloat(arrayData.price) * parseFloat(arrayData.qty)).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                </>
              )}
            </div>
          ))
        )}

        {totalValue > 0 && (
          <div style={styles.totalSection}>
            <div style={styles.totalText}>
              <span>Total Order Value</span>
              <span style={styles.totalAmount}>
                ₹{isNaN(totalValue) ? '0.00' : totalValue.toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}