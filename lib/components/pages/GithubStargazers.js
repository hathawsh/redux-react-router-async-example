import React, { PropTypes } from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
import Explore from '../github/Explore'

const messages = defineMessages({
  subtitle: {
    id: 'stargazers.subtitle',
    description: 'Subtitle of the page',
    defaultMessage: 'See the stargazers for your GitHub account and repos.'
  }
})

class GithubStargazers extends React.Component {

  static propTypes = {
    children: PropTypes.any
  };

  render () {
    return (
      <div>
        <div className="header">
          <h1>Stargazers</h1>
          <FormattedMessage {...messages.subtitle}>
            {text => <h2>{text}</h2>}
          </FormattedMessage>
        </div>

        <Explore {...this.props} />

        {this.props.children}
      </div>
    )
  }
}

export default GithubStargazers
