import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, Sun, Moon, LayoutDashboard, Library, BarChart3, Settings } from "lucide-react"
import "./Sidebar.css"

export const Sidebar = () => {

  const [collapsed, setCollapsed] = useState(true)
  const [dark, setDark] = useState(false)

  const location = useLocation()

  const toggleTheme = () => {
    const newTheme = !dark
    setDark(newTheme)

    if (newTheme) {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }
  }

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      
      <div className="side-btns">

        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu size={22} />
        </button>

        {!collapsed && (
          <button
            className="theme-switcher"
            onClick={toggleTheme}
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        )}

      </div>

      <nav>

        <Link
          to="/"
          className={location.pathname === "/" ? "active" : ""}
          onClick={() => setCollapsed(true)}
        >
          <span className="icon">
            <LayoutDashboard size={20} />
          </span>
          {!collapsed && <div>Dashboard</div>}
        </Link>

        <Link
          to="/decks"
          className={location.pathname.startsWith("/decks") ? "active" : ""}
          onClick={() => setCollapsed(true)}
        >
          <span className="icon">
            <Library size={20} />
          </span>
          {!collapsed && <div>Decks</div>}
        </Link>

        <Link
          to="/stats"
          className={location.pathname === "/stats" ? "active" : ""}
          onClick={() => setCollapsed(true)}
        >
          <span className="icon">
            <BarChart3 size={20} />
          </span>
          {!collapsed && <div>Stats</div>}
        </Link>

         <Link
          to="/settings"
          className={location.pathname === "/settings" ? "active" : ""}
          onClick={() => setCollapsed(true)}
        >
          <span className="icon">
            <Settings size={20} />
          </span>
          {!collapsed && <div>Settings</div>}
        </Link>
      </nav>

    </div>
  )
}