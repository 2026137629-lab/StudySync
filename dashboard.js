// ========================================
// STUDYSYNC - DASHBOARD
// ========================================

// DEFAULT DATA

const defaultAssignments = [
    {
        id: 1,
        title: "UX Design Proposal",
        subject: "IMS564",
        dueDate: "2026-11-10",
        priority: "High",
        status: "Pending"
    },
    {
        id: 2,
        title: "Game Analysis",
        subject: "ICM572",
        dueDate: "2026-11-14",
        priority: "Medium",
        status: "Pending"
    },
    {
        id: 3,
        title: "Programming Exercise",
        subject: "IMS511",
        dueDate: "2026-11-18",
        priority: "Low",
        status: "Completed"
    },
    {
        id: 4,
        title: "Decision Theory Report",
        subject: "IMS555",
        dueDate: "2026-11-20",
        priority: "High",
        status: "Completed"
    }
];

const defaultSubjects = [
    { code: "IMS564", name: "User Experience Design", credit: 3, semester: 4 },
    { code: "ICM572", name: "Gamification", credit: 3, semester: 4 },
    { code: "IMS511", name: "Programming", credit: 3, semester: 4 },
    { code: "IMS555", name: "Decision Theory", credit: 3, semester: 3 },
    { code: "IMR533", name: "Cybersecurity", credit: 3, semester: 3 },
    { code: "IMC501", name: "Information Management", credit: 3, semester: 3 }
];

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


// LOAD SAVED DATA

const assignments = JSON.parse(
    sessionStorage.getItem("studysyncAssignments")
) || defaultAssignments;

const subjects = JSON.parse(
    sessionStorage.getItem("studysyncSubjects")
) || defaultSubjects;

const schedules = JSON.parse(
    sessionStorage.getItem("studysyncSchedules")
) || defaultSchedules;


// COMMON DAY ORDER

const dayOrder = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
];


// ========================================
// 1. DASHBOARD SUMMARY
// ========================================

function updateDashboardSummary() {

    const total = assignments.length;

    const completed = assignments.filter(
        item => item.status === "Completed"
    ).length;

    const pending = assignments.filter(
        item => item.status === "Pending"
    ).length;

    const completionRate = total > 0
        ? Math.round((completed / total) * 100)
        : 0;

    document.getElementById("dashboardSubjects").textContent =
        subjects.length;

    document.getElementById("dashboardTotal").textContent = total;

    document.getElementById("dashboardCompleted").textContent =
        completed;

    document.getElementById("dashboardPending").textContent =
        pending;

    document.getElementById("dashboardCompletionRate").textContent =
        completionRate + "%";

    document.getElementById("dashboardCompletedLegend").textContent =
        completed;

    document.getElementById("dashboardPendingLegend").textContent =
        pending;

    updateWaveProgress(completionRate);
}

// ========================================
// WAVY ACADEMIC PROGRESS
// ========================================

function updateWaveProgress(completionRate) {

    const waveTrack = document.getElementById("waveTrack");
    const waveProgress = document.getElementById("waveProgress");
    const flag = document.getElementById("progressFlag");

    const totalLength = waveTrack.getTotalLength();
    const progressLength = totalLength * (completionRate / 100);

    // Fill the wave according to completion percentage
    waveProgress.style.strokeDasharray = totalLength;
    waveProgress.style.strokeDashoffset =
        totalLength - progressLength;

    // Move the flag along the wave
    const position = waveTrack.getPointAtLength(progressLength);

    flag.setAttribute(
        "transform",
        `translate(${position.x}, ${position.y})`
    );
}

// ========================================
// 2. MY SUBJECTS - MIND MAP
// ========================================

function displayDashboardSubjects() {

    const container = document.getElementById("dashboardSubjectMap");

    container.innerHTML = "";

    if (subjects.length === 0) {
        container.textContent = "No subjects registered yet.";
        return;
    }

    const center = document.createElement("div");
    center.className = "mindmap-center";
    center.innerHTML = `
        <i class="bi bi-mortarboard-fill"></i>
        <strong>My Academic</strong>
        <span>Subjects</span>
    `;

    container.appendChild(center);

    const nodesContainer = document.createElement("div");
    nodesContainer.className = "mindmap-nodes";

    subjects.forEach(subject => {

        const node = document.createElement("a");
        node.className = "mindmap-node";
        node.href = "subjects.html";

        const code = document.createElement("strong");
        code.textContent = subject.code;

        const name = document.createElement("span");
        name.textContent = subject.name;

        const semester = document.createElement("small");
        semester.textContent = "Semester " + subject.semester;

        node.appendChild(code);
        node.appendChild(name);
        node.appendChild(semester);

        nodesContainer.appendChild(node);
    });

    container.appendChild(nodesContainer);
}


