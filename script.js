const products = [
    { 
        id: 1, 
        name: "Blood Message", 
        category: "Адвенчер", 
        price: 3000, 
        image: 'image/BloodMassage.webp'      
    }, 
    { 
        id: 2, 
        name: "Dragon Age. The Veilguard", 
        category: "ММО-РПГ", 
        price: 4999,
        image: 'image/EGs.png'      
    },
    { 
        id: 3, 
        name: "After The Fall", 
        category: "Выживание", 
        price: 2999,
        image: 'image/ATF.webp'      
    },
    { 
      id: 4, 
      name: "Elder Ring", 
      category: "Выживание", 
      price: 4000,
      image: 'image/ER.webp'      
    },
    { 
      id: 5, 
      name: "Days Gone", 
      category: "Выживание", 
      price: 2999,
      image: 'image/DaysGone.jpeg'      
    },
    {
      id: 6, 
      name: "Metro Exodus", 
      category: "Хоррор, шутер", 
      price: 1999,
      image: "image/ME.jpg"
    },
    {
      id: 7, 
      name: "Call of Duty Black Ops: Cold War", 
      category: "Шутер", 
      price: 2500,
      image: 'image/CD.webp'
    },

    {
      id: 8, 
      name: "Forza Motorsport 7", 
      category: "Гонки", 
      price: 1500,
      image: 'image/FM7.webp'
    },

    {
      id: 9, 
      name: "Lethal Company", 
      category: "Ужасы", 
      price: 800,
      image: 'image/LC.jpeg'
    },

    {
      id: 10, 
      name: "Helldivers 2", 
      category: "Экшен, шутер", 
      price: 2000,
      image: 'image/H2.webp'
    },

    {
      id: 11, 
      name: "Cyberpunk 2077", 
      category: "Адвенчер", 
      price: 2100,
      image: 'image/CP.webp'
    },

    {
      id: 12, 
      name: "ANNO: Mutationem", 
      category: "Экшен", 
      price: 1000,
      image: 'image/AM(2).webp'
    },


]
let filteredProducts = [...products];




function updateProductsDisplay() {
  // 1) Считаем текст, который введён в поле поиска (приводим к нижнему регистру)
  const searchValue = document.getElementById('search-input').value.toLowerCase();

  // 2) Смотрим, какая сортировка выбрана
  const sortValue = document.getElementById('sort-select').value;

  // 3) Фильтруем товары — оставляем те, у которых имя или категория содержит введённый текст
  filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchValue) ||
    product.category.toLowerCase().includes(searchValue)
  );

  // 4) Сортируем filteredProducts в зависимости от выбранной сортировки
  if (sortValue === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price);  // по возрастанию цены
  } else if (sortValue === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price);  // по убыванию цены
  } else if (sortValue === 'name-asc') {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));  // по названию A→Я
  } else if (sortValue === 'name-desc') {
    filteredProducts.sort((a, b) => b.name.localeCompare(a.name));  // по названию Я→A
  }
  // 5) Выводим отфильтрованные и отсортированные товары на страницу
  renderProducts(filteredProducts);
}



function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cart-count').textContent = count;
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}


function createProductCard(product) { 
    return `
    <div class="product-card" data-id="${product.id}">
      <div class="product-image-container">
        <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-category">${product.category}</p>
        <p class="product-price">${product.price.toLocaleString()} ₽</p>

        <div class="buttons">
          <button class="add-to-cart">Добавить в корзину</button>
          <a href="products/product${product.id}.html" class="more-info">Подробнее</a>
        </div>
      </div>
    </div>
    `;
}

function renderProducts(productsToRender) { 
  const productList = document.querySelector('.product-list');
  productList.innerHTML = "";  // очищаем старый список товаров

  // Для каждого товара создаём карточку и добавляем её в продукт-лист
  productsToRender.forEach(product => { 
    productList.innerHTML += createProductCard(product);
  });

  // Добавляем обработчики клика для кнопок "Добавить в корзину"
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
      // Получаем id товара из карточки, в которой нажали кнопку
      const productId = parseInt(e.target.closest('.product-card').dataset.id);
      addToCart(productId);
    });
  });
}

// Отслеживаем ввод текста в поле поиска и вызываем обновление отображения
document.getElementById('search-input').addEventListener('input', updateProductsDisplay);

// Отслеживаем изменение в списке сортировки
document.getElementById('sort-select').addEventListener('change', updateProductsDisplay);
document.querySelector('.cart').addEventListener('click', () => { 
    window.location.href="cart.html"
})


document.addEventListener("DOMContentLoaded", () => {
  // При загрузке показываем все товары (без фильтрации)
  renderProducts(products);
  // Обновляем счётчик корзины
  updateCartCount();
});





