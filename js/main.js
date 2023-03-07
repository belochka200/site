const ANIMATION_TIME = 250

const navigationItems = document.querySelectorAll('.nav-item')
const infoBlocks = document.querySelectorAll('.info')
const closeInfoBlockButtons = document.querySelectorAll('.close-btn')
const navigationButtons = document.querySelector('.nav-button')
const closeNavigationMenuButton = document.querySelector(
  '.nav-button-close-menu'
)
const navBar = document.getElementsByTagName('nav')[0]
const audio = new Audio()
audio.volume = 0.7

const audioList = {
  1: 'https://belochka200.github.io/site/audio/Остленд.m4a',
  2: 'https://belochka200.github.io/site/audio/Украина.m4a',
  3: 'https://belochka200.github.io/site/audio/Дон волга.m4a',
  4: 'https://belochka200.github.io/site/audio/Кавказ.m4a',
  5: 'https://belochka200.github.io/site/audio/Туркестан.m4a',
  6: 'https://belochka200.github.io/site/audio/Урал.m4a',
  7: 'https://belochka200.github.io/site/audio/Москгвия.m4a',
}

// Убирает актив со всех пунктов меню
function unactiveAllMenuItems() {
  audio.play = false
  audio.src = ''
  navigationItems.forEach((navItem) => {
    navItem.classList.remove('active')
  })
}

// Закрывает все блоки информации
function closeAllInfoBlocks() {
  unactiveAllMenuItems()
  audio.play = false
  audio.autoplay = false
  audio.src = ''

  const svgObject = document.querySelector('object').contentDocument
  const areas = svgObject.querySelectorAll('.area')
  areas.forEach((area) => {
    area.classList.remove('active')
  })
  infoBlocks.forEach((block) => {
    if (block.style.transform !== 'translateX(-100%)') {
      block.style.transform = 'translateX(-100%)'
      setTimeout(() => {
        block.style.display = 'none'
      }, ANIMATION_TIME)
    }
  })
}

function showBlock(id) {
  closeAllInfoBlocks()
  setTimeout(() => {
    infoBlocks.forEach((block) => {
      if (block.getAttribute('id') === id) {
        audio.src = audioList[Number(block.getAttribute('id'))]
        audio.autoplay = true
        block.style.display = 'block'
        block.style.position = 'absolute'
        block.style.top = 0
        block.style.left = 0
        setTimeout(() => {
          block.style.transform = 'translateX(0)'
        }, ANIMATION_TIME)
      }
    })
  }, ANIMATION_TIME)
}

function changeMenuVisible() {
  if (navBar.classList.contains('active')) {
    navBar.classList.remove('active')
    navigationButtons.classList.remove('menu-active')
    closeNavigationMenuButton.classList.remove('menu-active')
  } else {
    closeAllInfoBlocks()
    navBar.classList.add('active')
    navigationButtons.classList.add('menu-active')
    closeNavigationMenuButton.classList.add('menu-active')
  }
}

window.addEventListener('load', () => {
  // работа с картой
  const svgObject = document.querySelector('object').contentDocument
  const areas = svgObject.querySelectorAll('.area')
  areas.forEach((area) => {
    area.addEventListener('click', () => {
      closeAllInfoBlocks()
      areas.forEach((area) => {
        area.classList.remove('active')
      })
      showBlock(area.getAttribute('id'))
      area.classList.add('active')
      navigationItems.forEach((navItem) => {
        if (navItem.getAttribute('id') === area.getAttribute('id')) {
          navItem.classList.add('active')
        }
      })
    })
  })

  closeAllInfoBlocks()

  navigationItems.forEach((navItem) => {
    const svgObject = document.querySelector('object').contentDocument
    const areas = svgObject.querySelectorAll('.area')
    navItem.addEventListener('click', () => {
      closeAllInfoBlocks()
      changeMenuVisible()
      infoBlocks.forEach((block) => {
        if (block.getAttribute('id') === navItem.getAttribute('id')) {
          navItem.classList.add('active')
          navBar.classList.remove('active')
          navigationButtons.classList.remove('menu-active')
          showBlock(block.getAttribute('id'))
        }
      })
      areas.forEach((area) => {
        if (area.getAttribute('id') === navItem.getAttribute('id')) {
          area.classList.add('active')
        }
      })
    })
  })

  closeInfoBlockButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      unactiveAllMenuItems()
      closeAllInfoBlocks()
    })
  })

  navigationButtons.addEventListener('click', () => {
    changeMenuVisible()
  })

  closeNavigationMenuButton.addEventListener('click', () => {
    changeMenuVisible()
  })
})
