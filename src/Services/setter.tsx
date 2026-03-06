import { invoke } from "@tauri-apps/api/core"
import { Config } from "./types"

export const add_deck = async (name : String) => {
    await invoke("add_deck", { name })
}

export const save_settings = async (config: Config) => {
  return await invoke("set_config", { config })
}