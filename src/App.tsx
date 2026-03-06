import { HashRouter, Route, Routes } from "react-router-dom"
import { Sidebar } from "./Sidebar/Sidebar"
import { Dashboard } from "./Dashboard/Dashboard"
import { Decks } from "./Decks/Decks"
import { Stats } from "./Stats/Stats"
import { DeckCards } from "./DeckCards/DeckCards"
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow"
import "./App.css"
import { useEffect } from "react"
import { Config, load_settings } from "./Services/getter"
import { Settings } from "./Settings/Settings"

export default function App() {

  const label = getCurrentWebviewWindow().label
  const isDeckWindow = label.startsWith("deck")


  const load_settings_from_file = async () => {
    const settings: Config = await load_settings();
    if (settings.theme === "dark") {
      document.body.classList.add("dark")
    }

  }

  useEffect(() => {
    load_settings_from_file();
  }, [])

  return (
    <HashRouter>

      <div className="main-container">

        {!isDeckWindow && <Sidebar />}

        <div className="content">
          <Routes>

            <Route path="/" element={<Dashboard />} />
            <Route path="/decks" element={<Decks />} />
            <Route path="/decks/:id" element={<DeckCards />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/settings" element={<Settings />} />

          </Routes>
        </div>

      </div>

    </HashRouter>
  )
}