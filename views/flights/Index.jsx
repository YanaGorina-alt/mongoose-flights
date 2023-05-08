const React = require("react");
const DefaultLayout = require("../layout/Default");


class Index extends React.Component{
    render(){
        const {flights} = this.props;
        // Sort the flights by departure date in ascending order
        flights.sort((a, b) => new Date(a.departs) - new Date(b.departs));
        return(
            <DefaultLayout
                title = "All Flights"
                link = "/flights/new"
                text = "ADD FLIGHT"
            >
                <ul>
                    {flights.map((flight, i) => {
                        return(
                            <li key ={i}>

                                {flight.airline}<br/>
                                {flight.flightNo}<br/>
                                {flight.departs.toLocaleString() }<br/>
                                <a href={`/flights/${flight._id}`}>Detail</a><br/>
                                <form action= {`/flights/${flight._id}?_method=DELETE`} method="POST">
                                    <input type = "submit" value="DELETE" />
                                </form>
                    
                            </li>
                        )
                    }

                    )
                    }
                </ul>
            </DefaultLayout>

        )
    }
}

module.exports =Index;