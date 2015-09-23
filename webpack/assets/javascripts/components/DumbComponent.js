import React from 'react'

export default class DumbComponent extends React.Component {
  handleClick(e) {
    this.props.test('oh hi')
  }

  render() {
    return(
      <div
        onClick={this.handleClick.bind(this)}
        className="dummy" style={styles.dummy}
      >
        Hello world! {this.props.foo}
      </div>
    )
  }
}

let styles = {
  dummy: {
    fontSize: 30,
    cursor: 'pointer',
  },
}
