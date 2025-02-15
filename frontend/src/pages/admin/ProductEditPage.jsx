import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";
import { IoChevronBackOutline } from "react-icons/io5";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { toast } from "react-toastify";

const ProductEditPage = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);
  // console.log(product);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    // try {
    const updatedProduct = {
      productId,
      name,
      price,
      image,
      brand,
      countInStock,
      category,
      description,
    };

    try {
      const result = await updateProduct(updatedProduct).unwrap();
      toast.success("Product updated successfully!");
      navigate("/admin/productlist");
    } catch (err) {
      toast.error(err?.data?.error || err.error);
    }

    //   refetch();
    // } catch (err) {
    //   toast.error(err?.data?.error || err.error);
    // }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    // console.log(e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      // console.log("Upload Response:", res);
      toast.success(res?.message);
      setImage(res?.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to="/admin/productlist">
        <button className="flex items-center gap-1 border border-slate-100 pr-2 py-2 rounded bg-slate-100 hover:bg-slate-200">
          <IoChevronBackOutline size={20} /> <span>Back</span>
        </button>
      </Link>

      <div>
        <h1 className="text-2xl font-semibold text-center py-3">
          Edit Products
        </h1>

        {loadingUpdate && <Loader />}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error?.data?.message}</Message>
        ) : (
          <form onSubmit={submitHandler} className="space-y-4">
            <div className="my-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="my-2">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* image input placeholder */}
            <div className="my-2">
              <label className="block text-sm font-medium text-gray-700">
                Image
              </label>

              <input
                type="text"
                placeholder="Enter image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {/* File Upload Input */}
              {loadingUpload && <Loader />}
              <input
                type="file"
                onChange={uploadFileHandler}
                className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="my-2">
              <label
                htmlFor="brand"
                className="block text-sm font-medium text-gray-700"
              >
                Brand
              </label>
              <input
                type="text"
                placeholder="Enter Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="my-2">
              <label
                htmlFor="countInStock"
                className="block text-sm font-medium text-gray-700"
              >
                Count In Stock
              </label>
              <input
                type="number"
                placeholder="Enter Count In Stock"
                value={countInStock}
                onChange={(e) =>
                  setCountInStock(parseFloat(e.target.value) || 0)
                }
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="my-2">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <input
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="my-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <input
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <button className="border py-[5px] px-[13px] rounded-md bg-blue-500 font-semibold text-white">
              Submit
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default ProductEditPage;
