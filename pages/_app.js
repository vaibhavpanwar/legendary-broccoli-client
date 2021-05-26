import Navbar from "../components/Layout/navbar.component";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { useStore } from "../redux/store";
import { useEffect } from "react";
import { getUserDetails } from "../redux/actions/auth.actions";
import { setAuthHeader } from "../config/api";
function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!!authToken) {
      store.dispatch(getUserDetails(authToken));
      setAuthHeader(authToken);
    }
  }, [store.dispatch]);

  return (
    <>
      <Provider store={store}>
        <Navbar />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
