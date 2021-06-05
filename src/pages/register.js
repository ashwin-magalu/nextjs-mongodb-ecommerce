import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import validate from "../utils/validate";
import { DataContext } from "../store/GlobalState";
import { postData } from "../utils/fetchData";
import { useRouter } from "next/router";

const Register = () => {
  const initialState = { name: "", email: "", password: "", cf_password: "" };
  const [userData, setUserData] = useState(initialState);
  const { name, email, password, cf_password } = userData;

  const router = useRouter();

  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errMsg = validate(name, email, password, cf_password);
    if (errMsg) return dispatch({ type: "NOTIFY", payload: { error: errMsg } });

    dispatch({ type: "NOTIFY", payload: { loading: true } });

    const res = await postData("auth/register", userData);
    if (res.err)
      return dispatch({ type: "NOTIFY", payload: { error: res.err } });

    return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
  };

  useEffect(() => {
    if (Object.keys(auth).length !== 0) {
      router.push("/");
    }
    return () => {
      //
    };
  }, [auth]);

  return (
    <div>
      <Head>
        <title>Register page</title>
      </Head>

      <form
        className="mx-auto my-4"
        style={{ maxWidth: "500px" }}
        onSubmit={handleSubmit}
      >
        <div className="form-floating mb-3">
          <input
            type="name"
            className="form-control"
            id="name"
            placeholder="name"
            name="name"
            onChange={handleChange}
            value={name}
          />
          <label htmlFor="name">Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            name="email"
            onChange={handleChange}
            value={email}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mt-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={password}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="form-floating mt-3">
          <input
            type="password"
            className="form-control"
            id="floatingPasswordConfirm"
            placeholder="Confirm Password"
            name="cf_password"
            onChange={handleChange}
            value={cf_password}
          />
          <label htmlFor="floatingPasswordConfirm">Confirm Password</label>
        </div>

        <button type="submit" className="btn btn-dark mt-3 w-100">
          Register
        </button>
        <p className="mt-3">
          Already registered?{" "}
          <Link href="/signin">
            <a style={{ color: "crimson" }}>Sign In</a>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
