import React from 'react';


const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Shop</h3>
            <ul className="mt-4 space-y-3">
              <li><a href="#" className="text-neutral-400 hover:text-white">Collections</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white">New Arrivals</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white">Trending Now</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white">Sale</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">About</h3>
            <ul className="mt-4 space-y-3">
              <li><a href="#" className="text-neutral-400 hover:text-white">Our Story</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white">Craftsmanship</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white">Sustainability</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Service</h3>
            <ul className="mt-4 space-y-3">
              <li><a href="#" className="text-neutral-400 hover:text-white">Contact Us</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white">Shipping</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white">Returns</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white">Care Guide</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Connect</h3>
            <ul className="mt-4 space-y-3">
              <li><a href="#" className="text-neutral-400 hover:text-white">Instagram</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white">Pinterest</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-neutral-800 pt-8">
          <p className="text-sm text-neutral-400 text-center">
            © 2025 Lumière. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
