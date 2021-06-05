import Head from "next/head";
import { useContext, useState } from "react";
import { addToCart } from "../../store/Actions";
import { DataContext } from "../../store/GlobalState";
import { getData } from "../../utils/fetchData";

const DetailedProduct = ({ product }) => {
  const [tab, setTab] = useState(0);
  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;

  const isActive = (index) => {
    if (tab === index) {
      return " active";
    }
    return "";
  };

  return (
    <div className="row detail_page">
      <Head>
        <title>Product Details</title>
      </Head>

      <div className="col-md-6">
        <img
          src={product.images[tab].url}
          alt={product.images[tab].public_id}
          className="d-block img-thumbnail rounded mt-4 w-100"
          style={{ height: "350px", cursor: "pointer", objectFit: "contain" }}
        />

        <div className="row mx-0" style={{ cursor: "pointer" }}>
          {product.images.map((image, i) => (
            <img
              key={i}
              src={image.url}
              alt={image.public_id}
              className={`img-thumbnail rounded ${isActive(i)}`}
              style={{ height: "80px", width: "20%", objectFit: "contain" }}
              onClick={() => setTab(i)}
            />
          ))}
        </div>
      </div>
      <div className="col-md-6 mt-3">
        <h2 className="text-uppercase">{product.title}</h2>
        <h5 className="text-danger">${product.price}</h5>
        <div className="riw mx-0 d-flex justify-content-between">
          {product.inStock > 0 ? (
            <h6 className="text-danger">In Stock: {product.inStock}</h6>
          ) : (
            <h6 className="text-danger">Out of Stock</h6>
          )}
          <h6 className="text-danger">$Sold: {product.sold}</h6>
        </div>

        <div className="my-2 fs-4">{product.description}</div>
        <div className="my-3 fs-6">{product.content}</div>

        <button
          className="btn btn-dark d-block my-3 px-5"
          type="button"
          disabled={product.inStock === 0 ? true : false}
          onClick={() => dispatch(addToCart(product, cart))}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params: { id } }) => {
  const res = await getData(`product/${id}`);

  return {
    props: {
      product: res?.product,
    },
  };
};

export default DetailedProduct;
