<div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
  <Link to={`/product/${product._id}`}>
    <img
      className="object-cover w-full h-60 rounded-t-lg transition-transform duration-300 hover:scale-105"
      src={product.image}
      alt={product.name}
    />
  </Link>

  <div className="p-4">
    <Link
      to={`/product/${product._id}`}
      className="block font-semibold text-lg text-gray-800 hover:text-gray-600"
    >
      {product.name}
    </Link>

    <div className="mt-2">
      <Rating value={product.rating} text={`${product.numReviews} reviews`} />
    </div>

    <h3 className="mt-3 font-bold text-xl text-green-600">₹ {product.price}</h3>
  </div>
</div>;
