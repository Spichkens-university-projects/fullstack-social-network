import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import NextProgressBar from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
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
      <NextProgressBar
        color={"#2b6cb0"}
        stopDelayMs={200}
        height={4}
        options={{ easing: "ease", speed: 500 }}
      />
      <Provider store={store}>
        <Toaster
          position="top-left"
          reverseOrder={true}
          toastOptions={{ duration: 2000 }}
        />
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
