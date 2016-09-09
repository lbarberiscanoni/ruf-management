var allData = new Firebase("https://grace-prez.firebaseio.com/ruf/officeHours");

$(document).ready(function() {
    $("#person").change(function() {
        var person = $("#person").val();

        allData.on("child_added", function(snap) {
            var appointment = snap.val();
            if (appointment.person == person) {
                var stat = appointment.status == "pending" ? "" : "disabled";
                console.log(stat);
                $("#" + appointment.status).append("<button class='btn btn-default' " + stat + " style='width: 50%; white-space: normal;' id='" + snap.key() + "'><p>" + appointment.title + "</p><p>" + appointment.start + " " + appointment.end + "</p></button>");
                $(".btn:last").click(function() {
                    $(this).empty();
                    var appointmentID = this.id;
                    $(this).append("<button class='btn btn-success'>Accept</button><button class='btn btn-danger'>Reject</button>");
                    $(".btn-success:last").click(function() {
                        allData.child(appointmentID).update({ "status": "accepted"});
                        window.location.reload();
                    });
                    $(".btn-danger:last").click(function() {
                        allData.child(appointmentID).update({ "status": "rejected"});
                        window.location.reload();
                    });
                });
            };
        });                        
    });
});
