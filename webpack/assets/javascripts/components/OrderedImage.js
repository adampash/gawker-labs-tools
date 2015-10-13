import React from 'react'
import Radium from 'radium'

@Radium
export default class OrderedImage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showSave: false,
      loading: false
    }
  }

  handleSubmit(e) {
    let { file, index } = this.props
    let description = this.refs.description.value
    let credit = this.refs.credit.value
    e.preventDefault()
    this.props.handleUpdatePic({ description, credit, id: file.id, index })
  }

  showSave(e) {
    this.setState({
      showSave: true
    })
  }

  render() {
    let { file, index } = this.props
    let { showSave, loading } = this.state
    let container = styles.container
    if (file.preview || loading) {
      container = { ...container, ...styles.preview }
    }
    return (
      <div style={ container }>
        <img src={ file.url || file.preview } style={ styles.thumb } />
        <form onSubmit={ this.handleSubmit.bind(this) }
          onChange={ this.showSave.bind(this) }
          style={ styles.form }
        >
          <div style={ styles.inputContainer }>
            <textarea ref="description" style={[ styles.input, styles.textarea ]} placeholder="Caption (optional)"/>
            <input ref="credit" style={ styles.input } type="text" placeholder="Photo credit (optional)"/>
          </div>
          { showSave && <button type="submit">Save</button> }
        </form>
      </div>
    )
        // <div style={ styles.number }>
        //   <input
        //     type="text"
        //     value={ index + 1 }
        //     style={ styles.input }
        //     onBlur={ this.handleBlur.bind(this) }
        //     onChange={ this.handleChange.bind(this) }
        //     onFocus={ this.handleFocus.bind(this) }
        //   />
        // </div>
  }

}

const styles = {
  container: {
    transition: 'opacity .5s ease-in-out',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: '10px 0'
  },
  thumb: {
    maxWidth: 150,
    margin: '0 10px',
    flex: '1 0 150'
  },
  form: {
    flex: '1 0'
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    outline: 'none',
    border: '1px solid #ddd',
    padding: 5,
    marginBottom: 10,
  },
  textarea: {
    height: 70,
  },
  number: {
    position: 'absolute',
    top: 20,
    right: 20,
    background: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    width: 30,
    height: 30,
    borderRadius: '50%',
  },
  preview: {
    opacity: 0.3,
  }
}
