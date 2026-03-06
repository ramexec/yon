import { invoke } from "@tauri-apps/api/core"

export const add_deck = async (name : String) => {
    await invoke("add_deck", { name })
}