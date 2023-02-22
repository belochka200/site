const navItems = document.querySelectorAll(".nav-item")
const infoBlocks = document.querySelectorAll(".info")
const closeBtns = document.querySelectorAll(".close-btn")
const navBtn = document.querySelector(".nav-button")
const closeNavBtn = document.querySelector(".nav-button-close-menu")
const nav = document.getElementsByTagName("nav")[0]
const animationTime = 250

function unactiveAllMenuItems() {
  navItems.forEach((navItem) => {
    navItem.classList.remove("active")
  })
}

function closeAllInfoBlocks() {
  unactiveAllMenuItems()
  infoBlocks.forEach((block) => {
    block.style.transform = "translateX(-100%)"
    setTimeout(() => {
      block.style.display = "none"
    }, animationTime)
  })
}

function showBlock(block) {
  setTimeout(() => {
    block.style.display = "block"
    block.style.position = 'absolute'
    block.style.top = 0
    block.style.left = 0
    setTimeout(() => {
      block.style.transform = "translateX(0)"
    }, animationTime)
  }, animationTime)
}

function changeMenuVisible() {
  if (nav.classList.contains("active")) {
    nav.classList.remove("active")
    navBtn.classList.remove("menu-active")
    closeNavBtn.classList.remove("menu-active")
  } else {
    closeAllInfoBlocks()
    nav.classList.add("active")
    navBtn.classList.add("menu-active")
    closeNavBtn.classList.add("menu-active")
  }
}

window.addEventListener('load', () => {
  // работа с картой
  const svgObject = document.querySelector('object').contentDocument
  svgObject.querySelectorAll('.area').forEach((item) => {
    console.log(item)
  })
  // console.log(svgObject.querySelector('.area-1'))

  closeAllInfoBlocks()

  navItems.forEach((navItem) => {
    navItem.addEventListener("click", () => {
      closeAllInfoBlocks()
      changeMenuVisible()
      infoBlocks.forEach((block) => {
        if (block.getAttribute("id") === navItem.getAttribute("id")) {
          navItem.classList.add("active")
          nav.classList.remove("active")
          navBtn.classList.remove("menu-active")
          showBlock(block)
        }
      })
    })
  })

  closeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      unactiveAllMenuItems()
      closeAllInfoBlocks()
    })
  })

  navBtn.addEventListener("click", () => {
    changeMenuVisible()
  })

  closeNavBtn.addEventListener("click", () => {
    changeMenuVisible()
  })
})