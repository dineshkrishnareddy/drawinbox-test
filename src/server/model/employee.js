var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
    SchemaTypes = Schema.Types;

require('mongoose-double')(mongoose);


var Employee = Schema({
	name: { type: String, required: true },
	experience: { type: SchemaTypes.Double, required: true },
	salary: { type: SchemaTypes.Double, required: true }
});

var employeeModel = mongoose.model('Employee', Employee);

module.exports = {
	employeeModel: employeeModel
};