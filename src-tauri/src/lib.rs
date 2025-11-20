#[tauri::command]
async fn parse_url(url: &str) -> Result<String, String> {
    let client = reqwest::Client::builder()
        .user_agent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
        .timeout(std::time::Duration::from_secs(15))
        .build()
        .map_err(|e| format!("Client error: {}", e))?;
    let resp = client
        .get(url)
        .header(
            "Accept",
            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        )
        .header("Accept-Language", "en-US,en;q=0.9")
        .header("DNT", "1")
        .header("Connection", "keep-alive")
        .header("Upgrade-Insecure-Requests", "1")
        .send()
        .await
        .map_err(|e| format!("Request error: {}", e))?;

    let html = resp
        .text()
        .await
        .map_err(|e| format!("Text error: {}", e))?;
    let doc = scraper::Html::parse_document(&html);

    let content_selectors = vec![
        "article",
        "main",
        "[role='main']",
        ".post-content",
        ".entry-content",
        ".article-content",
        ".article-body",
        ".post-body",
        "#content",
        ".content",
        "#main-content",
        ".main-content",
        "#body-wrap",
        ".body-wrap",
        ".page-content",
        ".site-content",
        "#article",
        ".article",
        ".markdown-body",
        ".post",
        "#readme",
    ];

    for sel in content_selectors {
        if let Ok(selector) = scraper::Selector::parse(sel) {
            if let Some(el) = doc.select(&selector).next() {
                let text: String = el.text().collect::<Vec<_>>().join(" ");
                let trimmed = text.trim();
                if trimmed.len() > 100 {
                    return Ok(trimmed.to_string());
                }
            }
        }
    }

    if let Ok(body_selector) = scraper::Selector::parse("body") {
        if let Some(body) = doc.select(&body_selector).next() {
            let full_text: String = body
                .text()
                .filter(|t| t.trim().len() > 0)
                .collect::<Vec<_>>()
                .join(" ");

            if full_text.len() > 50 {
                return Ok(full_text);
            }
        }
    }

    if html.len() > 0 {
        return Ok(format!("HTML Founded: {}", html.len()));
    }

    Ok("Cannot read this website".to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![parse_url])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
