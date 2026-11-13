
// STUDYSYNC - PROGRESS REPORT

// Get assignment data from session storage
const savedAssignments = sessionStorage.getItem("studysyncAssignments");

// Use saved data or default sample data
const assignments = savedAssignments
    ? JSON.parse(savedAssignments)
    : [
        { status: "Pending" },
        { status: "Pending" },
        { status: "Completed" },
        { status: "Completed" }
    ];

// Calculate assignment statistics
const totalAssignments = assignments.length;

const completedAssignments = assignments.filter(
    assignment => assignment.status === "Completed"
).length;

const pendingAssignments = assignments.filter(
    assignment => assignment.status === "Pending"
).length;

// Calculate completion percentage
const completionRate = totalAssignments > 0
    ? Math.round((completedAssignments / totalAssignments) * 100)
    : 0;


// Update summary cards
document.getElementById("reportTotal").textContent = totalAssignments;
document.getElementById("reportCompleted").textContent = completedAssignments;
document.getElementById("reportPending").textContent = pendingAssignments;
document.getElementById("completionRate").textContent = completionRate + "%";


// Update Progress Jar
const jarFill = document.getElementById("jarFill");
const jarPercentage = document.getElementById("jarPercentage");
const jarCount = document.getElementById("jarCount");
const jarMessage = document.getElementById("jarMessage");

if (jarFill) {
    jarFill.style.height = completionRate + "%";
}

if (jarPercentage) {
    jarPercentage.textContent = completionRate + "%";
}

if (jarCount) {
    jarCount.textContent =
        `${completedAssignments} out of ${totalAssignments} assignments`;
}

if (jarMessage) {

    if (totalAssignments === 0) {
        jarMessage.textContent = "Add your assignments to get started!";
    } else if (completionRate === 100) {
        jarMessage.textContent = "Amazing! All your assignments are completed!";
    } else if (completionRate >= 75) {
        jarMessage.textContent = "Almost there! You're doing amazing!";
    } else if (completionRate >= 50) {
        jarMessage.textContent = "You're halfway there. Keep going!";
    } else if (completionRate > 0) {
        jarMessage.textContent = "Great start! Keep filling your jar!";
    } else {
        jarMessage.textContent = "Your journey starts here. Let's get going!";
    }
}


// Update Academic Performance
document.getElementById("jarCompleted").textContent = completedAssignments;
document.getElementById("jarPending").textContent = pendingAssignments;


// Update Milestone
const milestoneTitle = document.querySelector("#jarMilestone strong");
const milestoneText = document.querySelector("#jarMilestone p");

if (milestoneTitle && milestoneText) {

    if (totalAssignments === 0) {
        milestoneTitle.textContent = "Ready to Begin!";
        milestoneText.textContent =
            "Add your first assignment and start building your academic progress.";
    } else if (completionRate === 100) {
        milestoneTitle.textContent = "All Tasks Completed!";
        milestoneText.textContent =
            "Congratulations! Your progress jar is completely full.";
    } else if (completionRate >= 75) {
        milestoneTitle.textContent = "Almost There!";
        milestoneText.textContent =
            "You're so close to completing all your assignments. Keep going!";
    } else if (completionRate >= 50) {
        milestoneTitle.textContent = "Halfway There!";
        milestoneText.textContent =
            "You've completed half or more of your assignments. Keep it up!";
    } else if (completionRate > 0) {
        milestoneTitle.textContent = "Great Start!";
        milestoneText.textContent =
            "You've completed your first assignments. Stay consistent!";
    } else {
        milestoneTitle.textContent = "Let's Get Started!";
        milestoneText.textContent =
            "Complete your first assignment to start filling your progress jar.";
    }
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


// Display saved profile when dashboard loads
displayProfile();