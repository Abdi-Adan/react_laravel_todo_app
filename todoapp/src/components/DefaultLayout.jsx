import { Link, Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

export default function DefaultLayout() {
    const { user, token } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    const onLogout = (ev) => {
        ev.preventDefault()
    }

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/admin">Admin</Link>
                <Link to="/todo">Todo Items</Link>
            </aside>
            <div className="content">
                <header>
                    <div>
                        Header
                    </div>


                    <div>
                        {user.name} &nbsp; &nbsp;
                        <a onClick={onLogout} className="btn-logout" href="#">Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}