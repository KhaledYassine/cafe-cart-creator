
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-cafe-darkbrown text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-serif font-medium mb-4">Café Delight</h3>
            <p className="text-cafe-cream/80">
              A cozy spot to enjoy artisanal coffee, delicious treats, and memorable moments.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-serif font-medium mb-4">Hours</h3>
            <ul className="space-y-2 text-cafe-cream/80">
              <li>Monday - Friday: 7am - 8pm</li>
              <li>Saturday: 8am - 9pm</li>
              <li>Sunday: 8am - 6pm</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-serif font-medium mb-4">Contact</h3>
            <ul className="space-y-2 text-cafe-cream/80">
              <li>123 Coffee Street</li>
              <li>City, State 12345</li>
              <li>Phone: (123) 456-7890</li>
              <li>Email: info@cafedelight.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-cafe-cream/20 mt-8 pt-8 text-center text-sm text-cafe-cream/60">
          <p>&copy; {new Date().getFullYear()} Café Delight. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
