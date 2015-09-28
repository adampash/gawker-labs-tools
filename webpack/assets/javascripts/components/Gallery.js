import React from 'react'
import SwipeableViews from 'react-swipeable-views'

export default class Gallery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0
    }
  }

  renderImages() {
    let { pics } = this.props
    return pics.map( (pic, index) => {
      return (
        <div key={ index } style={ styles.img_container }>
          <img src={ pic.url } style={ styles.img } />
        </div>
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
          <div
            style={ styles.left }
            onClick={ this.prevImage.bind(this) }
          />
          <SwipeableViews
            index={ index }
            onChangeIndex={ (index) => this.setState({index}) }
          >
            { this.renderImages() }
          </SwipeableViews>
          <div
            style={ styles.right }
            onClick={ this.nextImage.bind(this) }
          />
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
  },
  img_container: {
    textAlign: 'center',
  },
  img: {
    margin: '0 auto',
    display: 'block',
    maxWidth: '100%'
  },
  left: {
    background: 'black',
    width: 50,
    opacity: 0.2,
  },
  right: {
    background: 'black',
    width: 50,
    opacity: 0.2,
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
}
