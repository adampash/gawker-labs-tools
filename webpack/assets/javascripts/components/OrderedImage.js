import React from 'react'
import Radium from 'radium'

@Radium
export default class OrderedImage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showSave: false,
      position: props.index + 1,
      description: props.file.description,
      credit: props.file.credit,
    }
  }

  componentWillReceiveProps(props) {
    let { index, file } = props
    let { credit, description, loading } = file
    let wasLoading = this.props.file.loading
    let newState = {
      position: index + 1
    }
    if (wasLoading && !loading) {
      newState.showSave = false
    }
    if (!loading) {
      newState.description = description
      newState.credit = credit
    }
    this.setState(newState, () => this.refs.order.blur())
  }

  handleNumChange(e) {
    let { value } = e.target
    let num
    if (parseInt(value) > 0) {
      num = parseInt(value)
    } else {
      num = ''
    }
    this.setState({
      position: num
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    let { file, index } = this.props
    let description = this.refs.description.value
    let credit = this.refs.credit.value
    e.preventDefault()
    this.props.handleUpdatePic({ description, credit, id: file.id, index })
  }

  reorder(e) {
    e.preventDefault()
    let { index } = this.props
    let { value } = this.refs.order
    if (value === '') return
    this.props.reorderImages(index, parseInt(value) - 1)
  }

  showSave(e) {
    this.setState({
      showSave: true
    })
  }

  render() {
    let { file, index } = this.props
    let { loading, preview } = file
    let { showSave, description, credit } = this.state
    let container = styles.container
    if (preview || loading) {
      container = { ...container, ...styles.preview }
    }
    return (
      <div style={ container }>
        <form onSubmit={ this.reorder.bind(this) } style={ styles.img_form }>
          <img src={ file.url || file.preview } style={ styles.thumb } />
          <input
            ref="order"
            style={ styles.reorder_input }
            type="text"
            value={ this.state.position }
            onChange={ this.handleNumChange.bind(this) }
            onFocus={ (e) => e.target.select() }
          />
        </form>
        <form onSubmit={ this.handleSubmit.bind(this) }
          onChange={ this.showSave.bind(this) }
          style={ styles.form }
        >
          <div style={ styles.inputContainer }>
            <textarea
              ref="description"
              name="description"
              style={[ styles.input, styles.textarea ]}
              placeholder="Caption (optional)"
              value={ description }
              onChange={ this.handleChange.bind(this) }
            />
            <input
              ref="credit"
              name="credit"
              style={[ styles.input, styles.textarea ]}
              style={ styles.input }
              type="text"
              placeholder="Photo credit (optional)"
              value={ credit }
              onChange={ this.handleChange.bind(this) }
            />
          </div>
          { showSave &&
            <button type="submit" style={ styles.save }>
              Save
            </button> }
        </form>
      </div>
    )
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
  },
  img_form: {
    position: 'relative'
  },
  reorder_input: {
    position: 'absolute',
    top: 0,
    right: 10,
    margin: 2,
    textAlign: 'center',
    // background: 'black',
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    // color: 'white',
    width: 30,
    height: 30,
    borderRadius: '50%',
    border: '2px solid #aaa',
    outline: 'none',
  },
  save: {
    padding: 10,
    outline: 'none',
    border: '1px solid #ccc',
    background: '#fe0003',
    color: 'white',
    cursor: 'pointer',
  },
}
