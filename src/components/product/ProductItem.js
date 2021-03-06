import Link from "next/link";
import { useContext } from "react";
import { addToCart } from "../../store/Actions";
import { DataContext } from "../../store/GlobalState";

const ProductItem = ({ product }) => {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth } = state;

  const userLink = () => {
    return (
      <>
        <Link href={`product/${product._id}`}>
          <a className="btn btn-info mb-1">View</a>
        </Link>
        <button
          className="btn btn-success mt-1 flex-fill"
          disabled={product.inStock === 0 ? true : false}
          onClick={() => dispatch(addToCart(product, cart))}
        >
          Buy Now
        </button>
      </>
    );
  };

  const adminLink = () => {
    return (
      <>
        <Link href={`create/${product._id}`}>
          <a className="btn btn-info" style={{ marginRight: "5px", flex: 1 }}>
            Edit
          </a>
        </Link>
        <button
          className="btn btn-danger"
          style={{ marginLeft: "5px", flex: 1 }}
          data-toggle="modal"
          data-target="#exampleModal"
          onClick={() =>
            dispatch({
              type: "ADD_MODAL",
              payload: [
                {
                  data: "",
                  id: product._id,
                  title: product.title,
                  type: "DELETE_PRODUCT",
                },
              ],
            })
          }
        >
          Delete
        </button>
      </>
    );
  };

  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        src={product.images[0].url}
        className="card-img-top"
        alt={product.images[0].public_id}
      />
      <div className="card-body">
        <h5 className="card-title text-capitalize" title={product.title}>
          {product.title}
        </h5>
        <div
          className="flex col justify-content-between mx-0"
          style={{ display: "flex" }}
        >
          <h6 className="text-danger">${product.price}</h6>
          <>
            {product.inStock > 0 ? (
              <h6 className="text-danger">In Stock: {product.inStock}</h6>
            ) : (
              <h6 className="text-danger">Out of Stock</h6>
            )}
          </>
        </div>
        <p className="card-text" title={product.description}>
          {product.description}
        </p>

        <div className="row justify-content-between mx-0">
          {!auth.user || auth.user.role !== "admin" ? userLink() : adminLink()}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
