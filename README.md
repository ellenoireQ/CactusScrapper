# Cactus Scraper

![Logo](src-tauri/icons/icon.png)

A Simple and Lightweight web scraping application built with Rust, Tauri, and Reqwest/Scraper. Using material design color scheme for beauty UI.

---

## 🚀 Features

- Fetch HTML content from any URL

---

## Preview
![prev](public/ss1.png)
![prev](public/ss2.png)

## Build from source
```bash
# Cloning
git clone https://github.com/ellenoireQ/CactusScrapper cactus-scrapper
cd cactus-scrapper

# Installing
npm install

# building
npm run tauri build

# Output

# MSI
 <PATH>src-tauri\target\release\bundle\msi\cactus-scrapper_0.1.0_x64_en-US.msi

# Exe
<PATH>\src-tauri\target\release\bundle\nsis\cactus-scrapper_0.1.0_x64-setup.exe
```

## 📦 Dependencies
```toml
[dependencies]
tauri = { version = "2", features = [] }
tauri-plugin-opener = "2"
serde = { version = "1", features = ["derive"] }
serde_json = "1"
tokio = {version="1.48.0", features = ["rt-multi-thread", "macros"] }
reqwest = {version="0.12.24", features = ["json", "rustls-tls"] }
scraper = "0.24.0"
```
