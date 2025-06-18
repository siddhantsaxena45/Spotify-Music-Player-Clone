
live https://siddhantsaxena45.github.io/Spotify-Music-Player-Clone/

# 🎧 Spotify Music Player Clone

A lightweight Spotify-inspired music player built with HTML, CSS, and JavaScript. Users can browse albums and artists, view covers, and play MP3 songs—all from a neat UI!

---

## 🚀 Features

- 🔊 Audio playback with controls (play, pause, next, previous, volume, seek)
- 🎨 Responsive music UI with playlists and artist browsing
- 📁 Organized song folders by playlist and artist
- 🧠 Scroll effects and interaction feedback
- 📂 Auto-generated `info.json` files for song lists

---

## 📁 Folder Structure



Spotify-Music-Player/
│
├── images/               # UI icons (play, pause, music icon, etc.)
├── singers/              # Artist images (named after folder)
├── songs/
│   ├── playlist/
│   │   ├── <album-folder>/
│   │   │   ├── song1.mp3
│   │   │   ├── cover.jpg
│   │   │   └── info.json
│   │   └── index.json    # Lists all playlists
│   └── artists/
│       ├── <artist-folder>/
│       │   ├── song1.mp3
│       │   └── info.json
│       └── index.json    # Lists all artists
├── style.css
├── script.js
└── index.html


---

## 🧾 JSON Format

### `songs/playlist/<album>/info.json`

```
{
  "title": "Album Title",
  "description": "Artist Name",
  "songs": [
    "song1.mp3",
    "song2.mp3"
  ]
}
```

### `songs/artists/<artist>/info.json`

```
{
  "songs": [
    "formatted_song_name.mp3"
  ]
}
```

🎯 **Tip:** All filenames use lowercase, hyphens/underscores only. Example:
`pehle_bhi_main-vishal_mishra.mp3`

---

## 🛠️ How to Run

1. Clone or download the repo:

```
git clone https://github.com/siddhantsaxena45/Spotify-Music-Player-Clone.git
```

2. Open `index.html` in any browser.

> ⚠️ Chrome blocks autoplay from GitHub Pages sometimes. Use [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) or serve locally.

---


## 🧑‍💻 Author

**Siddhant Saxena**
🔗 [GitHub](https://github.com/siddhantsaxena45)

---

## 📄 License

MIT License. Free to use for learning purposes. Attribution appreciated ❤️
