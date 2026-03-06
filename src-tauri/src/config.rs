use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct AppConfig {
    pub theme: String
}

impl Default for AppConfig {
    fn default() -> Self {
        Self {
            theme: "light".into(),
        }
    }
}

pub fn config_path() -> std::path::PathBuf {
    let mut path = std::env::current_dir().unwrap();

    path.push("settings.json");
    path
}

pub fn load_config() -> AppConfig {
    let path = config_path();

    if let Ok(data) = std::fs::read_to_string(&path) {
        serde_json::from_str(&data).unwrap_or_default()
    } else {
        AppConfig::default()
    }
}

pub fn save_config(config: &AppConfig) {
    let path = config_path();

    if let Some(parent) = path.parent() {
        std::fs::create_dir_all(parent).unwrap();
    }

    let json = serde_json::to_string_pretty(config).unwrap();
    std::fs::write(path, json).unwrap();
}