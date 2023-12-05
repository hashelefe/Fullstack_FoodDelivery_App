const { useState, createContext } = require("react");

const CartContext = createContext();
const CartProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const [value, setValue] = useState(0);

    const addProduct = (product) => {
      const existingProduct = products.find((item) => item.name === product.name);
    
      if (existingProduct) {
        // If a product with the same name exists, update its count
        const updatedProducts = products.map((item) =>
          item.name === product.name ? { ...item, count: item.count + 1 } : item
        );
        setProducts(updatedProducts);
        setValue(value + product.price);
      } else {
        // If the product is not in the array, add it
        const newProduct = {
          ...product,
          count: 1,
        };
        setProducts([...products, newProduct]);
        setValue(value + product.price);
      }
    };


const increaseProductCount = (productId) => {
  setProducts((oldState) => {
    const productIndex = oldState.findIndex((item) => item.id === productId);
    if (productIndex !== -1) {
      const updatedProducts = [...oldState];
      updatedProducts[productIndex] = {
        ...updatedProducts[productIndex],
        count: updatedProducts[productIndex].count + 1,
      };

      const productPrice = updatedProducts[productIndex].price;
      const newValue = value + productPrice;

      setValue(newValue);
      return updatedProducts;
    }
    return oldState;
  });
};

const decreaseProductCount = (productId) => {
  setProducts((oldState) => {
    const productIndex = oldState.findIndex((item) => item.id === productId);
    if (productIndex !== -1 && oldState[productIndex].count > 1) {
      const updatedProducts = [...oldState];
      updatedProducts[productIndex] = {
        ...updatedProducts[productIndex],
        count: updatedProducts[productIndex].count - 1,
      };

      const productPrice = updatedProducts[productIndex].price;
      const newValue = value - productPrice;

      setValue(newValue);
      return updatedProducts;
    }
    return oldState;
  });
};

    const onProductRemove = (product) => {
		setProducts((oldState) => {
			const productsIndex =
				oldState.findIndex(
					(item) =>
						item.id === product.id
				);
			if (productsIndex !== -1) {
				oldState.splice(productsIndex, 1);
        setValue(value - product.price * product.count)
			}
			return [...oldState];
		});
	};

    const clearCart = () => {
        setProducts([]);
        setValue(0);
      };

    return (
        <CartContext.Provider value={{ products, value, addProduct, onProductRemove, increaseProductCount, decreaseProductCount, clearCart }}>
          {children}
        </CartContext.Provider>
      );
}

export {CartContext, CartProvider};