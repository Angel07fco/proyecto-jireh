import AsideAdmin from "./components/AsideAdmin"

function AdminLayout({children}) {
    return (
        <div className="flex">
            <AsideAdmin/>
            <div className="w-full ml-72">
                {children}
            </div>
        </div>

    )
}

export default AdminLayout;

