const React = require("react")
const DefaultLayout = require("../layout/Default")

class Show extends React.Component {
  render() {
    const flight = this.props.flight
    // Sort the destinatins by arrival date in ascending order
    flight.destinations.sort((a, b) => new Date(a.arrival) - new Date(b.arrival));
    return (
      <DefaultLayout 
        title="Flight Details"
        link="/flights"
        text="ALL FLIGHTS"
      >
  
<p>Airline: {flight.airline}</p>
<p>Flight Number: {flight.flightNo}</p>
<p>Departs: {flight.departs.toLocaleString()}</p>
<p>Airport: {flight.airport}</p>

<h2>Destinations:</h2>
{flight.destinations && flight.destinations.length > 0 ? (
  <ul>
    {flight.destinations.map((destination) => {
      //console.log(`DESTINATION ${destination}`)
      return(
        <li key={destination._id}>
          <p>Airport: {destination.airport}</p>
          <p>Arrival: {destination.arrival?destination.arrival.toLocaleString():""}</p>
          
        </li>
      )
    })}
  </ul>
) : (
  <p>No destinations available.</p>
)}
        <h1>Add a Destination</h1>
        <form action={`/flights/${flight._id}/destinations`} method="POST">
  Arrival:
  <input
    type="datetime-local"
    name="arrival"
    required
  />
  Airport:
  <select name="airport">
    <option value="AUS">AUS</option>
    <option value="DAL">DAL</option>
    <option value="LAX">LAX</option>
    <option value="SAN">SAN</option>
    <option value="SEA">SEA</option>
  </select>

  <input type="submit" value="Submit" />
</form>


          
      </DefaultLayout>
    )
  }
}

module.exports = Show