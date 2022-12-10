import Register from "../../../app/components/pages/register/Register";
import { PrivateNextPage } from "../../../app/providers/private-route.interface";

const RegisterPage: PrivateNextPage = () => {
  return <Register />;
};

RegisterPage.isPrivatePage = false;

export default RegisterPage;
