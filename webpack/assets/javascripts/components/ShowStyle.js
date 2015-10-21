import React from 'react'
import Radium from 'radium'
import StyleForm from './StyleForm'
import NewLink from './NewLink'
import { getStyleAsync, updateStyleAsync } from '../actions/styles'

@Radium
export default class ShowStyle extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    let { routeParams, dispatch } = this.props
    let { styleId } = routeParams

    dispatch(getStyleAsync(styleId))
  }

  componentWillReceiveProps(props) {
    let style = this.getStyle()
    if (style) {
      let { rule, details, keywords } = this.getStyle()
      this.setState({
        rule, details, keywords, changed: false
      })
    }
  }

  handleValChange(e) {
    let { value, name } = e.target
    this.setState({
      [name]: value,
      changed: true,
    })
  }

  isFormEnabled() {
    let { rule } = this.state
    let { loading } = this.getStyle()
    return rule !== '' && !loading
  }


  handleSubmit(e) {
    e.preventDefault()
    if (!this.isFormEnabled()) {
      return alert("Your style needs its rule.")
    }
    let { dispatch } = this.props
    let id = this.getStyle().id
    dispatch(updateStyleAsync({...this.state, id}))
  }

  getStyle() {
    let { styles, routeParams } = this.props
    let { styleId } = routeParams
    return styles[styleId]
  }

  renderStyle() {
    let rule = this.getStyle()
    let { changed } = this.state
    return (
      <div style={ stylesheet.container }>
        <form style={ stylesheet.form } onSubmit={ this.handleSubmit.bind(this) }>
          <StyleForm
            styleRule={ rule }
            handleChange={ this.handleValChange.bind(this) }
          />
          { changed &&
            <button
              type="submit"
              style={[ stylesheet.button, !this.isFormEnabled() && stylesheet.disabled ]}
              disabled={ !this.isFormEnabled() }
            >
              Update style
            </button>
          }
          { !changed &&
            <div style={ stylesheet.center }>
              Everything is up to date
            </div>
          }
        </form>
      </div>
    )
  }

  render() {
    let { styles, routeParams } = this.props
    let { styleId } = routeParams
    if (styles[styleId]) {
      return this.renderStyle()
    }
    else {
      return (
        <div>
          Loading...
        </div>
      )
    }
  }
}

const stylesheet = {
  container: {
    maxWidth: 676,
    width: '100%',
    margin: '20px auto',
    padding: 20,
  },
  title: {
    marginBottom: 0,
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: '0px 20px',
  },
  button: {
    padding: 10,
    outline: 'none',
    background: 'red',
    border: 'none',
    color: 'white',
    fontSize: 16,
    cursor: 'pointer'
  },
  disabled: {
    opacity: 0.5,
  },
  center: {
    alignSelf: 'center',
  },
}

