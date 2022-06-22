document.oncontextmenu = function(){
  return false;
}

// const fetchMusic = async function () {

//   const result1 = await fetch("http://localhost:8000/music", {
//     method: 'GET'
//   })
//   const result2 = await result1.json()
//   return result2.name
// }

// const setSrc = async function () {
  // const musicName = await fetchMusic()
  const audio= document.querySelector("#top_player audio")
  const source = document.createElement("source")
  
  // source.src = "http://localhost:8000/罗庄的冬天.m4a"
  // source.src = "http://localhost:8000/百分之百的女孩.mp3"
  // source.src = "http://lz.mua1.top/sb//你好，郑州/关于郑州的记忆.m4a"
  // source.src = "http://localhost:8088/music/百分之百的女孩.mp3"
  source.src = "http://localhost:8088/music/离婚.m4a"
  // source.type = "audio/mp4"
  audio.appendChild(source)
  // audio.play()
// }

// setSrc()

const player_img = document.querySelector("#player_img")

console.log(player_img.clientWidth)
const img = document.createElement('img')
img.height = img.width = player_img.clientWidth*0.3
img.src = "http://localhost:8088/img/1.jpg"

player_img.appendChild(img)

// console.log(player_img.clientHeight)
// console.log(player_img.clientWidth)
// console.log(player_img.style.width)


const paly_pasue_btn = document.querySelector("#toggle_play_pause")

let toggle_play_pasue = 0 //默认暂停
paly_pasue_btn.onclick = () => {
  if (!toggle_play_pasue) {
    toggle_play_pasue = 1
    audio.play()
  } else {
    toggle_play_pasue = 0
    audio.pause()
  }
}


// fetch("http://localhost:8088/data/alumb.json").then(res => {
//   console.log(res)
// })