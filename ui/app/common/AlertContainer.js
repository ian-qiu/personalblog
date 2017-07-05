import '../style/alert.styl';
import React from 'react';
import ReactDOM from 'react-dom';
import EventEmitter from 'events';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import AlertMessage from './AlertMessage';

const Alert={};
class AlertContainer extends React.Component {
  constructor(props){
    super(props);
    this.alertOptions = {
      margin: '',
      top:window.screen.availWidth<860?'40%':'25%',
      theme: 'light',
      transition: 'scale'
    };
    global.reactAlertEvents = new EventEmitter();
    this.state = {
      alerts: []
    };
    this.style = this._setStyle();
    this.theme = this._setTheme();
    this._eventListners();
  }
  /**
   * Show the alert in the page with success type
   * @param  {string} message 
   * @param  {Object} options 
   * @return {void}         
   */
  success(message, options = {}){
    options.type = 'success';
    this.show(message, options);
  }
  /**
   * Show the alert in the page with error type
   * @param  {string} message 
   * @param  {Object} options 
   * @return {void}
   */
  error(message, options = {}){
    options.type = 'error';
    this.show(message, options);
  }
  /**
   * Show the alert in the page with info type 
   * @param  {string} message
   * @param  {Object} options
   * @return {void}
   */
  info(message, options = {}){
    options.type = 'info';
    this.show(message, options);
  }
  /**
   * Show the alert in the page
   * @param  {string} message
   * @param  {Object} options
   * @return {void}
   */
  show(message, options = {}){
    let alert = {};
    alert.message = message;
    //alert = Object.assign(alert, options);//不兼容IE和android
    for (var prop in options) {
      alert[prop]=options[prop]
    }
    this.setState({alerts: this._addAlert(alert)});
  }
  /**
   * Remove all tasks from the page
   * @return {void}
   */
  removeAll(){
    this.setState({alerts: []});
  }
  /**
   * Add an alert
   * @param {Object} alert
   */
  _addAlert(alert){
    alert.uniqueKey = this._genUniqueKey();
    alert.style = this.theme;
    if(!alert.hasOwnProperty('time')){
      alert.time = this.alertOptions.time;
    };
    alert.closeIconClass = 'close-' + this.alertOptions.theme;
    this.state.alerts.push(alert);
    return this.state.alerts;
  }
  /**
   * Generate a key
   * @return {string}
   */
  _genUniqueKey(){
    return new Date().getTime().toString() + Math.random().toString(36).substr(2, 5);
  }
  /**
   * Remove an AlertMessage from the container
   * @param  {AlertMessage} alert
   * @return {void}
   */
  _removeAlert(alert){
    return this.state.alerts.filter((a) => {
      return a.uniqueKey != alert.props.uniqueKey;
    });
  }
  /**
   * Listen to alert events
   * @return {void}
   */
  _eventListners(){
    reactAlertEvents.on('ALERT.REMOVE', (alert) => {
      this.setState({alerts: this._removeAlert(alert)});
    });
  }
  /**
   * Set the alert position on the page
   */
  _setStyle(){

    return {
      margin: this.alertOptions.margin || '',
      top: this.alertOptions.top || '',
      left: this.alertOptions.left || '',
      right: this.alertOptions.right || '',
      bottom: this.alertOptions.bottom || '',
    };
  }
  /**
   * Set the style of the alert based on the chosen theme
   */
  _setTheme(){
    let theme = {};
    switch(this.alertOptions.theme){
      case 'light':
        theme = {
          alert: {
            backgroundColor: '#fff',
            color: '#333'
          },
          closeButton: {
            bg: '#f3f3f3'
          }
        }
        break;
      default:
        theme = {
          alert: {
            backgroundColor: '#333',
            color: '#fff'
          },
          closeButton: {
            bg: '#444'
          }
        }
        break;
    }

    return theme;
  }

  componentDidUpdate(){
    this.style = this._setStyle();
    this.theme = this._setTheme();
  }
   componentDidMount(){
    Alert.show=this.show.bind(this);
  }

  render(){
    return(
      <div style={this.style} className="react-alerts">
        <ReactCSSTransitionGroup 
          transitionName={this.alertOptions.transition} 
          transitionEnterTimeout={250} 
          transitionLeaveTimeout={250}>
          {this.state.alerts.map((alert, index) => {
            return <AlertMessage key={alert.uniqueKey} {...alert} />
          })}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

AlertContainer.defaultProps = {
  theme: 'dark',
  time: 5000,
  transition: 'scale'
}

AlertContainer.propTypes = {
  theme: React.PropTypes.oneOf(['dark', 'light']),
  time: React.PropTypes.number,
  transition: React.PropTypes.oneOf(['scale', 'fade'])
}

let el=document.getElementsByTagName('body')[0];
let newEl = document.createElement('div');
newEl.setAttribute('id', 'alert');
el.appendChild(newEl);
ReactDOM.render(<AlertContainer/>, document.getElementById('alert'))

export default Alert;