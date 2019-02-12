const model = require('../models').student
const Promise = require('bluebird')

var studentMethods = {}

studentMethods.getStudentByAdmNo = (admNo) => {
    return new Promise((resolve, reject) => {
/*         console.log("inside student method");
 */        
        
        model.findOne({
            where: {
                admission_no: admNo
            }
        })
        .then((student) => {
/*             console.log("Student found")
 */            resolve(student)
        })
        .catch((err) => {
/*             console.log("student error");
 */            
            reject(err)
        })
    })
}

studentMethods.addStudent = (info) => {
    return new Promise((resolve, reject) => {
        model.create(info)
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

module.exports = studentMethods