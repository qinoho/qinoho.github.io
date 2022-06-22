// const json = [{"mnum":1,"mpath":"108 个关键词 2012 Live","root_path":"/"},{"mnum":2,"mpath":"1701(2014)","root_path":"/"},{"mnum":3,"mpath":"8(2016)","root_path":"/"},{"mnum":4,"mpath":"F","root_path":"/"},{"mnum":5,"mpath":"Imagine 2011 Live","root_path":"/"},{"mnum":6,"mpath":"[IO2014]","root_path":"/"},{"mnum":7,"mpath":"二零零九年十月十六日事件","root_path":"/"},{"mnum":8,"mpath":"你好，郑州","root_path":"/"},{"mnum":9,"mpath":"动静 2015 Live","root_path":"/"},{"mnum":10,"mpath":"勾三搭四","root_path":"/"},{"mnum":11,"mpath":"北京不插电现场","root_path":"/"},{"mnum":12,"mpath":"在每一条伤心的应天大街上(2016)","root_path":"/"},{"mnum":13,"mpath":"工体东路没有人 2009 Live","root_path":"/"},{"mnum":14,"mpath":"我爱南京","root_path":"/"},{"mnum":15,"mpath":"李先生的1701","root_path":"/"},{"mnum":16,"mpath":"梵高先生","root_path":"/"},{"mnum":17,"mpath":"洗心革面(2019)","root_path":"/"},{"mnum":18,"mpath":"爵士与不插电新编12首","root_path":"/"},{"mnum":19,"mpath":"电声与管弦乐","root_path":"/"},{"mnum":20,"mpath":"电声与管弦乐II","root_path":"/"},{"mnum":21,"mpath":"看见 2015 Live","root_path":"/"},{"mnum":22,"mpath":"被禁忌的游戏","root_path":"/"},{"mnum":23,"mpath":"这个世界会好吗","root_path":"/"},{"mnum":24,"mpath":"限量未发","root_path":"/"}]

const alumb_list = document.querySelector("#alumb_list > ul")
/* <li><span>1</span>天空之城啦啦啦</li> */

const renderList = async function () {
  const json = await fetchAlubmJson()
  json.forEach( path => {
    const alumb_list_ul = document.createElement("li")
    const alumb_list_ul_span = document.createElement("span")
    let path_num = null
    if (path["mnum"] < 10) {
     path_num = '0' + path["mnum"]
    } else {
      path_num = path["mnum"]
    }
  
    alumb_list_ul_span.innerText = path_num
    alumb_list_ul.appendChild(alumb_list_ul_span)
  
    const alumb_list_ul_text = document.createTextNode(path["mpath"])
    alumb_list_ul.appendChild(alumb_list_ul_text)
  
    alumb_list.appendChild(alumb_list_ul)
  })
}

renderList()

// const displayMusicList = function (musicList) {
//   console.log(musicList)
// }

setTimeout(async () => {
  const lis = document.querySelectorAll("#alumb_list > ul > li")
  const music = await fetchMusicJson()
  for(const li in lis) {
    if(li < lis.length) {
      lis[li].onclick = () => {
        waitIndex = -1
        displayMusicList(music[li], li)
      }
    }
  }
}, 1000);