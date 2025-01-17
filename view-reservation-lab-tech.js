var itemsPerPage = 6;
    var currentPage = 1;
    var data = [
        { reservationNumber: "123123", laboratory: "Chemistry Lab", time: "10:00 AM - 1:00 PM" },
        { reservationNumber: "123456", laboratory: "Chemistry Lab", time: "10:00 AM - 2:00 PM" },
        { reservationNumber: "123122", laboratory: "Chemistry Lab", time: "1:00 PM - 4:00 PM" },
        { reservationNumber: "123433", laboratory: "Computer Lab", time: "1:00 PM - 3:00 PM" },
        { reservationNumber: "123424", laboratory: "Computer Lab", time: "3:00 PM - 5:00 PM" },
        { reservationNumber: "123456", laboratory: "Computer Lab", time: "3:00 PM - 4:00 PM" },
        { reservationNumber: "123485", laboratory: "Electronics Lab", time: "12:00 PM - 3:00 PM" },
        { reservationNumber: "123025", laboratory: "Electronics Lab", time: "12:00 PM - 5:00 PM" },
        { reservationNumber: "123444", laboratory: "Electronics Lab", time: "11:00 AM - 2:00 PM" },
        { reservationNumber: "123999", laboratory: "Computer Lab", time: "11:00 AM - 3:00 PM" },
        { reservationNumber: "123967", laboratory: "Chemistry Lab", time: "6:00 AM - 10:00 AM" }
    ];
    
    // Get all unique start and end times
    var uniqueStartTimes = [...new Set(data.map(item => item.time.split(" - ")[0]))];
    var uniqueEndTimes = [...new Set(data.map(item => item.time.split(" - ")[1]))];

    // Sort the times if needed
    uniqueStartTimes.sort();
    uniqueEndTimes.sort();

    // Populate the select options for start time
    var startTimeSelect = document.getElementById("start-time");
    startTimeSelect.innerHTML = "<option value=''>Start Time</option>"; // Clear previous options
    uniqueStartTimes.forEach(time => {
        startTimeSelect.innerHTML += `<option value="${time}">${time}</option>`;
    });

    // Populate the select options for end time
    var endTimeSelect = document.getElementById("end-time");
    endTimeSelect.innerHTML = "<option value=''>End Time</option>"; // Clear previous options
    uniqueEndTimes.forEach(time => {
        endTimeSelect.innerHTML += `<option value="${time}">${time}</option>`;
    });
    
    document.getElementById("laboratry").addEventListener("change", displayItems);
    document.getElementById("start-time").addEventListener("change", displayItems);
    document.getElementById("end-time").addEventListener("change", displayItems);

    function displayItems() {
        var startIndex = (currentPage - 1) * itemsPerPage;
        var content = "";
        var selectedLab = document.getElementById("laboratry").value;
        var selectedStartTime = document.getElementById("start-time").value;
        var selectedEndTime = document.getElementById("end-time").value;
    
        // Filter data based on selected filters
        var filteredData = data.filter(item => {
            var timeComponents = item.time.split(" - "); // Split the time range into start and end components
            var startTime = timeComponents[0]; // Extract the start time
            var endTime = timeComponents[1]; // Extract the end time
            
            return (
                (selectedLab === "" || selectedLab === item.laboratory) &&
                (selectedStartTime === "" || startTime === selectedStartTime) &&
                (selectedEndTime === "" || endTime === selectedEndTime)
            );
        });
    
        // Check the number of filtered items
        var numFilteredItems = filteredData.length;
    
        // Adjust endIndex if the number of filtered items is less than itemsPerPage
        var endIndex = Math.min(startIndex + itemsPerPage, numFilteredItems);
    
        // Generate content for the current page
        for (var i = startIndex; i < endIndex; i++) {
            var item = filteredData[i];
            content += `<div class="mini-box">
                            <div><strong>Reservation #:</strong> ${item.reservationNumber}</div>
                            <div><strong>Laboratory:</strong> ${item.laboratory}</div>
                            <div><strong>Time:</strong> ${item.time}</div>
                        </div>`;
        }
    
        // Update HTML with the generated content
        document.getElementById("content").innerHTML = content;
        document.getElementById("currentPage").textContent = "Page " + currentPage;
    }

        function prevPage() {
            if (currentPage > 1) {
                currentPage--;
                displayItems();
            }
        }

        function nextPage() {
            if (currentPage < Math.ceil(data.length / itemsPerPage)) {
                currentPage++;
                displayItems();
            }
        }

        displayItems(); // Display initial items