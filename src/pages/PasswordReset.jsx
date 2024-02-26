import FormUnlockAccount from "../components/Form/FormUnlockAccount";
import Layout from "./user/Layout";

function PasswordReset() {
  return (
    <Layout>
      <div className="md:pt-32">
          <FormUnlockAccount />
      </div>
    </Layout>
  )
}

export default PasswordReset