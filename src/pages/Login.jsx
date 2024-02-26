import Layout from "./user/Layout";
import FormLogin from "../components/Form/FormLogin";

function Login() {
  return (
    <Layout>
      <div className="md:pt-32">
        <FormLogin />
      </div>
    </Layout>
  )
}

export default Login