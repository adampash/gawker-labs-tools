import React from 'react'
import { Link } from 'react-router'
import NewLink from './NewLink'
import { connect } from 'react-redux'
import { getStylesAsync } from '../actions/styles'

class Styles extends React.Component {
  componentWillMount() {
    let { dispatch } = this.props
    dispatch(getStylesAsync())
  }

  renderChildren() {
    let { dispatch, styles } = this.props
    return React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, { dispatch, styles })
    })
  }

  renderLatest() {
    let { styles, location, styleList } = this.props
    if (location.pathname !== '/styles') return
    let list = styleList.map( styleId => {
      let style = styles[styleId]
      return (
        <div key={ styleId } style={ styles.listItem }>
          <Link to={`/styles/${styleId}`}>
            { style.rule }
          </Link>
        </div>
      )
    })
    return (
      <div style={ styles.list }>
        <h3>
          Your latest styles
          <NewLink to="/styles/new" text="New style" />
        </h3>
        { list }
      </div>
    )
  }

  render() {
    let { styles } = this.props
    if (styles) {
      return (
        <div style={ styles.container }>
          { this.renderLatest() }
          { this.renderChildren() }
        </div>
      )
    } else {
      return (
        <div>Loading...</div>
      )
    }
  }
}

const styles = {
  container: {
  },
  list: {
    maxWidth: 500,
    margin: '0 auto',
  },
}


function select(state) {
  let { styles, styleList } = state
  return {
    styles,
    styleList
  }
}

export default connect(select)(Styles)
