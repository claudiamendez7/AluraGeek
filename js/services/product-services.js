const BASE_URL = "https://6733ffbea042ab85d1189a7f.mockapi.io/productos";

const productosList = async () => {
  try {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error al obtener los productos:", error);
  }
};

const createProduct = async (name, price, image) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price, image }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error al crear el producto:", error);
  }
};

const deleteProduct = async (name, price, image) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price, image }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error al eliminar el producto:", error);
  }
};

const renderProducts = async () => {
  try {
    const listaProductos = await productosList();
    listaProductos.forEach((producto) => {
      const productCard = createCard(producto);
      productoContenedor.appendChild(productCard);
    });
  } catch (error) {
    console.log("Error al obtener los productos:", error);
  }
};

export const servicesProducts = {
  productosList,
  createProduct,
  deleteProduct,
  renderProducts,
};
