const express = require('express');
const router = express.Router();
const Flight = require('../models/flight');
const Destination = require('../models/destination')
const methodOverride = require('method-override');

//INDEX
router.get('/', async(req,res)=> {
    console.log("Index Controller running")
    try{
        const foundFlight = await Flight.find({});
        res.status(200).render('flights/Index', {flights: foundFlight})
    }catch (err){
        res.status(400).send(err)
    }
})

//NEW
router.get('/new', (req, res) => {
    const newFlight = new Flight();
	// Obtain the default date
	const dt = newFlight.departs;
	// Format the date for the value attribute of the input
	const departsDate = dt.toISOString().slice(0, 16);
	res.render('flights/new', {departsDate});
});

//DELETE
router.delete('/:id', async(req,res)=>{
  try {
    await Flight.findByIdAndDelete(req.params.id);
    res.status(200).redirect('/flights')
  } catch (error) {
    res.status(400).send(err);
  }
  }
)

// CREATE : recieves info from new route to then create a new fruit w/ it
router.post('/', async (req, res) => {
    try {
      const newFlight = await Flight.create(req.body);
      console.log(newFlight);
      // redirect is making a GET request to whatever path you specify
      res.redirect('/flights');
    } catch (err) {
      res.status(400).send(err);
    }
  });
// CREATE DESTINATION
router.post("/:id/destinations", async (req, res) => {
  try {
    const flightId = req.params.id;
    //console.log(`Flight id is ${flightId}`);
    const { airport, arrival } = req.body;
    //console.log(`airport is ${airport} and arrival is ${arrival}`);

    // Parse the arrival time string and convert it to a Date object
    //const arrivalTime = new Date(arrival);

    // Create a new destination document with the formatted arrival time
    const destination = await Destination.create({
      airport: airport,
      arrival: arrival,
      flight: flightId,
    });
    //console.log(`destination airport ${destination.airport} and arrival ${destination.arrival}`);
    const updatedFlight = await Flight.findByIdAndUpdate(
      flightId,
      { $addToSet: { destinations: destination._id } },
      { new: true }
    );
    //console.log(`updated flight ${updatedFlight}`);

    // Redirect to the flight details page
    res.redirect(`/flights/${flightId}`);
  } catch (error) {
    res.status(400).send(error);
  }
});

// EDIT 
router.get('/:id/edit', async (req, res)=> {
  try {
    const foundFlight = await Flight.findById(req.params.id);
    res.render('flights/Edit', {flight : foundFlight})
    
  } catch (error) {
    res.status(400).send(error)
    
  }
})

// SHOW FLIGHT
router.get("/:id", async (req, res) => {
  try {
    const foundFlight = await Flight.findById(req.params.id).populate("destinations");
    console.log(`FLIGHT ${foundFlight}`)

    res.render('flights/Show', { flight: foundFlight });
  } catch (error) {
    res.status(400).send(error);
  }
});


// SHOW DESTINATION
router.get("/:flightId/destinations", async (req, res) => {
  try {
    const flightId = req.params.flightId;

    const flight = await Flight.findById(flightId).populate("destinations");
    //console.log(`FLIGHT ${flight}`)
    
    res.render("flights/Destinations", { flight });
  } catch (error) {
    res.status(400).send(error);
  }
});




module.exports = router;
