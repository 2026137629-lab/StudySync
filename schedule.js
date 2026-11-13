// STUDYSYNC - STUDY SCHEDULE

// LOAD SAVED SCHEDULE DATA
const defaultSchedules = [
    {
        id: 1,
        subject: "IMS564",
        activity: "UX Design Revision",
        day: "Monday",
        startTime: "09:00",
        endTime: "10:00"
    },
    {
        id: 2,
        subject: "ICM572",
        activity: "Game Analysis Research",
        day: "Monday",
        startTime: "14:00",
        endTime: "15:30"
    },
    {
        id: 3,
        subject: "IMS511",
        activity: "Programming Practice",
        day: "Wednesday",
        startTime: "10:00",
        endTime: "12:00"
    },
    {
        id: 4,
        subject: "IMS555",
        activity: "Decision Theory Revision",
        day: "Friday",
        startTime: "15:00",
        endTime: "16:00"
    }
];

const savedSchedules = sessionStorage.getItem("studysyncSchedules");

let schedules = savedSchedules
    ? JSON.parse(savedSchedules)
    : defaultSchedules;

// SAVE SCHEDULE DATA
function saveSchedules() {
    sessionStorage.setItem(
        "studysyncSchedules",
        JSON.stringify(schedules)
    );
}

// GET HTML ELEMENTS
const scheduleForm = document.getElementById("scheduleForm");
const scheduleList = document.getElementById("scheduleList");
const dayFilter = document.getElementById("dayFilter");

const studySubject = document.getElementById("studySubject");
const studyActivity = document.getElementById("studyActivity");
const studyDay = document.getElementById("studyDay");
const startTime = document.getElementById("startTime");
const endTime = document.getElementById("endTime");

const editSessionId = document.getElementById("editSessionId");
const scheduleFormTitle = document.getElementById("scheduleFormTitle");
const scheduleSubmitButton = document.getElementById("scheduleSubmitButton");
const cancelEditButton = document.getElementById("cancelEditButton");
const scheduleMessage = document.getElementById("scheduleMessage");

// CALCULATE STUDY DURATION
function calculateDuration(start, end) {

    const startMinutes =
        Number(start.split(":")[0]) * 60 +
        Number(start.split(":")[1]);

    const endMinutes =
        Number(end.split(":")[0]) * 60 +
        Number(end.split(":")[1]);

    return (endMinutes - startMinutes) / 60;
}

// UPDATE SCHEDULE SUMMARY
function updateScheduleSummary() {

    const totalSessions = schedules.length;

    const totalHours = schedules.reduce((total, session) => {
        return total + calculateDuration(
            session.startTime,
            session.endTime
        );
    }, 0);

    document.getElementById("totalSessions").textContent =
        totalSessions;

    document.getElementById("totalHours").textContent =
        totalHours.toFixed(1);
}

