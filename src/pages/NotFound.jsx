import Error404 from "../components/Error404";
import Layout from "./user/Layout";

function NotFound() {
  return (
    <Layout>
      <Error404 />
    </Layout>
  )
}

export default NotFound