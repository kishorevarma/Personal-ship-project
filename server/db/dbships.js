const environment = process.env.NODE_ENV || 'development'
const config = require('../../knexfile')[environment]
const db = require('knex')(config)


function getShipsList(cruise_line, testConn)   {
    const conn = testConn || db
    console.log('server/db/dbships.js getShipsList called!')

    //Line below connects to Ships Table
    return conn('Ships')
    //Line below picks out the Ships to display for each Cruise Line
    .select('id','cruise_line','ship_name')
    //Line below picks up the Cruise line from where the Ships names have come from
    .where('cruise_line', cruise_line)
    //Line below puts Ships in Alphabetical Order.
    .orderBy("ship_name")    
    .then(dbResult  =>  {
        console.log('dbships.js - GOT SHIPS LIST:', dbResult)
        return dbResult
    })
}

//The Functions below are used for getting Ships on Review Page

//function getShips(testConn) { 
function getShips(cruise_line, testConn) {
    const conn = testConn || db
    console.log('server/db/dbships.js getShips called!')

    //Line below connects to Ships Table
    return conn('Ships')

    //Line below picks out ships to display on a Cruise Line Reiew Page
    .select('id', 'cruise_line', 'ship_name')
    //Line below picks up the Cruise Line from where the Ships name have come from
    .where('cruise_line', cruise_line)
    //Line below puts Ships in Alphabetical Order down the Rreview Page for a Cruise Line
    .orderBy('ship_name')
    .then (dbResult =>  {
        console.log('dbdhips.js - GOT SHIPS FOR REVIEW PAGE:', dbResult)
        return  dbResult
    }) 
}

// function getShip(testConn)  {
//     const conn = testConn || db
//     console.log('server/db/dbships.js getShip called!')

//     //Line below connects to Ships Table
//     return conn('Ships')
// }

module.exports = {
    getShipsList,
    getShips
}