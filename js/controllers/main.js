import { servicesProducts } from "../services/product-services.js";

const productoContenedor = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

function createCard({ name, price, image, id }) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <div class="producto-card">
      <img
        class="producto-img"
        src="${image}"
        alt="imagen de producto"
      />
      <p>${name}</p>
      <div class="producto-footer">
        <span class="producto-precio">
          <p>$</p>
          <p>${price}</p>
        </span>
        <button class="btn_trash" data id="${id}">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  `;
  return card;
}

const renderProducts = async () => {
  try {
    const listaProductos = await servicesProducts.productosList();
    listaProductos.forEach((producto) => {
      const productCard = createCard(producto);
      productoContenedor.appendChild(productCard);
    });
  } catch (error) {
    console.log("Error al obtener los productos:", error);
  }
};

// Eliminar la tarjeta del DOM
const productosGrid = document.querySelector(".container__productos-grid");
productosGrid.addEventListener("click", (event) => {
  if (event.target.classList.contains("fa-trash")) {
    const productoCard = event.target.closest(".producto-card");
    if (productoCard) {
      productoCard.remove();

      if (!productosGrid.querySelector(".producto-card")) {
        const textoOculto = document.querySelector(".texto-oculto");
        textoOculto.hidden = false;
      }
    }
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.querySelector("[data-name]").value;
  const price = document.querySelector("[data-price]").value;
  const image = document.querySelector("[data-image]").value;

  try {
    const newProduct = await servicesProducts.createProduct(name, price, image);
    const newCard = createCard(newProduct);
    productoContenedor.appendChild(newCard);
  } catch (error) {
    console.log("Error al crear el producto:", error);
  }
  form.reset();
});

renderProducts();
deleteCard();
