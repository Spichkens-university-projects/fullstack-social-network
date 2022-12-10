import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { PropsWithChildren, useEffect } from "react";

const CurrentPathSerialize = ({ children }: PropsWithChildren) => {
  const { pathname } = useRouter();

  useEffect(() => {
    setCookie("last_path", pathname, { maxAge: 31536000 });
  }, [pathname]);
  return <>{children}</>;
};
export default CurrentPathSerialize;
