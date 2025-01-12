import products from "./products.json";

export const fetchProducts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products);
        }, 2000);
    });
};
