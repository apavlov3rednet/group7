import { useState } from "react";

const [products, setProducts] = useState([]);

let arproducts = await fetchReq('products');

setProducts(arproducts)

console.log(products)