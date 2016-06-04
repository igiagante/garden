/**
 * @author Ignacio Giagante, on 6/4/16.
 */

var Plague = require('../models/plague');

/**
 * Get all the plagues
 * @param req
 * @param res
 */
var getAll = function (req, res) {
    Plague.find(function (err, plagues) {
        if (err) {
            res.send(err);
        }
        return res.json(plagues);
    });
};

module.exports = {
    getAll: getAll
};
