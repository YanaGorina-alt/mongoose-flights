const React = require("react");
const DefaultLayout = require("../layout/Default");

class New extends React.Component {
  render() {
    return(
      <DefaultLayout
      title="Create a New Flight!"
      link="/flights"
      text="ALL FLIGHTS"
      >
        {/* <h1>Create a New Flight!</h1> */}
        <form action="/flights" method="POST">
          Airline: <input type="text" name="airline" />
          Flight Number : <input type="number" name="flightNo" />
          Departs: 
          <input 
            type="datetime-local" 
            name="departs"
            value = {this.props.departsDate}
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
          <input type="submit" value="Create Flight" />       
        </form>
      </DefaultLayout>
    )
  }
}

module.exports = New