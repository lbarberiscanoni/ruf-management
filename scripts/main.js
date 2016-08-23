var allData = new Firebase("https://grace-prez.firebaseio.com/ruf/officeHours");

$(document).ready(function() {


    //let's get today's date in order to make it the default
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    if (month < 10) {
        var month = "0".concat(month.toString());
        window.month = month;
    };
    var day = today.getDate();
    if (day < 10) {
        var day = "0".concat(day.toString());
        window.day = day;
    };
    var todaysDate = year.toString() + "-" + month.toString() + "-" + day.toString();

    //rendering the calendar with the appropriate data
    var initCalendar = function(guestList) {
        $("#calendar").remove();
        $("body").append("<div id='calendar'></div>");
        $("#calendar").fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,basicWeek,basicDay'
            },
            defaultDate: todaysDate,
            editable: false,
            eventLimit: 20, // allow "more" link when too many events
            events: guestList,
        });
    };

    appointmentList = []
    $.ajax({
        async: false,
        url: "https://grace-prez.firebaseio.com/ruf/officeHours/.json",
        dataType: 'json',
        cache: false,
        success: function(data) {
            console.log(data);
            fireIDList = Object.keys(data);
            for (i = 0; i < fireIDList.length - 1; i++) {
                if (fireIDList[i] != "a") {
                    appointmentList.push(data[fireIDList[i]]);
                };
            };
            initCalendar(appointmentList);
        },
    });
});
