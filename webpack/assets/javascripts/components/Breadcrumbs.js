import { Component } from 'react'
import { Link } from 'react-router'
import Radium from 'radium'
import FontAwesome from 'react-fontawesome'

@Radium
export default class Breadcrumbs extends Component {
  renderLinks() {
    let { routes } = this.props
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
            <Link to={ `${path}` }>{ name }</Link>
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
    marginRight: 10,
    display: 'flex',
  },
  separator: {
    fontSize: 12,
    lineHeight: '18px'
  }
}
