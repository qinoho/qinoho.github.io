const palyer_music_lists = []
let waitIndex = 0
document.oncontextmenu = function(){
  return false;
}

const fetchAlubmJson = async function () {
  const res1 = await fetch("http://localhost:8088/data/alumb.json")
  return await res1.json()
}
const fetchMusicJson = async function () {
  const res1 = await fetch("http://localhost:8088/data/music.json")
  return await res1.json()
}
