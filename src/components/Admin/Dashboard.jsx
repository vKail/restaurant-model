import AdminAside from "../Nav/AdminAside"

const Dashboard = () => {
    return (
        <div className="flex m-5">
            <aside className="w-1/4">
                <AdminAside />
            </aside>
            <div className="w-3/4">
                <h1>Dashboard</h1>
            </div>
        </div>
    )
}

export default Dashboard