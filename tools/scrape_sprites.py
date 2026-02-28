"""
Pokémon Crystal sprite scraper
================================
Downloads Pokémon front sprites, back sprites, and item bag sprites from
Bulbagarden Archives (https://archives.bulbagarden.net) and writes a
SOURCES.txt attribution file alongside every batch.

Source: Bulbagarden Archives — https://archives.bulbagarden.net
Sprites are the intellectual property of Nintendo / Game Freak.

Usage
-----
    pip install requests beautifulsoup4
    python tools/scrape_sprites.py [--out-dir ./crystal_sprites]
"""
from __future__ import annotations

import argparse
import os
import time
import random
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup

BASE = "https://archives.bulbagarden.net"

# Each entry: (category URL, output sub-directory name)
CATEGORIES: list[tuple[str, str]] = [
    (
        "https://archives.bulbagarden.net/wiki/Category:Crystal_sprites",
        "pokemon/front",
    ),
    (
        "https://archives.bulbagarden.net/wiki/Category:Crystal_back_sprites",
        "pokemon/back",
    ),
    (
        "https://archives.bulbagarden.net/wiki/Category:Generation_II_item_bag_sprites",
        "items",
    ),
]

ATTRIBUTION = (
    "Sprites sourced from Bulbagarden Archives — https://archives.bulbagarden.net\n"
    "Sprites are the intellectual property of Nintendo / Game Freak.\n"
    "Bulbagarden Archives content is available under the Creative Commons\n"
    "Attribution-NonCommercial-ShareAlike 2.5 license unless otherwise noted.\n"
    "See https://archives.bulbagarden.net/wiki/Bulbagarden_Archives:Copyrights\n"
)

# Minimum and maximum polite delay between requests (seconds)
DELAY_MIN = 0.3
DELAY_MAX = 0.7

HEADERS = {
    "User-Agent": "sprite-downloader/1.0 (+https://github.com/shelbeely/css-pokemon-gameboy; polite scraping)"
}

session = requests.Session()
session.headers.update(HEADERS)


def get_soup(url: str) -> BeautifulSoup:
    try:
        r = session.get(url, timeout=30)
        r.raise_for_status()
    except requests.RequestException as e:
        raise RuntimeError(f"Failed to fetch {url}: {e}") from e
    return BeautifulSoup(r.text, "html.parser")


def extract_file_page_links(category_url: str) -> tuple[list[str], str | None]:
    """
    Returns (file_page_urls, next_page_url).
    Walks a single page of a MediaWiki category listing.
    """
    soup = get_soup(category_url)

    # Category pages list files inside #mw-pages (or the whole body as fallback)
    mw_pages = soup.find(id="mw-pages") or soup

    file_urls: list[str] = []
    for a in mw_pages.select('a[href^="/wiki/"]'):
        href = a.get("href", "")
        text = (a.get_text() or "").strip()

        # Skip pagination links
        if text.lower() in {"next page", "previous page"}:
            continue

        # Accept File: pages and links whose visible text looks like an image filename
        if (
            href.startswith("/wiki/File:")
            or "File%3A" in href
            or text.lower().endswith((".png", ".gif", ".jpg", ".jpeg", ".webp"))
        ):
            file_urls.append(urljoin(BASE, href))

    # Find "next page" pagination link
    next_url: str | None = None
    for a in soup.select("a"):
        if (a.get_text() or "").strip().lower() == "next page":
            href = a.get("href")
            if href:
                next_url = urljoin(BASE, href)
            break

    # De-duplicate while preserving order
    seen: set[str] = set()
    deduped: list[str] = []
    for u in file_urls:
        if u not in seen:
            seen.add(u)
            deduped.append(u)

    return deduped, next_url


