module.exports = {

    // redirect to /departments
    rootRouteRedirect: (req,res) => {
        res.redirect('/departments')
    },


    // Not Found
    routeNotFound: (req, res) => {
        res.status(404).send('404 not found!!!!')
    }

}