// ========================================
// 3. WEEKLY STUDY CALENDAR
// ========================================

function formatTime(time) {

    const [hours, minutes] = time.split(":").map(Number);

    const date = new Date();
    date.setHours(hours, minutes, 0, 0);

    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });
}

function displayWeeklyCalendar() {

    const container = document.getElementById("dashboardWeeklyCalendar");

    container.innerHTML = "";

    const calendarGrid = document.createElement("div");
    calendarGrid.className = "weekly-calendar-grid";

    dayOrder.forEach(day => {

        const column = document.createElement("div");
        column.className = "calendar-day";

        const heading = document.createElement("div");
        heading.className = "calendar-day-heading";
        heading.textContent = day.substring(0, 3);

        column.appendChild(heading);

        const daySessions = schedules
            .filter(session => session.day === day)
            .sort((a, b) => a.startTime.localeCompare(b.startTime));

        if (daySessions.length === 0) {

            const empty = document.createElement("p");
            empty.className = "calendar-empty";
            empty.textContent = "No sessions";

            column.appendChild(empty);

        } else {

            daySessions.forEach(session => {

                const event = document.createElement("div");
                event.className = "calendar-event";

                const subject = document.createElement("strong");
                subject.textContent = session.subject;

                const activity = document.createElement("span");
                activity.textContent = session.activity;

                const time = document.createElement("small");
                time.textContent =
                    formatTime(session.startTime) + " – " +
                    formatTime(session.endTime);

                event.appendChild(subject);
                event.appendChild(activity);
                event.appendChild(time);

                column.appendChild(event);
            });
        }

        calendarGrid.appendChild(column);
    });

    container.appendChild(calendarGrid);
}


// ========================================
// 4. UPCOMING DEADLINES WITH COUNTDOWN
// ========================================

function getDaysRemaining(dateString) {

    const [year, month, day] = dateString.split("-").map(Number);

    const dueDate = new Date(year, month - 1, day);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    return Math.round(
        (dueDate - today) / (1000 * 60 * 60 * 24)
    );
}

function displayUpcomingDeadlines() {

    const container = document.getElementById("upcomingDeadlines");

    container.innerHTML = "";

    const pendingAssignments = assignments
        .filter(item => item.status === "Pending")
        .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
        .slice(0, 5);

    if (pendingAssignments.length === 0) {
        container.textContent = "No upcoming deadlines. Great job!";
        return;
    }

    pendingAssignments.forEach(assignment => {

        const item = document.createElement("div");
        item.className = "dashboard-deadline-item";

        const details = document.createElement("div");
        details.className = "deadline-main";

        const title = document.createElement("h4");
        title.textContent = assignment.title;

        const information = document.createElement("p");
        information.textContent =
            assignment.subject + " · Due " +
            new Date(assignment.dueDate + "T00:00:00")
                .toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                });

        details.appendChild(title);
        details.appendChild(information);

        const daysLeft = getDaysRemaining(assignment.dueDate);

        const countdown = document.createElement("span");
        countdown.className = "deadline-countdown";

        if (daysLeft < 0) {
            countdown.textContent =
                Math.abs(daysLeft) + " days overdue";
            countdown.classList.add("deadline-overdue");

        } else if (daysLeft === 0) {
            countdown.textContent = "Due today";
            countdown.classList.add("deadline-urgent");

        } else if (daysLeft <= 3) {
            countdown.textContent = daysLeft + " days left";
            countdown.classList.add("deadline-urgent");

        } else {
            countdown.textContent = daysLeft + " days left";
            countdown.classList.add("deadline-normal");
        }

        const priority = document.createElement("span");
        priority.className =
            "deadline-priority priority-" +
            assignment.priority.toLowerCase();

        priority.textContent = assignment.priority;

        const badges = document.createElement("div");
        badges.className = "deadline-badges";

        badges.appendChild(priority);
        badges.appendChild(countdown);

        item.appendChild(details);
        item.appendChild(badges);

        container.appendChild(item);
    });
}

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

// INITIALIZE DASHBOARD
updateDashboardSummary();
displayDashboardSubjects();
displayWeeklyCalendar();
displayUpcomingDeadlines();

// INITIALIZE STUDENT PROFILE
displayProfile();