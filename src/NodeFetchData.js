import React, { Component } from 'react';
import axios from 'axios' 

//let location_latLong=[48.8588335,2.2768238]; // Paris
//let location_latLong=[props.lat,props.long];
//let location_latLong=[51.5129903,-0.1185895]; // London
//let LOCATION_ARGS='lat='+location_latLong[0]+'&lon='+location_latLong[1];
let API_KEY='5dab81b3644e5b94be1567e862827f30';
let API_BASE_URL='https://api.openweathermap.org/data/2.5/';
let API_URL=API_BASE_URL+'onecall?appid='+API_KEY+'&units=metric';
let pollutionURL=API_BASE_URL+'air_pollution?appid='+API_KEY;

function dtDate(dt){
	if(!dt){return('')};
	let dateValue=new Date(dt*1000);
	let dateDisplay=dateValue.toLocaleString();
	return(dateDisplay);
};


class NodeFetchData extends Component {
//function NodeFetchData(props) {
    constructor(props) {
        super(props);
        this.state = {
        		lat:props.lat
        		,long:props.long
            ,weather_data: []
        };
    };

    componentDidMount() {
    	//console.log('Props:',props);
			let LOCATION_ARGS='&lat='+this.state.lat+'&lon='+this.state.long;
			axios(API_URL+LOCATION_ARGS).then(res=>{this.setState({weather_data:res.data})});
			axios(pollutionURL+LOCATION_ARGS).then(res=>{this.setState({pollution_data:res.data})});
	  };

  	render() {
      let minutely=this.state.weather_data.minutely||[];
      let hourly=this.state.weather_data.hourly||[];
      let daily=this.state.weather_data.daily||[];
			let LOCATION_ARGS='&lat='+this.state.lat+'&lon='+this.state.long;
      
			let rainMapURL='https://openweathermap.org/weathermap?basemap=map&cities=false&layer=precipitation&'+LOCATION_ARGS+'&appid='+API_KEY+'&zoom=7';

      let pollution=this.state.pollution_data||[];
      pollution=pollution.list||[];
      pollution=pollution[0]||[];
      //console.log('pollution:',pollution);
      let pollutionComponents=pollution.components||{};
      let pollutionAQI=pollution.main?pollution.main.aqi:'';

			let P_co=pollutionComponents.co;
			let P_no=pollutionComponents.no;
			let P_no2=pollutionComponents.no2;
			let P_o3=pollutionComponents.o3;
			let P_so2=pollutionComponents.so2;
			let P_pm2_5=pollutionComponents.pm2_5;
			let P_pm10=pollutionComponents.pm10;
			let P_nh3=pollutionComponents.nh3;

      let rainMap=<iframe title='RainMap' src={rainMapURL} style={{width:'100%',height:'600px'}}></iframe>;

      const minutelyTable=
				<table><tbody>
        <tr>
          <th>Date</th>
          <th>Rain</th>
        </tr>
        {minutely.map((val,key) => {
          return (
            <tr key={key}>
              <td>{dtDate(val.dt)}</td>
              <td>{val.precipitation}</td>
            </tr>
          )
        })}
      </tbody>
      </table>;


      const hourlyTable=
				<table>
	      <thead>
        <tr>
          <th>Date</th>
          <th>Temp</th>
          <th>Pressure</th>
          <th>UVI</th>
          <th>Clouds</th>
          <th>Humidity</th>
          <th>Rain</th>
        </tr>
	      </thead>
	      <tbody>
        {hourly.map((val,key) => {
          return (
            <tr key={key}>
              <td>{dtDate(val.dt)}</td>
              <td>{val.temp}</td>
              <td>{val.pressure}</td>
              <td>{val.uvi}</td>
              <td>{val.clouds}</td>
              <td>{val.humidity}</td>
              <td>{val.pop}</td>
            </tr>
          )
        })}
      </tbody>
      </table>;

      const dailyTable=
				<table>
	      <tbody>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>min</th>
          <th>max</th>
          <th>Clouds</th>
          <th>uvi</th>
        </tr>
        {daily.map((val,key) => {
          return (
            <tr key={key}>
              <td>{dtDate(val.dt)}</td>
              <td>{val.weather[0].description}</td>
              <td>{val.temp.min}</td>
              <td>{val.temp.max}</td>
              <td>{val.clouds}</td>
              <td>{val.uvi}</td>
            </tr>
          )
        })}
      </tbody>
      </table>;

      const pollutionTable=
      <table>
	      <tbody>
	        <tr><td>Air Quality</td><td>{pollutionAQI}</td></tr>
          <tr><td>co</td><td>{P_co}</td></tr>
          <tr><td>no</td><td>{P_no}</td></tr>
          <tr><td>no2</td><td>{P_no2}</td></tr>
          <tr><td>o3</td><td>{P_o3}</td></tr>
          <tr><td>so2</td><td>{P_so2}</td></tr>
          <tr><td>pm2_5</td><td>{P_pm2_5}</td></tr>
          <tr><td>pm10</td><td>{P_pm10}</td></tr>
          <tr><td>nd3</td><td>{P_nh3}</td></tr>
      </tbody>
      </table>;


	   	return (
      	<div>
        	<table style={{fontSize:16}}><tbody><tr style={{verticalAlign:'top'}}>
        	<td>
        		<h3>daily</h3>
      			
		        {dailyTable}
		        
        	</td>
        	<td>
        		<h3>hourly</h3>
        		
		        {hourlyTable}
		        
        	</td>
        	<td>
        		<h3>minutes</h3>
        		
		        {minutelyTable}
		        
        	</td>
        	</tr></tbody></table>
        	
					{pollutionTable}

					{rainMap}
      	</div>
    	);
  	}
};

/*

      const debugInfo=[
		 		'POLLUTION',JSON.stringify(pollution,null,4)
		 		//,'DAYS',JSON.stringify(daily,null,4)
      	//,'HOURLY',JSON.stringify(hourly,null,4)
		 		//,'MINUTES',JSON.stringify(minutely,null,4)
		 	];


<span style={{fontSize:'0.5em'}}>
<pre>
{debugInfo}
</pre>
</span>
*/


export default NodeFetchData;