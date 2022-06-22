const audio= document.querySelector("#top_player audio")
audio.preload = 'auto'

const source = document.createElement("source")
// source.src = "http://localhost:8000/罗庄的冬天.m4a"
// source.src = "http://localhost:8000/百分之百的女孩.mp3"
// source.src = "http://lz.mua1.top/sb//你好，郑州/关于郑州的记忆.m4a"
// source.src = "http://localhost:8088/music/百分之百的女孩.mp3"
// 添加歌曲
source.src = "http://localhost:8088/music/离婚.m4a"
audio.appendChild(source)


const player_img = document.querySelector("#player_img")

// 设置专辑图片 --- 小 --- 播放器左边
const img = document.createElement('img')
img.height = img.width = player_img.clientHeight
img.src = "http://localhost:8088/img/1.jpg"

player_img.appendChild(img)


const paly_pasue_btn = document.querySelector("#toggle_play_pause")

let toggle_play_pasue = 0 //默认暂停
let timer = null
paly_pasue_btn.onclick = () => {
  // 点击播放按钮 --- 开始播放 --- 设置定时器 --- 时间变化 --- 进度条变化
  if (!toggle_play_pasue) {
    toggle_play_pasue = 1
    document.querySelector("#toggle_play_pause > #play").style.display = 'none'
    document.querySelector("#toggle_play_pause > #pause").style.display = ''
    audio.play()
    timer = setInterval(() => {
      const with_precent = audio.currentTime / audio.duration * 100
      play_line_block.style.width = with_precent + '%'
      document.querySelector("#time_current").innerText = time_format(audio.currentTime)
    }, 500);
  } else {
    document.querySelector("#toggle_play_pause > #play").style.display = ''
    document.querySelector("#toggle_play_pause > #pause").style.display = 'none'
    // 点击暂停 --- 停止播放 --- 进度条停止变化 --- （实现 --- 清除定时器)
    toggle_play_pasue = 0
    audio.pause()
    clearInterval(timer)
    timer = null
  }
}

// 格式化时间的一个方法
const time_format = function (time) {
  let h = Math.floor(time / 60)
  let s = Math.floor(time % 60)
  h += '';
  s += '';

  //如果只有一位数，前面增加一个0
  h = (h.length == 1) ? '0' + h : h;
  s = (s.length == 1) ? '0' + s : s;

  if(isNaN(h)){
    return "&infin;"
  }
  return h + ':' + s;
}


// 动态给每首歌添加时常信息
audio.oncanplay = function () {
  const _currentTime = time_format(audio.currentTime)
  const _duration = time_format(audio.duration)
  document.querySelector("#time_current").innerText = _currentTime
  document.querySelector("#time_total").innerText = _duration

  if ( toggle_play_pasue === 0) {
    clearInterval(timer)
    timer = null
  } else {
    // 当前是播放状态 --- 判断定时是是否已经设置 
    //   --- 主要是拖动进度条会清除，重新赋值会失去上一个定时器的id --导致无法清除
    if (!timer) {
      timer = setInterval(() => {
        const with_precent = audio.currentTime / audio.duration * 100
        play_line_block.style.width = with_precent + '%'
        document.querySelector("#time_current").innerText = time_format(audio.currentTime)
      }, 500);
    }
  }
}


const play_line_line =  document.querySelector("#player_poccess_line")
const play_line_block =  document.querySelector("#player_poccess_block")
const play_line_block_slipper =  document.querySelector("#player_poccess_block span")

// 外部保存 当前播放到哪个时间了
let _currentTime = null
play_line_block_slipper.onmousedown = function (e1) {
  // 拖动进度条的时候 --- 清楚定时器 --- 防止 多方面干扰audio的时间 以及进度条的长度
  clearInterval(timer)
  timer = null
  document.onmousemove = function (e2) {
    // 拖动进度条的时候 --- 清楚定时器 --- 防止 多方面干扰audio的时间 以及进度条的长度
    clearInterval(timer)
    timer = null

    // 根据用户推动进度条的长度计算，需要设置的进度条长度---以及歌曲将要在哪里播放
    const length = e2.clientX - play_line_block.offsetLeft
    let percentLength = (length / play_line_line.clientWidth) * 100

    if (percentLength < 0) {
      percentLength = 0
    }
    if (percentLength > 100) {
      percentLength = 100
    }
    //设置进度条宽度
    play_line_block.style.width = percentLength + '%'

    // 计算用户拖动进度条到了那个时间
    _currentTime = audio.duration * (percentLength / 100)
    // 先设置当前拖动时间显示在span标签
    document.querySelector("#time_current").innerText = time_format(_currentTime)

  }
}
document.onmouseup = function () {
  //确保只有再滑块按下， document移动的时候，松开鼠标将播放时间调整
  if (play_line_block_slipper.onmousedown && document.onmousemove){
    audio.currentTime = _currentTime === null ? audio.currentTime : _currentTime
  }
  document.onmousemove = null

  // 根据当前是否是播放状态 --- 决定是否重新加载定时器
  if ( toggle_play_pasue === 0) {
    clearInterval(timer)
    timer = null
  } else {
    // 当前是播放状态 --- 判断定时是是否已经设置 
    //   --- 主要是拖动进度条会清除，重新赋值会失去上一个定时器的id --导致无法清除
    if (!timer) {
      timer = setInterval(() => {
        const with_precent = audio.currentTime / audio.duration * 100
        play_line_block.style.width = with_precent + '%'
        document.querySelector("#time_current").innerText = time_format(audio.currentTime)
      }, 500);
    }
  }

}
play_line_block_slipper.onmouseup = function () {
  document.onmousemove = null
  // 设置当前播放时间到audio
  audio.currentTime = _currentTime === null ? audio.currentTime : _currentTime 
}



// 按照播放列表播放
function playNextMusic () {
  // console.log(11111)
  waitIndex++
  const music = listProxy[waitIndex]
  // console.log(music)
  source.src = music
  audio.load()
  audio.play()
  let name = music.split('/').at(-1).replace(/\.(mp3|m4a|flac|wav)/, '')
      // console.log(name)
      // console.log(name.length)
  if (name.length > 10) {
    name = name.substr(0, 10).padEnd(13, '.')
  }
  document.querySelector("#music_name>#name").innerHTML = name


  document.querySelector("#toggle_play_pause > #play").style.display = 'none'
  document.querySelector("#toggle_play_pause > #pause").style.display = ''
  toggle_play_pasue = 1

}

audio.onended = playNextMusic