def direct_media_url(file_page_url: str) -> str:
    """Resolve a MediaWiki File: page to the direct download URL."""
    soup = get_soup(file_page_url)

    # Primary: div.fullMedia contains the original-resolution link
    a = soup.select_one("div.fullMedia a")
    if not a or not a.get("href"):
        # Fallback: first link that points into /media/upload/
        for cand in soup.select("a[href]"):
            href = cand["href"]
            if "/media/upload/" in href:
                a = cand
                break

    if not a or not a.get("href"):
        raise RuntimeError(f"Could not find direct media link on {file_page_url}")

    return urljoin(BASE, a["href"])


def download(url: str, out_dir: str) -> str:
    """Download *url* into *out_dir*, skipping files that already exist."""
    os.makedirs(out_dir, exist_ok=True)
    filename = os.path.basename(urlparse(url).path)
    path = os.path.join(out_dir, filename)

    if os.path.exists(path) and os.path.getsize(path) > 0:
        return path  # already downloaded

    with session.get(url, stream=True, timeout=60) as r:
        r.raise_for_status()
        tmp = path + ".part"
        with open(tmp, "wb") as f:
            for chunk in r.iter_content(chunk_size=1024 * 256):
                if chunk:
                    f.write(chunk)
        os.replace(tmp, path)

    return path


def write_attribution(out_dir: str, category_url: str) -> None:
    """Write a SOURCES.txt file crediting Bulbagarden Archives."""
    path = os.path.join(out_dir, "SOURCES.txt")
    with open(path, "w", encoding="utf-8") as f:
        f.write(ATTRIBUTION)
        f.write(f"\nCategory page: {category_url}\n")


def scrape_category(category_url: str, out_dir: str) -> int:
    """
    Download all sprites in a MediaWiki category (following pagination).
    Returns the number of files successfully downloaded.
    """
    write_attribution(out_dir, category_url)

    cat_url: str | None = category_url
    total = 0

    while cat_url:
        print(f"\n[category] {cat_url}")
        file_pages, next_page = extract_file_page_links(cat_url)
        print(f"  found {len(file_pages)} file page links")

        for fp in file_pages:
            try:
                media = direct_media_url(fp)
                saved = download(media, out_dir)
                total += 1
                print(f"  ✓ {os.path.basename(saved)}")
            except Exception as e:
                print(f"  ✗ {fp} -> {e}")

            # Be polite: small random jitter so we don't hammer the server
            time.sleep(DELAY_MIN + random.random() * (DELAY_MAX - DELAY_MIN))

        cat_url = next_page

    return total


def main() -> None:
    global DELAY_MIN, DELAY_MAX

    parser = argparse.ArgumentParser(
        description="Download Pokémon Crystal sprites and item sprites from Bulbagarden Archives."
    )
    parser.add_argument(
        "--out-dir",
        default="./crystal_sprites",
        help="Root output directory (default: ./crystal_sprites)",
    )
    parser.add_argument(
        "--delay-min",
        type=float,
        default=DELAY_MIN,
        help=f"Minimum delay between requests in seconds (default: {DELAY_MIN})",
    )
    parser.add_argument(
        "--delay-max",
        type=float,
        default=DELAY_MAX,
        help=f"Maximum delay between requests in seconds (default: {DELAY_MAX})",
    )
    args = parser.parse_args()

    DELAY_MIN = args.delay_min
    DELAY_MAX = args.delay_max

    root = args.out_dir
    grand_total = 0

    for category_url, sub_dir in CATEGORIES:
        out_dir = os.path.join(root, sub_dir)
        print(f"\n{'=' * 60}")
        print(f"Scraping: {category_url}")
        print(f"Into:     {out_dir}")
        print("=" * 60)
        count = scrape_category(category_url, out_dir)
        grand_total += count
        print(f"  -> {count} file(s) saved to {out_dir}")

    print(f"\nDone. Downloaded {grand_total} file(s) in total into {root}/")
    print(f"Attribution files written to each sub-directory as SOURCES.txt")


if __name__ == "__main__":
    main()
