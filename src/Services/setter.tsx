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

export const edit_card = async (card: Card) => {
  return await invoke("edit_card", {
    id : card.id,
    front : card.front,
    back : card.back
  })
}

export const del_card = async (card_id: number) => {
    await invoke("del_card", { cardId : card_id })
}

export const del_deck = async (deck_id: number) => {
    await invoke("del_deck", { deckId : deck_id })
}