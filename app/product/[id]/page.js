async function getProduct(id) {
  try {
    const res = await fetch(
      `https://fakestoreapi.com/products/${id}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("Fetch failed");
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default async function ProductDetail({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  if (!id) {
    return <div>ID không hợp lệ</div>;
  }

  const product = await getProduct(id);

  if (!product) {
    return <div>Lỗi load sản phẩm</div>;
  }

  return (
    <div className="p-6 mt-6">

    <div className="grid md:grid-cols-2 gap-8 items-start">

      <div className="border border-blue-100 rounded-xl p-6 bg-white shadow-sm">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-80 object-contain"
        />
      </div>

      <div className="mt-4">
        <h1 className="text-2xl font-bold mb-4">
          {product.title}
        </h1>

        <p className="text-gray-500 mb-4">
          {product.category}
        </p>

        <p className="mb-6 leading-relaxed">
          {product.description}
        </p>

        <p className="text-2xl font-bold text-green-600 mb-6">
          ${product.price}
        </p>

        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          Add to Cart
        </button>
      </div>

    </div>

  </div>
  );
}