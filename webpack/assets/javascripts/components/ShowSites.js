import { Component } from 'react'
import Radium from 'radium'
import { getSitesAsync } from '../actions/goals'
import { connect } from 'react-redux'
import HomeLink from './HomeLink'

@Radium
class ShowSites extends Component {
  componentWillMount() {
    let { dispatch } = this.props
    dispatch(getSitesAsync())
  }

  renderSites() {
    let { sites } = this.props
      return sites.map( (site, index) => {
        return (
          <HomeLink
            key={ site.id }
            to={ `/sites/${site.name.toLowerCase()}/quarters` }
            text={ site.name }
          />
        )
      })
  }

  render() {
    let { sites } = this.props
    if (sites.length) {
      return (
        <div style={ styles.container }>
          { this.renderSites() }
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
    display: 'flex',
    flexWrap: 'wrap',
  }
}

function select(state) {
  let { sites } = state
  return {
    sites
  }
}

export default connect(select)(ShowSites)
