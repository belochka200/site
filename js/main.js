const ANIMATION_TIME = 250

const navigationItems = document.querySelectorAll('.nav-item')
const infoBlocks = document.querySelectorAll('.info')
const closeInfoBlockButtons = document.querySelectorAll('.close-btn')
const navigationButtons = document.querySelector('.nav-button')
const closeNavigationMenuButton = document.querySelector(
  '.nav-button-close-menu'
)
const navBar = document.getElementsByTagName('nav')[0]

// Убирает актив со всех пунктов меню
function unactiveAllMenuItems() {
  navigationItems.forEach((navItem) => {
    navItem.classList.remove('active')
  })
}

// Закрывает все блоки информации
function closeAllInfoBlocks() {
  unactiveAllMenuItems()
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
