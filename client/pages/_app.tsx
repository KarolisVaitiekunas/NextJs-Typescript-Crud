import { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { IUser } from "../interfaces";
import { getLoggedIn } from "../api";

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<IUser>({ status: false, name: "" });
  const [validatingUser, setValidatingUser] = useState<boolean>(true);

  /**
   * Sends cookie to API, if it is valid it will return current user details.
   */
  const verifyLogin = async () => {
    setValidatingUser(true);
    const data = await getLoggedIn();
    if (data.success) {
      setUser({ status: true, name: data.data });
      setValidatingUser(false);
    } else {
      setUser({ status: false, name: "" });
      setValidatingUser(false);
    }
  };

  useEffect(() => {
    verifyLogin();
  }, []);

  return (
    <Layout user={user} setUser={setUser}>
      <Component {...pageProps} verifyLogin={verifyLogin} user={user} validatingUser={validatingUser} />
    </Layout>
  );
}
export default MyApp;
