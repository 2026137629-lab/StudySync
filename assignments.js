
// STUDYSYNC - MY ASSIGNMENTS

// Sample assignment data
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

// Load saved assignments or use default data
let assignments = JSON.parse(
    sessionStorage.getItem("studysyncAssignments")
) || defaultAssignments;

// Save assignments to session storage
function saveAssignments() {
    sessionStorage.setItem(
        "studysyncAssignments",
        JSON.stringify(assignments)
    );
}

// Get HTML elements
const assignmentForm = document.getElementById("assignmentForm");
const assignmentList = document.getElementById("assignmentList");
const assignmentSearch = document.getElementById("assignmentSearch");
const assignmentFilter = document.getElementById("assignmentFilter");

// Display summary
function updateSummary() {

    const total = assignments.length;

    const pending = assignments.filter(
        assignment => assignment.status === "Pending"
    ).length;

    const completed = assignments.filter(
        assignment => assignment.status === "Completed"
    ).length;

    document.getElementById("totalAssignments").textContent = total;
    document.getElementById("pendingAssignments").textContent = pending;
    document.getElementById("completedAssignments").textContent = completed;
}

// Display assignments
function displayAssignments(data) {

    assignmentList.innerHTML = "";

    if (data.length === 0) {
        assignmentList.innerHTML = "<p>No assignments found.</p>";
        return;
    }

    data.forEach(assignment => {

        const card = document.createElement("div");

        card.className = "subject-item";

        card.innerHTML = `
            <h3>${assignment.title}</h3>
            <p>Subject: ${assignment.subject}</p>
            <p>Due Date: ${assignment.dueDate}</p>
            <p>Priority: ${assignment.priority}</p>
            <p>Status: <strong>${assignment.status}</strong></p>

            ${
                assignment.status === "Pending"
                ? `<button type="button" onclick="toggleAssignmentStatus(${assignment.id})">
                    Mark as Completed
                   </button>`
                : `<button type="button" onclick="toggleAssignmentStatus(${assignment.id})">
                    Undo Completion
                   </button>`
            }
        `;

        assignmentList.appendChild(card);

    });
}

// Add new assignment
assignmentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const newAssignment = {
        id: Date.now(),
        title: document.getElementById("assignmentTitle").value.trim(),
        subject: document.getElementById("assignmentSubject").value,
        dueDate: document.getElementById("assignmentDate").value,
        priority: document.getElementById("assignmentPriority").value,
        status: "Pending"
    };

    assignments.push(newAssignment);

    saveAssignments();

    assignmentForm.reset();

    updateSummary();
    filterAssignments();

    document.getElementById("assignmentMessage").textContent =
        "Assignment added successfully!";

});

// Toggle assignment status
function toggleAssignmentStatus(id) {

    const selectedAssignment = assignments.find(
        assignment => assignment.id === id
    );

    if (!selectedAssignment) {
        return;
    }

    if (selectedAssignment.status === "Pending") {
        selectedAssignment.status = "Completed";
    } else {
        selectedAssignment.status = "Pending";
    }

    saveAssignments();

    updateSummary();
    filterAssignments();
}

// Search and filter assignments
function filterAssignments() {

    const searchValue = assignmentSearch.value.toLowerCase();
    const filterValue = assignmentFilter.value;

    const filteredAssignments = assignments.filter(assignment => {

        const matchesSearch =
            assignment.title.toLowerCase().includes(searchValue) ||
            assignment.subject.toLowerCase().includes(searchValue);

        const matchesStatus =
            filterValue === "All" ||
            assignment.status === filterValue;

        return matchesSearch && matchesStatus;

    });

    displayAssignments(filteredAssignments);
}

// Listen for user input
assignmentSearch.addEventListener("input", filterAssignments);
assignmentFilter.addEventListener("change", filterAssignments);

// Initial display
updateSummary();
displayAssignments(assignments);

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