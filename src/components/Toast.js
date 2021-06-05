const Toast = ({ msg, handleShow, bgColor }) => {
  return (
    <div
      className={`toast show position-fixed text-light ${bgColor}`}
      style={{ top: "5px", right: "5px", zIndex: 9, minWidth: "280px" }}
      data-autohide="false"
    >
      <div
        className={`toast-header d-flex justify-content-between ${bgColor} text-light`}
      >
        <strong className="mr-auto text-light">{msg?.title}</strong>
        <div className="ml-2">
          <button
            type="button"
            className="btn ml-2 mb-1 close text-light"
            data-dismiss="toast"
            style={{ outline: "none" }}
            onClick={handleShow}
          >
            &times;
          </button>
        </div>
      </div>
      <div className="toast-body">{msg?.msg}</div>
    </div>
  );
};

export default Toast;
