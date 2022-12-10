import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import AuthProvider from "../app/providers/AuthProvider";
import CurrentPathSerialize from "../app/providers/CurrentPathSerialize";
import { TypeComponentAuthFields } from "../app/providers/private-route.interface";
import { wrapper } from "../app/store/store";
import "../styles/globals.css";

type TypedAppProps = AppProps & TypeComponentAuthFields;
function MyApp({ Component, ...rest }: TypedAppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <ChakraProvider>
      <Provider store={store}>
        <AuthProvider Component={Component}>
          <CurrentPathSerialize>
            <Component {...pageProps} />
          </CurrentPathSerialize>
        </AuthProvider>
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
