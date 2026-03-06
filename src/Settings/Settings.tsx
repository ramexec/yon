import { useEffect, useState } from "react"
import {load_settings, } from "../Services/getter"
import "./Settings.css"
import { Config } from "../Services/types"
import { save_settings } from "../Services/setter"

export const Settings = () => {

  const [settings, setSettings] = useState<Config | null>(null)

  const load_settings_from_backend = async () => {
    const conf: Config = await load_settings()
    setSettings(conf)
  }

  useEffect(() => {
    load_settings_from_backend()
  }, [])

  const changeTheme = (theme: string) => {
    if (!settings) return
    setSettings({ ...settings, theme })
  }

  const save = async () => {
    if (!settings) return

    await save_settings(settings)
    await load_settings_from_backend();

    if (settings.theme === "dark") {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }
  }

  if (!settings) return <div>Loading...</div>

  return (
    <div className="settings-container">

      <h2>Settings</h2>

      <div className="setting-item">

        <label>Theme</label>

        <select
          value={settings.theme}
          onChange={(e) => changeTheme(e.target.value)}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>

      </div>

      <button className="save-btn" onClick={save}>
        Save Settings
      </button>

    </div>
  )
}