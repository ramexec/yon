import { HashRouter, Route, Routes } from "react-router-dom"
import { Sidebar } from "./Sidebar/Sidebar"
import { Dashboard } from "./Dashboard/Dashboard"
import { Decks } from "./Decks/Decks"
import { Stats } from "./Stats/Stats"
import { DeckCards } from "./DeckCards/DeckCards"
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow"
import "./App.css"

export default function App() {

  const label = getCurrentWebviewWindow().label
  const isDeckWindow = label.startsWith("deck")

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

          </Routes>
        </div>

      </div>

    </HashRouter>
  )
}