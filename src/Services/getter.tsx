import { invoke } from "@tauri-apps/api/core"
import { Card, Config, Deck } from "./types"


export const get_decks = async () => {
  return await invoke<Deck[]>("get_decks")
}

export const get_cards = async (id: number) => {
  return await invoke<Card[]>("get_cards", {
    deckId: id
  })
}

export const load_settings = async() => {
  return await invoke<Config>("get_config")
}

