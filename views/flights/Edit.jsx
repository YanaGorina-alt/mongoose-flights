const React = require("react")
const DefaultLayout = require("../layout/Default")

class Edit extends React.Component {
  render() {
    //grabbing the flight givin to this page by the edit route on the server.
    const flight = this.props.flight
    return (
      <DefaultLayout
        title="Edit Page"
        // 2 properties below are for the Nav component
        link="/flights"
        text="ALL FLIGHTS"
      >
        <form action={`/flights/${flight._id}`} method = "POST">
            Arrival:
            <input 
                type="datetime-local" 
                name="departs"
            /> 
            Airport : <select name="airport">
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

module.exports = Edit