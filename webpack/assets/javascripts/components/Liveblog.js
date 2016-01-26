import { Component } from 'react'
import Radium from 'radium'
import HomeLink from './HomeLink'

@Radium
export default class Liveblog extends Component {
  render() {
    return (
      <div style={ styles.container }>
        <h3> How to set up a liveblog </h3>
        <ol>
          <li>
            Go to the one of the liveblog Slack rooms (
              <a target="_blank"
                style={ styles.link } href="https://gawker.slack.com/messages/liveblog/">
                #liveblog
              </a>
              , <a target="_blank"
                  style={ styles.link } href="https://gawker.slack.com/messages/liveblog2/">
                    #liveblog2
                </a>
              , or <a target="_blank" 
                    style={ styles.link } href="https://gawker.slack.com/messages/liveblog3/">
                    #liveblog3
                  </a>).
              When you want to start the liveblog, just type
              "/start_liveblog Name of Live Blog"
              (e.g., /start_liveblog NBA Draft).
          </li>
          <li>
            Copy and paste the iframe embed code from the auto-response
            into your post in Kinja. It will look something like this:
            <img src="http://files.adampash.com/s/Slack_1C57F2B8.png"
              style={ styles.img }
            />
          </li>
          <li>
            Until you end the liveblog, whatever you type in your liveblog
            Slack channel will go in the liveblog. When you're done, just
            type /end_liveblog into the Slack channel.
          </li>
        </ol>
        <p>
          Feel free to test it out beforehand. It's not a big deal to start/end a few live blogs that you don't use.

        </p>

        <h3>Liveblog Rules and Best Practices</h3>
        <h4>Before it starts</h4>
        <ol>
          <li>
            Designate a member of the liveblog team to narrate what’s happening.
            That person will be responsible for making what is happening
            sensible to the readers.
          </li>
          <li>
            If you don't have a Slack avatar other than the default, get one!
          </li>
        </ol>

        <h4>While liveblogging</h4>
        <ol>
          <li>
            Capture discrete moments as breakout blog posts, and then link to
            those posts in the liveblog.
          </li>
          <li>
            When possible, put complete thoughts in one Slack rather than
            splitting into two successive messages.
          </li>
          <li>
            To embed an image, upload an image to Slack.
            Don't link to images elsewhere.
          </li>
          <li>
            Don't @user each other. It doesn't work, and it doesn't really
            make sense in the context of a liveblog anyway.
          </li>
          <li>
            Most emoji will work, so feel free to use them.
          </li>
          <li>
            Don't make inside jokes! Or if you do, provide context.
          </li>
          <li>
            Don't reference Slack. No one knows you're doing this from Slack.
          </li>
          <li>
            Remember, you can't edit your messages, so take a little bit of care.
          </li>
        </ol>
      </div>
    )
  }
}

const styles = {
  container: {
    maxWidth: 600,
  },
  img: {
    maxWidth: "100%",
  },
  link: {
    color: 'red',
  },
}
