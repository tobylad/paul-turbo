import { Lightning, Utils } from '@lightningjs/sdk'

export default class App extends Lightning.Component {
  static getFonts() {
    return [{ family: 'Regular', url: Utils.asset('/fonts/Roboto-Regular.ttf') }]
  }

  itemIndex = null

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
        x: 50,
        y: 50,
        text: {
          text: "Welcome to paul-turbo!",
          fontFace: 'Regular',
          fontSize: 48,
          textColor: 0xbbffffff,
        },
      },
      ImageList: {
        x: 50,
        y: 100,
        w: 1000,
        h: 800,
        flex: { direction: 'row', wrap: true }, // Parent flexbox with 2 columns
        children: [
          { // FIRST CHILD
            h: 425,
            w: 250,
            flex: { direction: 'column' }, // Each child is a column layout
            flexItem: { margin: 40 }, // Margin between items
            children: [
              {
                w: 250,
                h: 375,
                texture: {
                  type: Lightning.textures.ImageTexture,
                  src: Utils.asset('/images/fastandfurious1.jpg'),
                }
              },
              {
                w: 250,
                h: 50,
                texture: {
                  type: Lightning.textures.TextTexture, // Explicitly use TextTexture
                  text: 'The Fast and The Furious',
                  fontFace: 'Regular',
                  fontSize: 24,
                  textColor: 0xffffffff, // White text color
                },
                tag: 'captionLeft'
              },
            ],
          },
          { // SECOND CHILD
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
                  src: Utils.asset('/images/2fast2furious.jpg'),
                },
              },
              {
                w: 250,
                h: 50,
                texture: {
                  type: Lightning.textures.TextTexture, // Explicitly use TextTexture
                  text: '2 Fast 2 Furious',
                  fontFace: 'Regular',
                  fontSize: 24,
                  textColor: 0xffffffff, // White text color
                },
                tag: 'captionRight'
              },
            ],
          },
        ],
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
    } else if (this.itemIndex === 1) {
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
      this.itemIndex = 1
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
