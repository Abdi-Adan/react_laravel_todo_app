import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

export default function DefaultLayout() {
    const { user, token, setUser, setToken } = useStateContext();

    // if (!token) {
    //     return <Navigate to="/login" />;
    // }

    const onLogout = ev => {
        ev.preventDefault()

        axiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken(null)
            })
    }

    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data)
            })
    }, [])

    return (
        <div id="defaultLayout">
            <aside className="sidebar">
                <Link to="/admin">Admin</Link>
                <Link to="/todo">Todos</Link>
            </aside>
            <div className="content">
                <header>
                    <div className="headerTitle">
                        Effortlessly Manage Your Tasks. (DEPLOYED)
                    </div>


                    <div>
                        <a className="outlineButton">
                            <FontAwesomeIcon className="profileIcon" icon={faUser} />
                            {user.name} &nbsp; &nbsp;
                        </a>
                        <a onClick={onLogout} className="btnLogout" href="#">Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}