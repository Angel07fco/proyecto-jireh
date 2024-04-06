import Header from "../../../components/Header/Header";
import Aside from "../../../components/Aside";
import Layout from "../Layout";

function ProductosComprados() {
    return (
        <Layout>
            <div className="flex">
                <Aside selected={4} />
                <div className="w-full">
                <Header texto="Mis productos comprados" linkText="Productos comprados" />
                </div>
            </div>
        </Layout>
    )
}

export default ProductosComprados