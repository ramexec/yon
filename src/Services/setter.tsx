import { invoke } from "@tauri-apps/api/core"
import { Card, Config } from "./types"

export const add_deck = async (name : String) => {
    await invoke("add_deck", { name })
}

export const save_settings = async (config: Config) => {
  return await invoke("set_config", { config })
}

export const add_card = async (card : Card) => {
    return await invoke("add_card", { deckId : card.deck_id,
                                        front : card.front,
                                        back : card.back
     } )
}