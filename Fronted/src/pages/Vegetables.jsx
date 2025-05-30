import React from 'react';
import '../styles/VegetablesPage.css';

const vegetables = [
  {
    id: 1,
    name: 'Tomato',
    image: 'https://images.unsplash.com/photo-1573081847860-9f57b08b4276?w=400',
    price: '₹30/kg',
    description: 'Fresh and juicy tomatoes'
  },
  {
    id: 2,
    name: 'Potato',
    image: 'https://images.unsplash.com/photo-1573081847860-9f57b08b4276?w=400',
    price: '₹20/kg',
    description: 'Fresh and healthy potatoes'
  },
  {
    id: 3,
    name: 'Onion',
    image: 'https://images.unsplash.com/photo-1573081847860-9f57b08b4276?w=400',
    price: '₹25/kg',
    description: 'Fresh and aromatic onions'
  },
  {
    id: 4,
    name: 'Cabbage',
    image: 'https://images.unsplash.com/photo-1573081847860-9f57b08b4276?w=400',
    price: '₹40/kg',
    description: 'Fresh and crispy cabbage'
  },
  {
    id: 5,
    name: 'Carrot',
    image: 'https://images.unsplash.com/photo-1573081847860-9f57b08b4276?w=400',
    price: '₹35/kg',
    description: 'Fresh and sweet carrots'
  },
  {
    id: 6,
    name: 'Spinach',
    image: 'https://images.unsplash.com/photo-1573081847860-9f57b08b4276?w=400',
    price: '₹50/kg',
    description: 'Fresh and healthy spinach'
  }
];

export default function Vegetables() {
  return (
    <div className="vegetables-page">
      <div className="vegetables-header">
        <h1>Fresh Vegetables</h1>
        <p>Choose from our wide variety of fresh and healthy vegetables</p>
      </div>

      <div className="vegetables-grid">
        {vegetables.map(vegetable => (
          <div key={vegetable.id} className="vegetable-card">
            <div className="vegetable-image">
              <img src={vegetable.image} alt={vegetable.name} />
            </div>
            <div className="vegetable-details">
              <h3>{vegetable.name}</h3>
              <p className="vegetable-price">{vegetable.price}</p>
              <p className="vegetable-description">{vegetable.description}</p>
              <button className="add-to-cart">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