// DISPLAY SCHEDULES IN TABLE
function displaySchedules(data) {

    scheduleList.innerHTML = "";

    if (data.length === 0) {
        scheduleList.innerHTML = `
            <tr>
                <td colspan="8" class="text-center">
                    No study sessions found.
                </td>
            </tr>
        `;
        return;
    }

    data.forEach((session, index) => {

        const row = document.createElement("tr");

        const duration = calculateDuration(
            session.startTime,
            session.endTime
        );

        const values = [
            index + 1,
            session.subject,
            session.activity,
            session.day,
            session.startTime,
            session.endTime,
            duration.toFixed(1) + " hours"
        ];

        values.forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        // ACTION BUTTONS
        const actionCell = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.textContent = "Edit";
        editButton.className = "btn btn-sm btn-outline-primary me-1";

        editButton.addEventListener("click", function () {
            editSession(session.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.className = "btn btn-sm btn-outline-danger";

        deleteButton.addEventListener("click", function () {
            deleteSession(session.id);
        });

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        row.appendChild(actionCell);

        scheduleList.appendChild(row);
    });
}

// ADD OR UPDATE STUDY SESSION
scheduleForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const subject = studySubject.value;
    const activity = studyActivity.value.trim();
    const day = studyDay.value;
    const start = startTime.value;
    const end = endTime.value;

    // VALIDATE TIME
    if (end <= start) {

        scheduleMessage.textContent =
            "End time must be later than start time.";

        scheduleMessage.style.color = "red";
        return;
    }

    // CHECK WHETHER USER IS EDITING
    if (editSessionId.value) {

        const id = Number(editSessionId.value);

        const index = schedules.findIndex(
            session => session.id === id
        );

        if (index !== -1) {

            schedules[index] = {
                id: id,
                subject: subject,
                activity: activity,
                day: day,
                startTime: start,
                endTime: end
            };
        }

        scheduleMessage.textContent =
            "Study session updated successfully!";

    } else {

        // CREATE NEW SESSION
        const newSession = {
            id: Date.now(),
            subject: subject,
            activity: activity,
            day: day,
            startTime: start,
            endTime: end
        };

        schedules.push(newSession);

        scheduleMessage.textContent =
            "Study session added successfully!";
    }

    scheduleMessage.style.color = "green";

    saveSchedules();
    resetScheduleForm();
    updateScheduleSummary();
    filterSchedules();
});

// EDIT STUDY SESSION
function editSession(id) {

    const session = schedules.find(
        item => item.id === id
    );

    if (!session) return;

    studySubject.value = session.subject;
    studyActivity.value = session.activity;
    studyDay.value = session.day;
    startTime.value = session.startTime;
    endTime.value = session.endTime;

    editSessionId.value = session.id;

    scheduleFormTitle.textContent = "Edit Study Session";
    scheduleSubmitButton.textContent = "Update Study Session";
    cancelEditButton.style.display = "inline-block";

    scheduleMessage.textContent = "";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// RESET FORM
function resetScheduleForm() {

    scheduleForm.reset();

    editSessionId.value = "";

    scheduleFormTitle.textContent = "Add Study Session";
    scheduleSubmitButton.textContent = "Add Study Session";
    cancelEditButton.style.display = "none";
}

// CANCEL EDITING
cancelEditButton.addEventListener("click", function() {

    resetScheduleForm();

    scheduleMessage.textContent = "";
});

// DELETE STUDY SESSION
function deleteSession(id) {

    schedules = schedules.filter(
        session => session.id !== id
    );

    saveSchedules();

    if (Number(editSessionId.value) === id) {
        resetScheduleForm();
        scheduleMessage.textContent = "";
    }

    updateScheduleSummary();
    filterSchedules();
}

// FILTER SCHEDULES BY DAY
function filterSchedules() {

    const selectedDay = dayFilter.value;

    const filteredSchedules = schedules.filter(session => {

        return selectedDay === "All" ||
            session.day === selectedDay;

    });

    displaySchedules(filteredSchedules);
}

// LISTEN FOR FILTER CHANGES
dayFilter.addEventListener("change", filterSchedules);

// INITIAL DISPLAY
updateScheduleSummary();
displaySchedules(schedules);

// ========================================
// STUDENT PROFILE DROPDOWN & EDIT PROFILE
// ========================================

const profileTrigger = document.getElementById("profileTrigger");
const profileMenu = document.getElementById("profileMenu");

const profileView = document.getElementById("profileView");
const profileEditForm = document.getElementById("profileEditForm");

const editProfileButton = document.getElementById("editProfileButton");
const cancelProfileEdit = document.getElementById("cancelProfileEdit");

// Profile information elements
const profileName = document.getElementById("profileName");
const profileStudentId = document.getElementById("profileStudentId");
const profileFaculty = document.getElementById("profileFaculty");
const profileLocation = document.getElementById("profileLocation");

// Edit input elements
const editProfileName = document.getElementById("editProfileName");
const editProfileStudentId = document.getElementById("editProfileStudentId");
const editProfileFaculty = document.getElementById("editProfileFaculty");
const editProfileLocation = document.getElementById("editProfileLocation");

const profileStorageKey = "studySyncProfile";

// Default profile information
const defaultProfile = {
    name: "Student Name",
    studentId: "2026XXXXXX",
    faculty: "Faculty of Information Science",
    location: "Universiti Teknologi MARA"
};

// Load saved profile
let studentProfile = JSON.parse(
    localStorage.getItem(profileStorageKey)
) || defaultProfile;


// Display profile information
function displayProfile() {

    profileName.textContent = studentProfile.name;
    profileStudentId.textContent = studentProfile.studentId;
    profileFaculty.textContent = studentProfile.faculty;
    profileLocation.textContent = studentProfile.location;

    const triggerName = document.querySelector(".profile-trigger-name");

    if (triggerName) {
        triggerName.textContent = studentProfile.name;
    }
}


// Fill edit form with current information
function fillProfileForm() {

    editProfileName.value = studentProfile.name;
    editProfileStudentId.value = studentProfile.studentId;
    editProfileFaculty.value = studentProfile.faculty;
    editProfileLocation.value = studentProfile.location;

}


// Position profile popup
function positionProfileMenu() {

    const rect = profileTrigger.getBoundingClientRect();

    const menuWidth = profileMenu.offsetWidth;

    const left = Math.min(
        rect.left,
        window.innerWidth - menuWidth - 12
    );

    const bottom = window.innerHeight - rect.top + 10;

    profileMenu.style.left = Math.max(12, left) + "px";
    profileMenu.style.bottom = bottom + "px";
}


// Open and close profile dropdown
profileTrigger.addEventListener("click", function (event) {

    event.stopPropagation();

    const isOpen = profileMenu.classList.toggle("show");

    profileTrigger.setAttribute("aria-expanded", isOpen);

    if (isOpen) {
        positionProfileMenu();
    }

});


// Open edit mode
editProfileButton.addEventListener("click", function () {

    fillProfileForm();

    profileView.hidden = true;
    profileEditForm.hidden = false;

    positionProfileMenu();

});


// Cancel editing
cancelProfileEdit.addEventListener("click", function () {

    profileEditForm.hidden = true;
    profileView.hidden = false;

    positionProfileMenu();

});


// Save profile changes
profileEditForm.addEventListener("submit", function (event) {

    event.preventDefault();

    studentProfile = {
        name: editProfileName.value.trim(),
        studentId: editProfileStudentId.value.trim(),
        faculty: editProfileFaculty.value.trim(),
        location: editProfileLocation.value.trim()
    };

    localStorage.setItem(
        profileStorageKey,
        JSON.stringify(studentProfile)
    );

    displayProfile();

    profileEditForm.hidden = true;
    profileView.hidden = false;

    positionProfileMenu();

});


// Close dropdown when clicking outside
document.addEventListener("click", function (event) {

    if (!event.target.closest(".profile-dropdown")) {

        profileMenu.classList.remove("show");

        profileTrigger.setAttribute("aria-expanded", "false");

    }

});


// Reposition popup when window resizes
window.addEventListener("resize", function () {

    if (profileMenu.classList.contains("show")) {
        positionProfileMenu();
    }

});


// Display saved profile when dashboard loads
displayProfile();