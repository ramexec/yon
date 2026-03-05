import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import "./Sidebar.css"

export const Sidebar = () => {

  const [collapsed, setCollapsed] = useState(true)

  const location = useLocation()

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>

      <button
        className="collapse-btn"
        onClick={() => setCollapsed(!collapsed)}
      >
        ☰
      </button>

      <nav>

        <Link
          to="/"
          className={location.pathname === "/" ? "active" : ""}
          onClick={ () => { setCollapsed(true)}}
        >
          <span className="icon">🏠</span>
          {!collapsed && <div>Dashboard</div>}
        </Link>

        <Link
          to="/decks"
          className={location.pathname.startsWith("/decks") ? "active" : ""}
          onClick={ () => { setCollapsed(true)}}
        >
          <span className="icon">📚</span>
          {!collapsed && <div>Decks</div>}
        </Link>

        <Link
          to="/stats"
          className={location.pathname === "/stats" ? "active" : ""}
          onClick={ () => { setCollapsed(true)}}
        >
          <span className="icon">📊</span>
          {!collapsed && <div>Stats</div>}
        </Link>

      </nav>

    </div>
  )
}