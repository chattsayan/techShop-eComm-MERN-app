import Product from "../components/Product";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

const Home = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/products`);
      setProducts(res?.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Latest Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="p-4 border rounded-lg shadow-md">
            <Product product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
