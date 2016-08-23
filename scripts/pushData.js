var rufDB = new Firebase("https://grace-prez.firebaseio.com/ruf");

$(document).ready(function() {
    $("#submitAnnouncement").click(function() {
        var announcementTitle = $("#title").val();
        var announcementDetails = $("#details").val();

        var dateFormatted = Date.today().toString("MM-d-yyyy");

        rufDB.child("announcements").push({
            "name": announcementTitle,
            "description": announcementDetails,
            "date": dateFormatted,
        });

        alert("successfully added an announcement");
        window.location.reload();
    });

    $("#addEvent").click(function() {
        var eventName = $("#name").val();
        var eventDescription = $("#description").val();
        var imageLink = $("#url").val();
        var eventDate = $("#date").val();

        var newEvent = rufDB.child("events").push({
            date: eventDate,
            description: eventDescription,
            image: imageLink,
            name: eventName,
            attendees: {"a": "filler" },
        });

        newID = newEvent.key();
        newEvent.update({
            "fireID": newID,
        });

        alert("successfully added an event");
        window.location.reload();
    });

    $("#publishPodcast").click(function() {
        var podName = $("#podName").val();
        var podNotes = $("#notes").val();
        var podLink = $("#link").val();
        var dateFormatted = Date.today().toString("MM-d-yyyy");

        var newPodcast = rufDB.child("podcasts").push({
            date: dateFormatted,
            description: podNotes,
            image: podLink,
            name: podName,
        });

        var newID = newPodcast.key();
        newPodcast.update({
            "fireID": newID,
        });

        alert("successfully added a podcast");
        window.location.reload();
    });
});
