import { useContext, useEffect, useState } from "react";
import { DataContext } from "../store/GlobalState";
import { deleteFromCart } from "../store/Actions";
import { deleteData } from "../utils/fetchData";
import { useRouter } from "next/router";
import { Button, Modal } from "react-bootstrap";

const ModalData = () => {
  const { state, dispatch } = useContext(DataContext);
  const { modal, auth } = state;

  const router = useRouter();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (modal.length !== 0) handleShow();
  }, [modal]);

  const deleteUser = (item) => {
    dispatch(deleteFromCart(item.data, item.id, item.type));

    deleteData(`user/${item.id}`, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  const deleteCategories = (item) => {
    deleteData(`categories/${item.id}`, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });

      dispatch(deleteFromCart(item.data, item.id, item.type));
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  const deleteProduct = (item) => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    deleteData(`product/${item.id}`, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      dispatch({ type: "NOTIFY", payload: { success: res.msg } });
      return router.push("/");
    });
  };

  const handleSubmit = () => {
    if (modal.length !== 0) {
      for (const item of modal) {
        if (item.type === "ADD_CART") {
          dispatch(deleteFromCart(item.data, item.id, item.type));
        }

        if (item.type === "ADD_USERS") deleteUser(item);

        if (item.type === "ADD_CATEGORIES") deleteCategories(item);

        if (item.type === "DELETE_PRODUCT") deleteProduct(item);

        dispatch({ type: "ADD_MODAL", payload: [] });
      }
    }
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title className="text-capitalize">
          {modal.length !== 0 && modal[0]?.title}
        </Modal.Title>
        <button className="btn text-bold" onClick={handleClose}>
          &times;
        </button>
      </Modal.Header>
      <Modal.Body>Do you want to delete this item?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalData;
