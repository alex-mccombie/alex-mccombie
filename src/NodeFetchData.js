import React from 'react'
import NodeFetch from 'node-fetch' 

class NodeFetchData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weather_data: {}
    };
  }

  componentDidMount() {
/*    NodeFetch('http://codepen.io/jobs.json')
    .then(res => {
      this.setState({ jobs:res.data.jobs });
    }); */


	let LOCATION_LATLONG=[51.5129903,-0.1185895];
	let LOCATION_ARGS='lat='+LOCATION_LATLONG[0]+'&lon='+LOCATION_LATLONG[1];
	let API_KEY='5dab81b3644e5b94be1567e862827f30';
	let API_BASE_URL='https://api.openweathermap.org/data/2.5/';
	let API_URL=API_BASE_URL+'onecall?'+LOCATION_ARGS+'&appid='+API_KEY+'&units=metric';

	console.log('Fetching from source '+API_URL);
	let promiseToFetch=new Promise((resolve,reject)=>{
		NodeFetch(API_URL)
	    	.then(res => res.text())
	    	.then(text => JSON.parse(text))
	    	.then(DATA=>{
	    		if(DATA.cod=='429'){
	    			console.log('API Quota exceeded.');
	    		}else{
					//fs.writeFileSync(CACHE_PATH, JSON.stringify(DATA, null, 2), 'utf-8');
		    		//DATA => resolve(DATA)
		    		console.log('Setting DATA:',DATA);
			    	this.setState({weather_data:DATA});
		    	};
	    	})
	});

  }

  render() {
    return (
      <div>
        <ul>
          {this.state.jobs.map(job =>
            <li key={job.hashid}>{job.company_name}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default NodeFetchData;