import React from 'react'
import Radium from 'radium'
import MobileDetect from 'mobile-detect'
import KinjaResizer from './KinjaResizer'
import Spiframe from './Spiframe'

@Radium
export default class Embed extends React.Component {
  render() {
    let { embed, link } = this.props
    // console.log(embed.code)
    return (
      <KinjaResizer>
        <Spiframe link={ link } />
      </KinjaResizer>
    )
  }
}
