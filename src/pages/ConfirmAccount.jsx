import FormConfirmAccount from "../components/Form/FormConfirmAccount";
import Layout from "./user/Layout";

function ConfirmAccount() {
    return (
        <Layout>
            <div className="md:pt-32">
                <FormConfirmAccount />
            </div>
        </Layout>
    )
}

export default ConfirmAccount