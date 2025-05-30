import React from 'react';
import '../styles/GrainsPage.css';

const grains = [
  {
    id: 1,
    name: 'Basmati Rice',
    image: 'https://images.unsplash.com/photo-1573081847860-9f57b08b4276?w=400',
    price: '₹120/kg',
    description: 'Premium quality basmati rice'
  },
  {
    id: 2,
    name: 'Wheat',
    image: 'https://images.unsplash.com/photo-1573081847860-9f57b08b4276?w=400',
    price: '₹40/kg',
    description: 'Freshly harvested wheat'
  },
  {
    id: 3,
    name: 'Jowar',
    image: 'https://images.unsplash.com/photo-1573081847860-9f57b08b4276?w=400',
    price: '₹35/kg',
    description: 'Healthy and nutritious jowar'
  },
  {
    id: 4,
    name: 'Bajra',
    image: 'https://images.unsplash.com/photo-1573081847860-9f57b08b4276?w=400',
    price: '₹30/kg',
    description: 'Fresh and healthy bajra'
  },
  {
    id: 5,
    name: 'Maize',
    image: 'https://images.unsplash.com/photo-1573081847860-9f57b08b4276?w=400',
    price: '₹25/kg',
    description: 'Freshly harvested maize'
  },
  {
    id: 6,
    name: 'Barley',
    image: 'https://images.unsplash.com/photo-1573081847860-9f57b08b4276?w=400',
    price: '₹45/kg',
    description: 'Fresh and healthy barley'
  }
];

export default function Grains() {
  return (
    <div className="grains-page">
      <div className="grains-header">
        <h1>Fresh Grains</h1>
        <p>Choose from our wide variety of fresh and healthy grains</p>
      </div>

      <div className="grains-grid">
        {grains.map(grain => (
          <div key={grain.id} className="grain-card">
            <div className="grain-image">
              <img src={grain.image} alt={grain.name} />
            </div>
            <div className="grain-details">
              <h3>{grain.name}</h3>
              <p className="grain-price">{grain.price}</p>
              <p className="grain-description">{grain.description}</p>
              <button className="add-to-cart">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
