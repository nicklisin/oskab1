import React, {Component} from 'react';

class Tooltip extends Component {
    render() {
        return (
        <span data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="bottom" data-bs-html="true" title={this.props.title} className="tooltip__icon">
            <svg className="tooltip__icon-svg" width="16" height="16" fill="#ccc" viewBox="0 0 16 16">
            <path fillRule="evenodd"
                d="M0 8a8 8 0 1 0 16 0A8 8 0 0 0 0 8zm14 0A6 6 0 1 1 2 8a6 6 0 0 1 12 0zM5.2 6.1c0-1.7 1.3-2.7 3-2.7 1.8 0 3 1 3 2.5s-.9 2-1.7 2.4l-.2.1c-.3.2-.4.3-.4.7l-.3.3h-.9a.4.4 0 0 1-.4-.4c0-.9.3-1.4 1-1.7l.3-.1c.7-.3 1-.6 1-1.2s-.5-1-1.3-1c-.9 0-1.5.4-1.5 1.2a.3.3 0 0 1-.3.3h-1a.4.4 0 0 1-.3-.4zM8 9.9c-.7 0-1.1.5-1.1 1.1 0 .7.4 1.2 1 1.2.7 0 1.2-.5 1.2-1.2 0-.6-.5-1.1-1.1-1.1z"
                clipRule="evenodd">
            </path>
            </svg>
        </span>
        );
    }
}

export default Tooltip;
