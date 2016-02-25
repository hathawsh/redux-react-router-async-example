import React, { PropTypes } from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'

const messages = defineMessages({
  legend: {
    id: 'explore.legend',
    description: 'Describe what to do with the input field',
    defaultMessage: 'Type a username or repo full name and hit \'Go\':'
  }
})

const DEFAULT_USER = 'emmenko'

function parseFullName (params) {
  const { username, repo } = params
  if (!username) return DEFAULT_USER

  return username + (repo ? '/' + repo : '')
}

export default class Explore extends React.Component {

  static propTypes = {
    params: PropTypes.shape({
      repo: PropTypes.string,
      username: PropTypes.string
    })
  };

  static contextTypes = {
    history: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props)

    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleGoClick = this.handleGoClick.bind(this)

    this.state = {
      nextUsernameOrRepo: parseFullName(props.params)
    }
  }

  render () {
    return (
      <div className="content">
        <form className="explore pure-form" onSubmit={e => e.preventDefault()}>
          <fieldset>
            <legend><FormattedMessage {...messages.legend} /></legend>
            <input
              size="45"
              onKeyUp={this.handleKeyUp}
              onChange={this.handleOnChange}
              value={this.state.nextUsernameOrRepo}
              placeholder="username/repo" />
            <button type="submit" className="pure-button pure-button-primary"
              onClick={this.handleGoClick}>
              Go!
            </button>
          </fieldset>
        </form>
      </div>
    )
  }

  handleKeyUp (e) {
    if (e.keyCode === 13)
      this.handleGoClick()
  }

  handleOnChange (e) {
    this.setState({
      nextUsernameOrRepo: e.target.value
    })
  }

  handleGoClick () {
    const nextUsernameOrRepo = this.state.nextUsernameOrRepo
    this.context.history.pushState({}, `/stargazers/${nextUsernameOrRepo}`)
  }
}
