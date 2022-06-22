const displayMusicList = async function (musicList, num) {
  // console.log(musicList) 
  // console.log(typeof musicList) 
  musicList = musicList['music_list']
  document.querySelector("#default_display").style.display = 'none'
  const display_detil =  document.querySelector("#detils_display")
  const display_detils =  document.querySelector("#detils_display > #dispaly_music_list")
  display_detil.style.display = 'flex'
  const ul = document.createElement('ul')
  const alumbList = await fetchAlubmJson()


  // 清除等待播放列表
  listProxy.splice(0)
  musicList.forEach(music => {
    display_detils.innerHTML = ''
    const li = document.createElement('li')
    const text = document.createTextNode(music.music)
    li.appendChild(text)
    ul.appendChild(li)
    // console.log('-----------')
    // console.log(music)
    // 把当前专辑的歌曲全部添加到代播放列表
    listProxy.push("http://localhost:8088/music/lizhi002/" + alumbList[num].mpath + '/' + music.music)




    li.onclick =  function () {
      waitIndex = musicList.indexOf(music)
      // console.log(alumbList[num].mpath + '/' + this.innerHTML)
      // console.log( musicList[num].music)
      // console.log(this)
      // const audio= document.querySelector("#top_player audio")
      // audio.innerHTML = ''
      // const source = document.createElement("source")
      source.src = "http://localhost:8088/music/lizhi002/" + alumbList[num].mpath + '/' + this.innerHTML
      // audio.appendChild(source)
      audio.load()
      audio.play()
      let name = this.innerHTML.replace(/\.(mp3|m4a|flac|wav)/, '')
      console.log(name)
      // console.log(name)
      // console.log(name.length)
      if (name.length > 10) {
        name = name.substr(0, 10).padEnd(13, '.')
      }
      document.querySelector("#music_name>#name").innerHTML = name
      // console.log(this.innerHTML.length)
      document.querySelector("#toggle_play_pause > #play").style.display = 'none'
      document.querySelector("#toggle_play_pause > #pause").style.display = ''
      toggle_play_pasue = 1

    }
    display_detils.appendChild(ul)
  });
}

const displayMinMusicListBtn = document.querySelector("#player_list")
let isDisplayMinMusicList = 0
displayMinMusicListBtn.onclick = function () {
  if (isDisplayMinMusicList) {
    document.querySelector("#min_music_list").style.display = 'none'
    isDisplayMinMusicList = 0
  } else {
    document.querySelector("#min_music_list").style.display = 'block'
    isDisplayMinMusicList = 1
  }

}
