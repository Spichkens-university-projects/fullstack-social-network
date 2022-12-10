import { getCookie, hasCookie } from "cookies-next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useEffect } from "react";
import { useActions } from "../hooks/useActions";
import { useAuth } from "../hooks/useAuth";

import { TypeComponentAuthFields } from "./private-route.interface";

const DynamicCheckAuth = dynamic(() => import("./CheckAuth"), {
  ssr: false,
});

const AuthProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
  children,
  Component: { isPrivatePage },
}) => {
  const { replace } = useRouter();
  const { user } = useAuth();
  const { refresh } = useActions();

  useEffect(() => {
    refresh(null);
    if (user) {
      let path: string | undefined;
      if (hasCookie("last_path")) path = getCookie("last_path")?.toString();
      else path = "/";
      replace(`${path}`);
    }
  }, []);

  return !isPrivatePage ? (
    <>{children}</>
  ) : (
    <DynamicCheckAuth Component={{ isPrivatePage }}>
      {children}
    </DynamicCheckAuth>
  );
};

export default AuthProvider;
