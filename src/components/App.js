import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import moment from 'moment';

import '../assets/stylesheets/base.scss';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: []
    }
  }

  componentDidMount() {
    fetch('/getweather', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      return response.json();
    }).then(weather => {
      this.setState({ weather })
    });
  }


  render() {
      const { weather } = this.state;
      const city = weather.city || {};
      return ( weather.list ? < div className="wrapper">
      	<div className="head"> Weather report for location lat/lan {city.coord.lat} / {city.coord.lon}</div> 
        {
            weather.list.reverse().map((res, val) => {

              return ( < div className='eachAddressBlock'>
                < div className='header'> Measurement time - { moment(res.dt_txt).format('DD MMM YYYY HH:MM A') } < /div>
                <div className="main"> Summery - {res.weather[0].description} . Main weather data Points - </div> 
                { 
                	_.map(res.main, (val , key) => {
                		return < div className='description'> {key} : {val} < /div > 
                	})

                }
                <div className="main"> Wind details data Points</div> 
                   {
	                   	_.map(res.wind, (val , key) => {
	                		return < div className='description'> {key} : {val} < /div > 
	                	})
                	}
                 < /div>
              );
            })
          } < /div> : <div className='header'> Pleaae wait while we fetch weather data for you.. </div>);
        }

      };

      App.propTypes = {
        name: PropTypes.string,
      };

      export default App;
