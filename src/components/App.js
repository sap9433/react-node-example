import React, { PropTypes, Component } from 'react';
import _ from 'lodash';

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
      debugger
      this.setState({ weather })
    });
  }


  render() {
      const { weather } = this.state;
      debugger
      return ( weather.list ? < div > 
        {
            weather.list.map((res, val) => {

              return ( < div >
                < div className='header'> { res.weather[0].description } < /div>
                { _.map(res.main, (val , key) => {
                	return < div className='description'> {key} , {val} < /div > 
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
