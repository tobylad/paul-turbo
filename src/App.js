import { Lightning, Utils } from '@lightningjs/sdk'

export default class App extends Lightning.Component {
  static getFonts() {
    return [{ family: 'Regular', url: Utils.asset('/fonts/Roboto-Regular.ttf') }]
  }

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
    this._stopAnimation(this.tag('captionRight'))
    this._animateCaption(this.tag('captionLeft'))
  }

  _handleRight() {
    this._stopAnimation(this.tag('captionLeft'))
    this._animateCaption(this.tag('captionRight'))
  }

  _handleEnter() {
    console.log('entering show page') 
    // TODO: Show page functionality. Holding off until deployment for time's sake.
  }


  _animateCaption(caption) {
    caption.animation({
      duration: 1,
      repeat: 1,
      stopMethod: 'immediate',
      actions: [
        { t: '', p: 'color', v: { 0: { v: 0xffffffff }, 0.5: { v: 0xffFF0000 }, 1.0: { v: 0xffffffff } },}
      ]
    }).start()
  }

  _stopAnimation(caption) {
    if (caption.animation) caption.animation().stop()
  }

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
