document.addEventListener("DOMContentLoaded", function () {
    const cartBtn = document.getElementById('cart-btn');
    const menuBtn = document.getElementById('menu-btn');
    const cartBox = document.querySelector('.cart-box');
    const menuDropdown = document.querySelector('.menu-dropdown');

    cartBtn.addEventListener('click', () => {
      cartBox.classList.toggle('hidden');
      menuDropdown.classList.add('hidden');
    });

    menuBtn.addEventListener('click', () => {
      menuDropdown.classList.toggle('hidden');
      cartBox.classList.add('hidden');
    });

    document.querySelector('a[href="#about"]').addEventListener('click', function(event) {
      event.preventDefault(); // بتمنع التمرير العادي
      document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    });

    const menuItems = document.querySelectorAll('.menu-dropdown a');
    const productGrid = document.querySelector('.product-grid');
    const products = productGrid.querySelectorAll('.product-item');

    console.log('menuItems:', menuItems);
    console.log('productGrid:', productGrid);
    console.log('products:', products);

    menuItems.forEach(item => {
      item.addEventListener('click', function(event) {
        event.preventDefault();

        const filter = this.getAttribute('data-filter');
        console.log('Clicked filter:', filter);

        products.forEach(product => {
          const category = product.dataset.category;
          console.log('Product category:', category);
          if (filter === 'all' || category === filter) {
            product.style.display = 'block';
          } else {
            product.style.display = 'none';
          }
        });

        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
      });
    });
    // navbar.js
    let cart = []; // مصفوفة السلة لحفظ المنتجات.

// دالة إضافة المنتج إلى السلة
    function addToCart(product) {
        cart.push(product);
        updateCartUI();
    }

// دالة تحديث واجهة السلة
    function updateCartUI() {
        const cartContainer = document.querySelector('.cart-box');
        cartContainer.innerHTML = ''; // إعادة تهيئة السلة لعرض العناصر المضافة حديثًا.

        // التأكد من وجود منتجات في السلة
        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        }

        cart.forEach(product => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            // إضافة الصورة
            const img = document.createElement('img');
            img.src = product.image;
            img.classList.add('cart-item-image');

            // إضافة الاسم والسعر
            const name = document.createElement('h4');
            name.textContent = product.name;

            const price = document.createElement('p');
            price.textContent = `$${product.price.toFixed(2)}`;

            // إضافة الصورة والاسم والسعر إلى العنصر
            cartItem.appendChild(img);
            cartItem.appendChild(name);
            cartItem.appendChild(price);

            // إضافة العنصر إلى السلة
            cartContainer.appendChild(cartItem);
        });
    }

// إضافة الحدث عند الضغط على زر "Add to Cart"
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const product = {
                name: event.target.parentElement.querySelector('h3').innerText,
                price: parseFloat(event.target.parentElement.querySelector('p').innerText.split('$')[1]),
                image: event.target.parentElement.querySelector('img').src
            };
            addToCart(product);
        });
    });

});
