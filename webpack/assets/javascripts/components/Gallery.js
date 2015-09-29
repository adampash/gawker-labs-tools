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

  componentWillUnmount() {
    key.unbind('left')
    key.unbind('right')
  }

  isDesktop() {
    let { mobile } = this.state
    return mobile === null
  }

  renderImages() {
    let { pics } = this.props
    return pics.map( (pic, index) => {
      return (
        <KinjaResizer key={ index } style={ styles.img_container }>
          <GalleryImage pic={ pic } />
        </KinjaResizer>
      )
    })
  }

  renderDots() {
    let { pics } = this.props
    let { index } = this.state
    return pics.map( (pic, num) => {
      let bg = {}
      if (num === index) bg.backgroundColor = 'red'
      return (
        <div
          style={{ ...styles.dot, ...bg }}
          key={ num }
          onClick={() => this.setState({ index: num }) }
        />
      )
    })
  }

  nextImage() {
    let { index } = this.state
    let { pics } = this.props
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
    let { pics } = this.props
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
    return (
      <div>
        <div style={ styles.container }>
          { this.isDesktop() &&
            <div
              style={{ ...styles.nextPrev }}
              onClick={ this.prevImage.bind(this) }
            >
              <FontAwesome
                name="chevron-left"
                style={ styles.chevron }
              />
            </div>
          }
          <div style={ styles.swipeContainer }>
            <SwipeableViews
              style={{
                alignItems: 'center',
              }}
              index={ index }
              onChangeIndex={ (index) => this.setState({index}) }
            >
              { this.renderImages() }
            </SwipeableViews>
          </div>
          { this.isDesktop() &&
            <div
              style={{ ...styles.nextPrev }}
              onClick={ this.nextImage.bind(this) }
            >
              <FontAwesome
                name="chevron-right"
                style={ styles.chevron }
              />
            </div>
          }
        </div>
        <div style={ styles.dotsContainer }>
          { this.renderDots() }
        </div>
      </div>
    )
      // <ReactSwipe continuous={ false }>
      // </ReactSwipe>
  }
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  swipeContainer: {
    background: 'black',
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
    padding: '0 3px',
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
    display: 'block',
    color: 'black',
    fontSize: 30,
  }
}
