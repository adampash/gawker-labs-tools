import { Component } from 'react'
import { Link } from 'react-router'
import Radium from 'radium'
import FontAwesome from 'react-fontawesome'

@Radium
export default class Breadcrumbs extends Component {
  swapParams(route) {
    let { params } = this.props
    let param = Object.keys(params)[0]
    if (route.path === `:${param}`) {
      return params[param]
    } else {
      return route.path
    }
  }

  renderLinks() {
    let { routes, params } = this.props
    return routes.reduce( (acc, route) => {
      let { name, path } = route
      if (path) {
        acc.push(
          <div key={ name } style={ styles.breadcrumb }>
            { (acc.length > 0) &&
              <div style={ styles.breadcrumb }>
                <FontAwesome name="chevron-right" style={ styles.separator } />
              </div>
            }
            <Link to={ this.swapParams(route) }>{ name }</Link>
          </div>
        )
        return acc
      }
      else return acc
    }, [])
  }

  render() {
    return (
      <div style={ styles.container }>
        { this.renderLinks() }
      </div>
    )
  }

}

const styles = {
  container: {
    display: 'flex',
    marginBottom: 20,
  },
  breadcrumb: {
    marginRight: 5,
    display: 'flex',
    fontSize: 13,
    // textTransform: 'uppercase',
  },
  separator: {
    fontSize: 10,
    lineHeight: '16px'
  }
}
