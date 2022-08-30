import stringCss from './stringCss.js'
//面向对象
const player = {
  id: undefined,
  time: 100,
  ui: {
    demo: document.querySelector('#demo'),
    demo2: document.querySelector('#demo2')
  },
  //表驱动编程
  events: {
    '#btnPause': 'pause',
    '#btnPlay': 'play',
    '#btnSlow': 'slow',
    '#btnNormal': 'normal',
    '#btnFast': 'fast'
  },
  n: 1,
  init: () => {
    // 同时操作demo和demo2，展示文本和渲染样式
    player.ui.demo.innerText = stringCss.substring(0, player.n)
    player.ui.demo2.innerHTML = stringCss.substring(0, player.n)
    player.bindEvents()
    player.play()
  },
  //绑定按钮事件
  bindEvents: () => {
    for (let key in player.events) {
      if (player.events.hasOwnProperty(key)) {
        const value = player.events[key] // pause / play / slow
        document.querySelector(key).onclick = player[value] //这是一个函数
      }
    }
  },
  run: () => {
    player.n += 1
    if (player.n > stringCss.length) {
      return window.clearInterval(player.id)
    }
    player.ui.demo.innerText = stringCss.substring(0, player.n)
    player.ui.demo2.innerHTML = stringCss.substring(0, player.n)
    player.ui.demo.scrollTop = player.ui.demo.scrollHeight //页面滚动位置为滚动条高度（页面拉底状态）
  },
  play: () => {
    window.clearInterval(player.id)//播放即销毁定时器后重新安装定时器
    player.id = setInterval(player.run, player.time)
  },
  pause: () => {
    window.clearInterval(player.id)
  },
  //变速，先销毁后重新安装定时器
  slow: () => {
    player.pause() 
    player.time = 300
    player.play()
  },
  normal: () => {
    player.pause()
    player.time = 100
    player.play()
  },
  fast: () => {
    player.pause()
    player.time = 0
    player.play()
  }
}

player.init()