function displayMinMusicList (target) {
  const minMusicList = document.querySelector("#min_music_list")
  minMusicList.innerHTML = ''
  const ul = document.createElement('ul')
  for (index in target){
    const li = document.createElement('li')
    const musicName = target[index].split('/').at(-1).replace(/\.(mp3|m4a|flac|wav)/, '')
    const text = document.createTextNode((parseInt(index) + 1) +' ' + musicName)
    li.appendChild(text)
    ul.appendChild(li)
  }

  minMusicList.appendChild(ul)
}

let listProxy = new Proxy(palyer_music_lists, {
  set: function (target, property, value, reciver) {
    // target[property] = value
    Reflect.set(target, property, value, reciver)
    displayMinMusicList(target)
    return true;
  }
})