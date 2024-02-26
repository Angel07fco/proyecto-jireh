import Layout from "./user/Layout";
import FormUnlockAccount from "../components/Form/FormUnlockAccount";

function UnlockAccount() {
    return (
        <Layout>
            <div className="md:pt-32">
                <FormUnlockAccount />
            </div>
        </Layout>
    )
}

export default UnlockAccount;