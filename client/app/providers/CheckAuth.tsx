import { useRouter } from "next/router";
import { FC, PropsWithChildren } from "react";
import { useAuth } from "../hooks/useAuth";
import { TypeComponentAuthFields } from "./private-route.interface";

const CheckAuth: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
  children,
  Component: { isPrivatePage },
}) => {
  const { user, isLoading } = useAuth();
  const { replace } = useRouter();

  const Children = () => <>{children}</>;

  if (isLoading) return null;

  if (user) return <Children />;

  if (isPrivatePage && !user) replace("/auth/login");

  return null;
};

export default CheckAuth;
