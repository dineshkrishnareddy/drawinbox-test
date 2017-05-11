var db = require('../model/employee.js');
var path = require('path');
var bodyParser = require('body-parser');

module.exports = function (app){
    app.use( bodyParser.json() );
    app.use(bodyParser.urlencoded({     
        extended: true
    }));
    
    app.get('/',function(req,res){
        res.sendFile(path.resolve("src/client/index.html"));
    });

    app.get('/api/employees',function(req,res){
        db.employeeModel.find({}, function(err, result){
            if (err)
                res.end();
            res.json(result);
        });
    });

    app.post('/api/employees',function(req,res){
        var Employee = new db.employeeModel();
        Employee.name = req.body.name;
        Employee.experience = parseFloat(req.body.experience);
        Employee.salary = parseFloat(req.body.salary);

        Employee.save(function(err, result){

            if(err) {

                return;
            }

            res.json(result);
        });
    });
    
    app.put('/api/employees/:id',function(req,res){

        var id = req.params.id;
        var employee = req.body;

        db.employeeModel.findById({_id: id}, function(err, result){

            if(err) {

                return;
            }

            result.name = employee.name;
            result.experience = parseFloat(employee.experience);
            result.salary = parseFloat(employee.salary);

            result.save(function(err, result){

                if(err) {

                    return;
                }

                res.json(result);
            });
        })
    });

    app.delete('/api/employees/:id',function(req,res){

        var id = req.params.id;

        db.employeeModel.findByIdAndRemove({_id: id}, function(err, result){

            if(err) {

                return;
            }

            res.json(result);
        })
    });

    app.post('/api/resources',function(req,res){
        var srBudget = parseFloat(req.body.srBudget || 0),
            jnBudget = parseFloat(req.body.jnBudget || 0),
            srEmp = parseFloat(req.body.srEmp || 0),
            jnEmp = parseFloat(req.body.jnEmp || 0),
            seniorEmployees = [],
            juniorEmployees = [], i, j;

        if (srEmp > 0) {

            db.employeeModel
                .find({salary: {$lt: srBudget}, experience: {$gt: 3}})
                .sort({experience: 'desc', salary: 'asc'})
                .exec(function (err, result) {

                    if (err) {

                        return;
                    }

                    for (i=0, j=0; i< result.length && j<srEmp; i++) {
                        if (result[i].salary < srBudget) {
                            srBudget -= result[i].salary;
                            seniorEmployees.push(result[i]);
                            j++;
                        }
                    }

                    if (j!==srEmp) {
                        jnEmp = 0;
                        seniorEmployees = [];
                    }

                    if (jnEmp > 0){
                        db.employeeModel
                            .find({salary: {$lt: jnBudget}, experience: {$lt: 3}})
                            .sort({experience: 'desc', salary: 'asc'})
                            .exec(function (err, result) {
                                if (err) {

                                    return;
                                }

                                for (i=0, j=0; i< result.length && j<jnEmp; i++) {
                                    if (result[i].salary < jnBudget) {
                                        jnBudget -= result[i].salary;
                                        juniorEmployees.push(result[i]);
                                        j++;
                                    }
                                }

                                if (j!==jnEmp) {
                                    juniorEmployees = [];
                                    seniorEmployees = [];
                                }
                                res.json({ 'seniorEmployees': seniorEmployees, 'juniorEmployees': juniorEmployees });
                            })
                    } else {

                        res.json({'seniorEmployees': seniorEmployees, 'juniorEmployees': juniorEmployees});
                    }
                })
        } else if (jnEmp > 0){

            db.employeeModel
                .find({salary: {$lt: jnBudget}, experience: {$lt: 3}})
                .sort({experience: 'desc', salary: 'asc'})
                .exec(function (err, result) {
                    if (err) {

                        return;
                    }

                    for (i=0, j=0; i< result.length && j<jnEmp; i++) {
                        if (result[i].salary < jnBudget) {
                            jnBudget -= result[i].salary;
                            juniorEmployees.push(result[i]);
                            j++;
                        }
                    }

                    if (j!==jnEmp) {
                        juniorEmployees = [];
                    }

                    res.json({ 'seniorEmployees': seniorEmployees, 'juniorEmployees': juniorEmployees });
                })
        } else {

            res.json({ 'seniorEmployees': seniorEmployees, 'juniorEmployees': juniorEmployees });
        }
    });

};