document.addEventListener("DOMContentLoaded", function () {

  const audio = document.getElementById("song");
  const playBtn = document.getElementById("playBtn");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const progress = document.getElementById("progress");
  const title = document.querySelector(".song-info h1");
  const album = document.getElementById("album");
  const lyricsContainer = document.querySelector(".right-section");
  const currentLine = document.getElementById("currentLine");

  const songs = [

    {
      name: "Gaaju Bomma 💕",
      file: "Gajjubomma.mp3",
      image: "Gaaju.png",
      lyrics: [
        { time: 1, text: "Itu raave naa gaajubomma.." },
        { time: 6, text: "nene nanna amma.." },
        { time: 10, text: "yeda neeku uyyala komma.." },
        { time: 14, text: "ninnupe cheyye prema.." },
        { time: 19, text: "valipo....." },
        { time: 22, text: "Ee gundepaine.." },
        { time: 27, text: "aduko...." },
        { time: 31, text: "Ee gutilone.." },
        { time: 38, text: "dooram pobokuma..." }
      ]
    },

    {
      name: "Oo Chedhu Nijam 🎶",
      file: "chedunijam.mp3",
      image: "chedhunijam.png",
      lyrics: [
        { time: 1, text: "🎶" }, 
        { time: 10, text: "Swapnaalanni kalla munde karigenilaa.." }, 
        { time: 15, text: "Ayinaa edho Aasha Needhigaa.." }, 
        { time: 20, text: "evaindho Ee prema putte Okkasaariga.." }, 
        { time: 26, text: "Endhukante Cheppalevugaa..." }, 
        { time: 30, text: "Edhedho Oohichaava.." }, 
        { time: 32, text: "Praanamgaa Preminchaava.." }, 
        { time: 35, text: "Haa Ye ye..." }, 
        { time: 36, text: "Gunde patti laage" }, 
        { time: 38, text: "Gunde patti laage" }, 
        { time: 41, text: "Enaadu choodandhi Ee bhadhe.." }, 
        { time: 43, text: "..." }, { time: 45, text: "Oo chedhu Nijam" }, 
        { time: 48, text: "Ventaade Gatham" }, 
        { time: 50, text: "Mana kalalani dhoorame chesenu chesenu," }, 
        { time: 56, text: "Chedhu nijam " }, 
        { time: 58, text: "Gaayaala gatham" }, 
        { time: 61, text: "mana premani dhoorame" }, 
        { time: 65, text: "chessenugaa.." }, 
        { time: 66, text: "🎶" }
      ]
    },

    {
      name: "Ammaadi❤️🎼",
      file: "ammaadi.mp3",
      image: "ammadi.png",
      lyrics: [
        
        { time: 3, text: "ha ha haaa aa aa" },
        { time: 7, text: "pranam alladi podha Ammadi" },
        { time: 12, text: "Andham kattesukunte ammadi" },
        { time: 17, text: "inka kallone unna ammadi" },
        { time: 23, text: "Ee mate antu untu rojantha" },
        { time: 27, text: "nannodhaladuga" },
        { time: 30, text: "hey mudhu mudhu mudhantune" },
        { time: 33, text: "mudhosthadem" },
        { time: 35, text: "hey ha" },
        { time: 36, text: "kale nene thakadhantu" },
        { time: 39, text: "mudhosthadem" },
        { time: 40, text: "hey ha" },
        { time: 41, text: "uppu mota ethesthune " },
        { time: 44, text: "mudhosthade..." },
        { time: 47, text: "kopam lonu" },
        { time: 49, text: "mudhosthade" },
        { time: 52, text: "🎶" }

        
      ]
    }

  ];

  let songIndex = 0;

  function loadSong(index) {

    const song = songs[index];

    audio.src = song.file;
    title.textContent = song.name;
    album.src = song.image;

    lyricsContainer.innerHTML = "";

    song.lyrics.forEach(line => {
      const p = document.createElement("p");
      p.dataset.time = line.time;
      p.textContent = line.text;
      lyricsContainer.appendChild(p);
    });

    progress.value = 0;
    currentLine.textContent = "Press Play 🎵";
  }

  /* PLAY / PAUSE */
  playBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      playBtn.textContent = "❚❚";
    } else {
      audio.pause();
      playBtn.textContent = "▶";
    }
  });

  /* NEXT */
  nextBtn.addEventListener("click", () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
    audio.play();
    playBtn.textContent = "❚❚";
    });
    
  /* AUTO PLAY NEXT WHEN SONG ENDS */
  audio.addEventListener("ended", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  audio.play();
  playBtn.textContent = "❚❚";
  });
  

  /* PREVIOUS */
  prevBtn.addEventListener("click", () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songIndex);
    audio.play();
    playBtn.textContent = "❚❚";
  });

  /* AUTO SCROLL + PROGRESS */
  audio.addEventListener("timeupdate", () => {

    if (!audio.duration) return;

    progress.value = (audio.currentTime / audio.duration) * 100;

    const lines = document.querySelectorAll(".right-section p");

    lines.forEach((line, index) => {

      const start = parseFloat(line.dataset.time);
      const nextLine = lines[index + 1];
      const end = nextLine ? parseFloat(nextLine.dataset.time) : audio.duration + 1;

      if (audio.currentTime >= start && audio.currentTime < end) {

        line.classList.add("active");
        currentLine.textContent = line.textContent;

        const center = line.offsetTop - (lyricsContainer.clientHeight / 2) + (line.clientHeight / 2);

        lyricsContainer.scrollTo({
          top: center,
          behavior: "smooth"
        });

      } else {
        line.classList.remove("active");
      }

    });

  });

  /* SEEK */
  progress.addEventListener("input", () => {
    if (!audio.duration) return;
    audio.currentTime = (progress.value / 100) * audio.duration;
  });

  loadSong(songIndex);

});
