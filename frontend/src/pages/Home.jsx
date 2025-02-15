import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "../components/Product";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "../utils/constant";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Paginate from "../components/Paginate";
import { IoChevronBackOutline } from "react-icons/io5";
import ProductCarousel from "../components/ProductCarousel";

const Home = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });
  // const [products, setProducts] = useState([]);

  // const fetchProducts = async () => {
  //   try {
  //     const res = await axios.get(`${BASE_URL}/api/products`);
  //     setProducts(res?.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  return (
    <div>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/">
          <button className="flex items-center gap-1 border border-slate-100 pr-2 py-2 rounded bg-slate-100 hover:bg-slate-200">
            <IoChevronBackOutline size={20} /> <span>Back</span>
          </button>
        </Link>
      )}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4 text-center">
            Latest Products
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data?.products?.map((product) => (
              <div
                key={product._id}
                className="p-4 border rounded-lg shadow-md"
              >
                <Product product={product} />
              </div>
            ))}
          </div>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </div>
  );
};

export default Home;
