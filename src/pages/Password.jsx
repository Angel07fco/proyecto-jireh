import Layout from "./user/Layout";
import FormSendOtp from "../components/Form/FormSendOtp";

function Password() {
  return (
    <Layout>
      <div className="md:pt-32">
        <FormSendOtp />
      </div>
    </Layout>
  )
}

export default Password