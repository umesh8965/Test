
    const product = JSON.parse(localStorage.getItem('productDetails'));
  
    if (!product) {
      alert('No product details found.');
      window.location.href = 'index.html';
    } else {
      document.getElementById('product-image').src = product.image;
      document.getElementById('product-title').textContent = product.title;
      document.getElementById('product-description').textContent = product.description;
      document.getElementById('product-price').textContent = `$${product.price}`;
      document.getElementById('product-category').textContent = `Category: ${product.category}`;
    }

  