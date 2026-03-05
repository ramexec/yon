mod db;
use tauri::command;


#[command]
fn add_deck(name: String) -> Result<(), String> {
    let conn = db::init_db().map_err(|e| e.to_string())?;
    db::add_deck(&conn, name).map_err(|e| e.to_string())
}

#[command]
fn get_decks() -> Result<Vec<db::Deck>, String> {
    let conn = db::init_db().map_err(|e| e.to_string())?;
    db::get_decks(&conn).map_err(|e| e.to_string())
}


#[command]
fn add_card(deck_id: i32, front: String, back: String) -> Result<(), String> {
    let conn = db::init_db().map_err(|e| e.to_string())?;
    db::add_card(&conn, deck_id,front,back).map_err(|e| e.to_string())
}

#[tauri::command]
fn get_cards(deck_id: i32) -> Result<Vec<db::Card>, String> {
    let conn = db::init_db().map_err(|e| e.to_string())?;
    db::get_cards(&conn, deck_id).map_err(|e| e.to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![add_deck,
                                                get_decks,
                                                add_card,
                                                get_cards,])
        .run(tauri::generate_context!())
        .expect("Error while running the application");
}
