document.getElementById('search').addEventListener('click', () => {
    var searchInput = document.getElementById('show').value;
    fetch(`https://api.lyrics.ovh/suggest/` + searchInput)
    .then(response => response.json())
    .then(data => display(data));
    
    document.getElementById('show').value = "";
});
display = (data) => {
    let songData = data.data;
    let songList = [];
    for (let i = 0; i < songData.length; i++) {
        const item = songData[i];
        const songTitle = item.title;
        const albumTitle = item.album.title;
        const artistName = item.artist.name;
        const artistImg = item.artist.picture_small;
        const songDetails = [];
        songList.push(songDetails);
let showResult = document.getElementById('result');
        if (songList.length <= 10) {
            
            showResult.innerHTML += `<div class="single-result row align-items-center my-2 p-3">
                                       <img src="${artistImg}" class="img-fluid artist-image">
                                       <div class="col-md-8">
                                       <h3 class="lyrics-name">${songTitle}</h3>
                                       <p class="author lead">Album: <span>${albumTitle}</span></p>
                                       <p class="author lead mt-n3">Artist: <span>${artistName}</span></p>
                                       </div>
                                       <div class="col-md-3 text-md-right text-center">
                                       <a href="#" onclick="getLyrics('${songTitle}', '${artistName}')" class="btn btn-success">Get Lyrics</a>
                                       </div>
                                       </div>`
        }
        
    };
    document.getElementById('clean').addEventListener('click', () => {
        document.getElementById('result').innerText = "";
    })
    document.getElementById('homepage').addEventListener('click', () => {
        document.getElementById('from').innerText = "";
    })
};
getLyrics = (songTitle, artistName) => {
    fetch(`https://api.lyrics.ovh/v1/${artistName}/${songTitle}`)
        .then(response => response.json())
        .then(data => displayLyrics(data, songTitle, artistName))

        document.getElementById('result').style.display = "none";
        document.getElementById('homePage').style.display = "block";
        document.getElementById('homePage').addEventListener('click', () => {
        document.getElementById('from').innerText = "";
       })
    }
 displayLyrics = (data, songTitle, artistName) => {
    document.getElementById('title').innerText = songTitle;

    document.getElementById('name').innerText = '- ' + artistName;
    if(data.lyrics){
        document.getElementById('lyricSong').innerText = data.lyrics;
    }
   else{
    document.getElementById('lyricSong').innerText = 'your result is not found';
}
};
 
   
