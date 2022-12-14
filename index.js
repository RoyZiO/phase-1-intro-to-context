// Your code here

const createEmployeeRecord = function(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}


const createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row)
    })
}


const createTimeInEvent = function(employee, timeStamp){
    let [date, hour] = timeStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}


const createTimeOutEvent = function(employee, timeStamp){
    let [date, hour] = timeStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}


const hoursWorkedOnDate = function(employee, arrangedDate){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === arrangedDate
    })

    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === arrangedDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}


const wagesEarnedOnDate = function(employee, sortDate){
    let earnedWage = hoursWorkedOnDate(employee, sortDate)
        * employee.payPerHour
    return parseFloat(earnedWage.toString())
}


const allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, date){
        return memo + wagesEarnedOnDate(employee, date)
    }, 0)

    return payable
}


const calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, record){
        return memo + allWagesFor(record)
    }, 0)
}
