import React from 'react'
import Radium from 'radium'
import SwipeableViews from 'react-swipeable-views'
import FontAwesome from 'react-fontawesome'
import MobileDetect from 'mobile-detect'
import key from 'keymaster'
import KinjaResizer from './KinjaResizer'
import GalleryImage from './GalleryImage'

@Radium
export default class Gallery extends React.Component {
  constructor(props) {
    super(props)
    let md = new MobileDetect(window.navigator.userAgent)
    this.state = {
      index: 0,
      mobile: md.mobile()
    }
  }

  componentWillMount() {
    key('left', this.prevImage.bind(this))
    key('right', this.nextImage.bind(this))
  }

  componentDidMount() {
    let { resize } = this.props
    if (resize) resize()
  }

  componentDidUpdate() {
    let { resize } = this.props
    if (resize) resize()
  }

  componentWillUnmount() {
    key.unbind('left')
    key.unbind('right')
  }

  isDesktop() {
    let { mobile } = this.state
    return mobile === null
  }

  renderImages() {
    let pics = this.getPics()
    return pics.map( (pic, index) => {
      return (
        <KinjaResizer key={ index } style={ styles.img_container }>
          <GalleryImage pic={ pic } />
        </KinjaResizer>
      )
    })
  }

  renderIndex() {
    let { index } = this.state
    // let { pics } = this.props.gallery
    let pics = this.getPics()
    return (
      <div style={[ styles.galleryIndex, styles.copy ]}>
        { index + 1 } of { pics.length }
      </div>
    )
  }

  getPics() {
    let { pics } = this.props
    if (pics === undefined)
      pics = this.props.gallery.pics
    return pics
  }

  renderMeta() {
    let { index } = this.state
    let pics = this.getPics()
    // if (!pics) return null
    let pic = pics[index]
    let { description, credit } = pic
    return (
      <div>
        { description && description.trim() !== '' &&
          <div style={ styles.description }>{ description }</div>
        }
        { credit && credit.trim() !== '' &&
          <div style={ styles.credit }>Credit: { credit }</div>
        }
      </div>
    )
  }
  renderButtons() {
    return (
      <div style={ styles.buttonContainer }>
        <div
          style={{ ...styles.nextPrev }}
          onClick={ this.prevImage.bind(this) }
        >
          <FontAwesome
            name="chevron-left"
            style={ styles.chevron }
          />
        </div>
        <div
          style={{ ...styles.nextPrev }}
          onClick={ this.nextImage.bind(this) }
        >
          <FontAwesome
            name="chevron-right"
            style={ styles.chevron }
          />
        </div>
      </div>
    )
  }

  nextImage() {
    let { index } = this.state
    let pics = this.getPics()
    let newIndex
    if (index + 1 === pics.length)
      newIndex = 0
    else
      newIndex = index + 1
    this.setState({
      index: newIndex
    })
  }

  prevImage() {
    let { index } = this.state
    let pics = this.getPics()
    let newIndex
    if (index - 1 < 0)
      newIndex = pics.length - 1
    else
      newIndex = index - 1
    this.setState({
      index: newIndex
    })
  }

  render() {
    let { index } = this.state
    let pics = this.getPics()
    if (!pics) return null
    let pic = pics[index]
    let { description } = this.props.gallery
    return (
      <div style={ styles.global }>
        <div style={[ styles.title, styles.copy ]}>{ description }</div>
        <div style={ styles.container }>
          <div style={ styles.swipeContainer } className="galContainer">
            <SwipeableViews
              style={{
                alignItems: 'center',
              }}
              index={ index }
              onChangeIndex={ (index) => this.setState({index}) }
            >
              { this.renderImages() }
            </SwipeableViews>
            <div className="enlarge">
              <a href={ pic.original } target="_blank">
                <img src="/new_tab_icon.svg"
                  style={ styles.original }
                />
              </a>
            </div>
          </div>
        </div>
        <div style={ styles.topMeta }>
          { this.renderIndex() }
          { this.renderButtons() }
        </div>
        { this.renderMeta() }
      </div>
    )
      // <ReactSwipe continuous={ false }>
      // </ReactSwipe>
  }
}

const styles = {
  global: {
    fontFamily: 'ElizabethSerif',
    backgroundColor: 'white',
    width: '100%',
  },
  container: {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
    width: '100%',
  },
  swipeContainer: {
    backgroundColor: '#F2F2F2',
    width: '100%',
    position: 'relative',
  },
  img_container: {
    textAlign: 'center',
    background: 'black',
  },
  nextPrev: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    cursor: 'pointer',
  },
  dotsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    cursor: 'pointer',
    height: 10,
    borderRadius: 5,
    backgroundColor: 'black',
    margin: 5
  },
  chevron: {
    color: 'black',
    fontSize: 12,
  },
  topMeta: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  buttonContainer: {
    display: 'flex',
    width: 42,
    justifyContent: 'space-between'
  },
  copy: {
    fontSize: 16,
    lineHeight: '29px',
  },
  galleryIndex: {
    fontWeight: 'bold',
    marginBottom: 6,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 15,
  },
  description: {
    marginBottom: 12,
  },
  credit: {
    fontSize: 12,
    color: '#808080',
  },
  original: {
    color: 'white',
    width: 30,
    height: 30,
    cursor: 'pointer',
    // opacity: 0.6,
    // transition: 'all 0.3s ease-out',
    // ':hover': {
      // opacity: 1,
      // width: 32,
      // height: 32,
    // }
  }
}
