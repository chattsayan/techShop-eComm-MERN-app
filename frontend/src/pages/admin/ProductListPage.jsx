import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../slices/productsApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { toast } from "react-toastify";
import Paginate from "../../components/Paginate";

const ProductListPage = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteProduct(id);
        toast.success("Product Deleted");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.error || err.error);
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-center py-3">Products</h1>

      <button
        onClick={createProductHandler}
        className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 transition"
      >
        <FaPlus /> Create Product
      </button>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm my-2">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  ID
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  NAME
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  PRICE
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  CATEGORY
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  BRAND
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left"></th>
              </tr>
            </thead>

            <tbody>
              {data?.products.map((product) => (
                <tr
                  key={product._id}
                  className="odd:bg-white even:bg-gray-50 hover:bg-gray-200"
                >
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                    {product._id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                    ${product.price}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                    {product.category}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                    {product.brand}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                    <div className="flex items-center justify-center gap-3">
                      {/* EDIT PRODUCT */}
                      <Link to={`/admin/product/${product._id}/edit`}>
                        <button className="p-2 rounded-md hover:bg-gray-300 transition-colors duration-200">
                          <FaEdit />
                        </button>
                      </Link>

                      {/* DELETE PRODUCT */}
                      <button
                        onClick={() => deleteHandler(product._id)}
                        className="border p-2 rounded-md bg-gray-300 hover:bg-red-600 hover:text-white transition-colors duration-200"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </div>
      )}
    </div>
  );
};

export default ProductListPage;
