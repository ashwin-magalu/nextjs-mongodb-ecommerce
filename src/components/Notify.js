import { useContext, useEffect, useState } from "react";
import { DataContext } from "../store/GlobalState";
import Loading from "./Loading";
import Toast from "./Toast";

const Notify = () => {
  const { state, dispatch } = useContext(DataContext);
  const { notify } = state;

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: "NOTIFY", payload: {} });
    }, 3000);
    return () => {
      //
    };
  }, [notify.success]);

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: "NOTIFY", payload: {} });
    }, 5000);
    return () => {
      //
    };
  }, [notify.error]);

  return (
    <>
      {notify.loading && <Loading />}
      {notify.error && (
        <Toast
          msg={{ msg: notify.error, title: "Error" }}
          handleShow={() => dispatch({ type: "NOTIFY", payload: {} })}
          bgColor="bg-danger"
        />
      )}
      {notify.success && (
        <Toast
          msg={{ msg: notify.success, title: "Success" }}
          handleShow={() => dispatch({ type: "NOTIFY", payload: {} })}
          bgColor="bg-success"
        />
      )}
    </>
  );
};

export default Notify;
