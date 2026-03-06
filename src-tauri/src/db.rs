use rusqlite::{Connection, Result, params};
use serde::Serialize;

#[derive(Serialize)]
pub struct Deck {
    pub id: i32,
    pub name: String,
}

#[derive(Serialize)]
pub struct Card {
    pub id : i32,
    pub deck_id :i32,
    pub front : String,
    pub back : Option<String>,
}

pub fn init_db() -> Result<Connection> {
    let conn = Connection::open("flashcards.db")?;
    conn.execute(
        "CREATE TABLE IF NOT EXISTS decks (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL
        )",
        [],
    )?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS cards (
            id INTEGER PRIMARY KEY,
            deck_id INTEGER NOT NULL,
            front TEXT NOT NULL,
            back TEXT,
            FOREIGN KEY(deck_id) REFERENCES decks(id))
    ",
        [],
    )?;
    Ok(conn)
}

pub fn get_decks(conn: &Connection) -> Result<Vec<Deck>> {
    let mut stmt = conn.prepare("SELECT id, name FROM decks")?;

    let deck_iter = stmt.query_map([], |row| {
        Ok(Deck {
            id: row.get(0)?,
            name: row.get(1)?,
        })
    })?;

    let mut decks = Vec::new();

    for deck in deck_iter {
        decks.push(deck?);
    }

    Ok(decks)
}

pub fn get_cards(conn: &Connection, deck_id: i32) -> Result<Vec<Card>> {

    let mut stmt = conn.prepare(
        "SELECT id, deck_id, front, back 
         FROM cards 
         WHERE deck_id = ?1"
    )?;

    let card_iter = stmt.query_map(params![deck_id], |row| {
        Ok(Card {
            id: row.get(0)?,
            deck_id: row.get(1)?,
            front: row.get(2)?,
            back: row.get(3)?,
        })
    })?;

    let mut cards = Vec::new();

    for card in card_iter {
        cards.push(card?);
    }

    Ok(cards)
}

pub fn add_deck(conn: &Connection, name :String) -> Result<(), String> {
    conn.execute("INSERT INTO decks (name) VALUES (?1)", params![name])
        .map_err(|e| e.to_string())?;
    Ok(())
}

pub fn add_card(conn: &Connection, deck_id: i32, front: String, back: String) -> Result<(), String> {

     conn.execute(
        "INSERT INTO cards (deck_id, front, back) VALUES (?1, ?2, ?3)",
        params![deck_id, front, back],
    )
    .map_err(|e| e.to_string())?;

    Ok(())
}