import React from 'react';
import '../styles/FruitsPage.css';

const fruits = [
  {
    id: 1,
    name: 'Mango',
    image: 'https://images.unsplash.com/photo-1573081847860-9f57b08b4276?w=400',
    price: '₹100/kg',
    description: 'Fresh and juicy Alphonso mangoes'
  },
  {
    id: 2,
    name: 'Apple',
    image: 'https://images.unsplash.com/photo-1573081847860-9f57b08b4276?w=400',
    price: '₹80/kg',
    description: 'Crisp and sweet Red Delicious apples'
  },
  {
    id: 3,
    name: 'Banana',
    image: 'https://images.unsplash.com/photo-1573081847860-9f57b08b4276?w=400',
    price: '₹40/dozen',
    description: 'Fresh Cavendish bananas'
  },
  {
    id: 4,
    name: 'Orange',
    image: 'https://images.unsplash.com/photo-1573081847860-9f57b08b4276?w=400',
    price: '₹60/kg',
    description: 'Juicy and sweet oranges'
  },
  {
    id: 5,
    name: 'Grapes',
    image: 'https://images.unsplash.com/photo-1573081847860-9f57b08b4276?w=400',
    price: '₹120/kg',
    description: 'Fresh green grapes'
  },
  {
    id: 6,
    name: 'Watermelon',
    image: 'https://images.unsplash.com/photo-1573081847860-9f57b08b4276?w=400',
    price: '₹50/kg',
    description: 'Sweet and refreshing watermelons'
  }
];

export default function Fruits() {
  return (
    <div className="fruits-page">
      <div className="fruits-header">
        <h1>Fresh Fruits</h1>
        <p>Choose from our wide variety of fresh and seasonal fruits</p>
      </div>

      <div className="fruits-grid">
        {fruits.map(fruit => (
          <div key={fruit.id} className="fruit-card">
            <div className="fruit-image">
              <img src={fruit.image} alt={fruit.name} />
            </div>
            <div className="fruit-details">
              <h3>{fruit.name}</h3>
              <p className="fruit-price">{fruit.price}</p>
              <p className="fruit-description">{fruit.description}</p>
              <button className="add-to-cart">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
