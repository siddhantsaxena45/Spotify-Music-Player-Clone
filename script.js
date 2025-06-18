let main = document.querySelector('.main');
let timeout;

main.addEventListener('scroll', () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        if (main.scrollTop > 0) {
            main.classList.add('main2');
        } else {
            main.classList.remove('main2');
        }
    }, 100);
});

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

let currentsong = new Audio();
let songs = [];
let currfolder;
let locate = window.location.pathname;
let loc = locate.substring(1, locate.lastIndexOf("/"));
async function getsongs(folder) {
    currfolder = folder;
    let a = await fetch(`/${folder}/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1]);
        }
    }

    let songul = document.querySelector(".songlist ul");
    songul.innerHTML = "";
    for (const song of songs) {
        songul.innerHTML += ` 
        <li> 
            <img src="images/music.svg" alt="">
            <div class="songinfo">
                <div class="songname">${song.replaceAll('%20', " ")}</div>
            </div>
            <div class="playnow">
                <span>Play now</span>
                <img src="images/start.svg" alt="">  
            </div>
        </li>`;
    }

    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(element => {
        element.addEventListener("click", () => {
            let track = element.querySelector(".songname").innerHTML.trim();
            playmusic(track);
        });
    });

    return songs;
}

function playmusic(track, pause = false) {
    currentsong.src = `${currfolder}/` + track;
    if (!pause) {
        currentsong.play();
        play.src = "images/pause.svg";
    }
    document.querySelector(".info").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00/00:00";
}

// async function displayalbums() {
//     let a = await fetch(`/songs/playlist/`);
//     console.log(`${loc}songs/playlist/`);
//     let response = await a.text();
//     console.log(response);
//     let div = document.createElement("div");
//     div.innerHTML = response;
//     let anchor = div.getElementsByTagName("a");
//     let cardcontainer = document.querySelector(".cardsContainer");

//     for (let element of anchor) {
//         if (element.href.includes("/playlist")) {
//             let folder = element.href.split("/").slice(-2)[0];
//             let a = await fetch(`/songs/playlist/${folder}/info.json`);
//             let response = await a.json();
//             cardcontainer.innerHTML += `
//             <div data-folder="${folder}" class="card cardscript">
//                 <img src="/songs/playlist/${folder}/cover.jpg" alt="">
//                 <h3>${response.title}</h3>
//                 <p>${response.description}</p>
//                 <div class="play"><img src="images/play.svg" alt=""></div>
//             </div>`;
//         }
//     }
// }
async function displayalbums() {
    let res = await fetch("/songs/playlist/index.json");
    let playlists = await res.json();
    let cardcontainer = document.querySelector(".cardsContainer");

    for (let playlist of playlists) {
        let folder = playlist.folder;
        cardcontainer.innerHTML += `
            <div data-folder="${folder}" class="card cardscript">
                <img src="/songs/playlist/${folder}/cover.jpg" alt="">
                <h3>${playlist.title}</h3>
                <p>${playlist.description}</p>
                <div class="play"><img src="images/play.svg" alt=""></div>
            </div>`;
    }

    // Bind click after loading
    Array.from(document.querySelectorAll(".card")).forEach(element => {
        element.addEventListener("click", async item => {
            songs = await getsongs(`songs/playlist/${item.currentTarget.dataset.folder}`);
            playmusic(songs[0]);
        });
    });
}


async function man() {
    await displayalbums();
    await getsongs(`songs/artists/pritam`);
    playmusic(songs[0], true);

    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play();
            play.src = "images/pause.svg";
        } else {
            currentsong.pause();
            play.src = "images/start.svg";
        }
    });

    currentsong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentsong.currentTime)}/${secondsToMinutesSeconds(currentsong.duration)}`;
        document.querySelector(".circle").style.left = ((currentsong.currentTime / currentsong.duration) * 100) + "%";
    });

    document.querySelector(".seekbar").addEventListener("click", (e) => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentsong.currentTime = percent / 100 * currentsong.duration;
    });

    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = 0;
    });

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    });

    document.querySelector(".volume>img").addEventListener("click", (e) => {
        if (e.target.src.includes("volume.svg")) {
            e.target.src = e.target.src.replace("volume.svg", "mute.svg");
            currentsong.volume = 0;
            volume.value = 0;
        } else {
            e.target.src = e.target.src.replace("mute.svg", "volume.svg");
            currentsong.volume = 0.1;
            volume.value = 10;
        }
    });

    previous.addEventListener("click", () => {
        currentsong.pause();
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0]);
        if ((index - 1) >= 0) {
            playmusic(songs[index - 1]);
        }
    });

    next.addEventListener("click", () => {
        currentsong.pause();
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0]);
        if ((index + 1) < songs.length) {
            playmusic(songs[index + 1]);
        }
    });

    volume.addEventListener("change", (e) => {
        currentsong.volume = parseInt(e.target.value) / 100;
    });

    Array.from(document.querySelectorAll(".card")).forEach(element => {
        element.addEventListener("click", async item => {
            songs = await getsongs(`songs/playlist/${item.currentTarget.dataset.folder}`);
            playmusic(songs[0]);
        });
    });

    Array.from(document.querySelectorAll(".artistCard")).forEach(element => {
        element.addEventListener("click", async item => {
            songs = await getsongs(`songs/artists/${item.currentTarget.dataset.folder}`);
            playmusic(songs[0]);
        });
    });
}

man();
