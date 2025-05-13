// Smooth scroll pour les liens internes
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});
document.addEventListener('DOMContentLoaded', function() {
  // Récupérer les éléments du DOM
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const categoryFilter = document.getElementById('category-filter');
  const minPriceInput = document.getElementById('min-price');
  const maxPriceInput = document.getElementById('max-price');
  const minPriceValue = document.getElementById('min-price-value');
  const maxPriceValue = document.getElementById('max-price-value');
  const productItems = document.querySelectorAll('.product-item');

  // Mettre à jour l'affichage des valeurs de prix
  minPriceInput.addEventListener('input', function() {
      minPriceValue.textContent = `${minPriceInput.value} CHF`;
  });

  maxPriceInput.addEventListener('input', function() {
      maxPriceValue.textContent = `${maxPriceInput.value} CHF`;
  });

  // Fonction pour filtrer les produits
  function filterProducts() {
      const searchTerm = searchInput.value.toLowerCase();
      const selectedCategory = categoryFilter.value.toLowerCase();
      const minPrice = parseInt(minPriceInput.value);
      const maxPrice = parseInt(maxPriceInput.value);

      productItems.forEach(item => {
          const productName = item.querySelector('h3').textContent.toLowerCase();
          const productCategory = item.getAttribute('data-category').toLowerCase();
          const productPrice = parseFloat(item.querySelector('.price').textContent.replace(' CHF/kg', ''));

          // Vérifier si le produit correspond aux critères de recherche et de filtre
          const matchesSearch = productName.includes(searchTerm);
          const matchesCategory = selectedCategory === '' || productCategory === selectedCategory;
          const matchesPrice = productPrice >= minPrice && productPrice <= maxPrice;

          if (matchesSearch && matchesCategory && matchesPrice) {
              item.style.display = 'block';
          } else {
              item.style.display = 'none';
          }
      });
  }

  // Ajouter des écouteurs d'événements pour les filtres
  searchInput.addEventListener('input', filterProducts);
  categoryFilter.addEventListener('change', filterProducts);
  minPriceInput.addEventListener('input', filterProducts);
  maxPriceInput.addEventListener('input', filterProducts);

  // Initialiser les attributs de données pour les catégories
  productItems.forEach((item, index) => {
      // Ajouter des attributs de données pour la catégorie
      const categories = ['viande', 'charcuterie', 'traiteur'];
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];

      item.setAttribute('data-category', randomCategory);
  });
});



function hideLoader() {
  const loader = document.querySelector('.loader-container');
  if (loader) {
    loader.style.display = 'none';
  }
}

// Attendre que la page soit complètement chargée
window.addEventListener('load', () => {
  // Attendre exactement 2 secondes après le chargement
  setTimeout(hideLoader, 1000);
});
