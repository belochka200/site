const audio = new Audio()
const backgroundAudio = new Audio()
backgroundAudio.src =
  'https://belochka200.github.io/site/audio/backgroundmusic.mp3'
backgroundAudio.volume = 0.2
backgroundAudio.autoplay = true
backgroundAudio.loop = true

window.addEventListener('load', () => {
  document.querySelector('.loader').classList.add('loaded')
  const buttonsListen = document.querySelectorAll('.button.button-listen')
  buttonsListen.forEach((button) => {
    button.addEventListener('click', () => {
      switch (Number(button.getAttribute('id'))) {
        case 1:
          playExcursion(
            '.block1',
            'https://belochka200.github.io/site/audio/1.mp3',
            139
          )
          break
        case 2:
          playExcursion(
            '.block2',
            'https://belochka200.github.io/site/audio/Пункт 2 целиком.m4a',
            92
          )
          break
        case 3:
          playExcursion(
            '.block3',
            'https://belochka200.github.io/site/audio/reichkom.mp3',
            404
          )
          break
        case 4:
          playExcursion(
            '.block4',
            'https://belochka200.github.io/site/audio/Пункт 4.m4a',
            64
          )
          break
        case 5:
          playExcursion(
            '.block5',
            'https://belochka200.github.io/site/audio/Пункт 5.mp3',
            141
          )
          break
      }
    })
  })
  console.log(buttonsListen)
  const startButton = document.querySelector('.button-start')
  startButton.addEventListener('click', () => {
    playExcursion(
      '.block1',
      'https://belochka200.github.io/site/audio/1.mp3',
      139
    )
  })
  document.querySelector('.button2').addEventListener('click', () => {
    playExcursion(
      '.block2',
      'https://belochka200.github.io/site/audio/Пункт 2 целиком.m4a',
      92
    )
  })
  document.querySelector('.button3').addEventListener('click', () => {
    playExcursion(
      '.block3',
      'https://belochka200.github.io/site/audio/reichkom.mp3',
      404
    )
  })
  document.querySelector('.button4').addEventListener('click', () => {
    playExcursion(
      '.block4',
      'https://belochka200.github.io/site/audio/Пункт 4.m4a',
      64
    )
  })
  document.querySelector('.button5').addEventListener('click', () => {
    playExcursion(
      '.block5',
      'https://belochka200.github.io/site/audio/Пункт 5.mp3',
      141
    )
  })
})

function playExcursion(id, srcAudio, audioTime) {
  audio.src = ''
  audio.src = srcAudio
  audio.autoplay = true
  const heightStart =
    document.querySelector(id).offsetHeight - window.innerHeight + 32 + 56
  const heightEnd =
    window.scrollY + document.querySelector(id).offsetHeight + 32 + 16
  const anim = [
    { transform: 'translateY(0%)' },
    {
      transform: 'translateY(-' + heightStart + 'px)',
    },
  ]
  const time = {
    duration: audioTime * 1000,
    iterations: 1,
  }
  document.getElementsByTagName('body')[0].animate(anim, time)
  setTimeout(() => {
    window.scrollTo(0, heightEnd)
  }, audioTime * 1000)
}
