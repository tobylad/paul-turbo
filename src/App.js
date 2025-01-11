import { Lightning, Utils } from '@lightningjs/sdk'

export default class App extends Lightning.Component {
  static getFonts() {
    return [{ family: 'Regular', url: Utils.asset('/fonts/Roboto-Regular.ttf') }]
  }

  itemIndex = null

  static movieList = [
    {
      imageSrc: '/images/fastone.webp',
      title: 'The Fast and The Furious',
      tag: 'fastone'
    },
    {
      imageSrc: '/images/fasttwo.webp',
      title: '2 Fast 2 Furious',
      tag: 'fasttwo'
    },
    {
      imageSrc: '/images/fastthree.webp',
      title: 'The Fast and The Furious: Tokyo Drift',
      tag: 'fastthree'
    },
    {
      imageSrc: '/images/fastfour.webp',
      title: 'Fast & Furious',
      tag: 'fastfour'
    },
    {
      imageSrc: '/images/fastfive.webp',
      title: 'Fast Five',
      tag: 'fastfive'
    },
    {
      imageSrc: '/images/fastsix.webp',
      title: 'Fast & Furious 6',
      tag: 'fastsix'
    },
    {
      imageSrc: '/images/fastseven.webp',
      title: 'Furious 7',
      tag: 'fastseven'
    },
    {
      imageSrc: '/images/fasteight.webp',
      title: 'The Fate of the Furious',
      tag: 'fasteight'
    },
    {
      imageSrc: '/images/fastnine.webp',
      title: 'F9: The Fast Saga',
      tag: 'fastnine'
    },
    {
      imageSrc: '/images/fastten.webp',
      title: 'Fast X',
      tag: 'fastten'
    }
  ]

  static _template() {
    return {
      Background: {
        w: 1920,
        h: 1080,
        rect: true,
        color: 0x000000,
        texture: {
          type: Lightning.textures.ImageTexture,
          src: Utils.asset('/images/background.png')
        }
      },
      AppTitle: {
        x: 20, 
        y: 20,
        text: {
          text: "Welcome to paul-turbo!",
          fontFace: 'Regular',
          fontSize: 36,
          textColor: 0xbbffffff,
        },
      },
      ImageList: {
        x: 50,
        y: 40,
        w: 1920,
        h: 1080,
        flex: { direction: 'row', wrap: true },
        children: App.movieList.map((movie) => {
          return {
            h: 425,
            w: 250,
            flex: { direction: 'column' },
            flexItem: { margin: 40 },
            children: [
              {
                w: 250,
                h: 375,
                texture: {
                  type: Lightning.textures.ImageTexture,
                  src: Utils.asset(movie.imageSrc),
                }
              },
              {
                texture: {
                  wordWrap: true,
                  wordWrapWidth: 250,
                  type: Lightning.textures.TextTexture,
                  text: movie.title,
                  fontFace: 'Regular',
                  fontSize: 24,
                  textColor: 0xffffffff,
                },
                tag: movie.tag
              },
            ],
          }
        }),
      }
    }
  }

  _handleLeft() {
    this.deSelectCurrentItem()
    this.selectPreviousItem()
  }

  _handleRight() {
    this.deSelectCurrentItem()
    this.selectNextItem()
  }

  _handleEnter() {
    console.log(`entering show page for item ${this.itemIndex}`) 
    // TODO: Show page functionality.
  }

  _animateCaption(caption) {
    caption.animation({
      duration: 1,
      repeat: 0,
      stopMethod: 'immediate',
      actions: [
        { t: '', p: 'alpha', v: { 0: { v: 1 }, 0.5: { v: 0.5 }, 1.0: { v: 1 } } }
      ]
    }).start()
  }

  deSelectCurrentItem() {
    if (this.itemIndex === null) {
      return
    }

    const captionValue = this.tag('ImageList').children[this.itemIndex].__treeTags.keys().next().value

    this.tag(captionValue).patch({
      texture : {
        textColor: 0xffffffff
      }
    })
  }

  selectNextItem() {
    if (this.itemIndex === null) {
      this.itemIndex = 0
    } else if (this.itemIndex === App.movieList.length - 1) {
      this.itemIndex = 0
    } else {
      this.itemIndex++
    }

    const captionValue = this.tag('ImageList').children[this.itemIndex].__treeTags.keys().next().value
    this._animateCaption(this.tag(captionValue)) // animate selection

    this.tag(captionValue).patch({ // update active selection by text color change
      texture: {
        textColor: 0xFF00FFFF
      }
    })
  }

  selectPreviousItem() {
    if (this.itemIndex === null) {
      this.itemIndex = 1
    } else if (this.itemIndex === 0) {
      this.itemIndex = App.movieList.length - 1
    } else {
      this.itemIndex--
    }

    const captionValue = this.tag('ImageList').children[this.itemIndex].__treeTags.keys().next().value
    this._animateCaption(this.tag(captionValue))

    this.tag(captionValue).patch({ // update active selection by text color change
      texture: {
        textColor: 0xFF00FFFF
      }
    })
  }


  // Intialize app
  _init() {
    this.tag('Background') // Note: a "TAG" string will refer to the named object in the template
      .animation({
        duration: 5,
        repeat: -1,
        actions: [
          {
            t: '',
            p: 'color',
            v: { 0: { v: 0xff92C839 }, 0.5: { v: 0xff00AEEF }, 1.0: { v: 0xff92C839 } },
          },
        ],
      })
      .start()
  }
}
