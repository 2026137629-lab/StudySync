
// STUDYSYNC - MY SUBJECTS

// Default subject data
const defaultSubjects = [
    { code: "IMS564", name: "User Experience Design", credit: 3, semester: 4 },
    { code: "ICM572", name: "Gamification", credit: 3, semester: 4 },
    { code: "IMS511", name: "Programming", credit: 3, semester: 4 },
    { code: "IMS555", name: "Decision Theory", credit: 3, semester: 3 },
    { code: "IMR533", name: "Law and Ethics", credit: 3, semester: 3 },
    { code: "IMC501", name: "Information Management", credit: 3, semester: 3 }
];

// Load saved subjects or default data
let subjects = JSON.parse(
    sessionStorage.getItem("studysyncSubjects")
) || defaultSubjects;

// Save subjects
function saveSubjects() {
    sessionStorage.setItem(
        "studysyncSubjects",
        JSON.stringify(subjects)
    );
}

// Get HTML elements
const subjectList = document.getElementById("subjectList");
const subjectSearch = document.getElementById("subjectSearch");
const semesterFilter = document.getElementById("semesterFilter");
const subjectForm = document.getElementById("subjectForm");

const subjectCode = document.getElementById("subjectCode");
const subjectName = document.getElementById("subjectName");
const subjectCredit = document.getElementById("subjectCredit");
const subjectSemester = document.getElementById("subjectSemester");

const editSubjectCode = document.getElementById("editSubjectCode");
const formTitle = document.getElementById("formTitle");
const subjectSubmitButton = document.getElementById("subjectSubmitButton");
const cancelEditButton = document.getElementById("cancelEditButton");
const subjectMessage = document.getElementById("subjectMessage");

// Update total subject count
function updateSubjectCount() {
    document.getElementById("totalSubjects").textContent = subjects.length;
}

// Display subjects in table
function displaySubjects(data) {

    subjectList.innerHTML = "";

    if (data.length === 0) {
        subjectList.innerHTML = `
            <tr>
                <td colspan="6" class="text-center">
                    No subjects found.
                </td>
            </tr>
        `;
        return;
    }

    data.forEach((subject, index) => {

        const row = document.createElement("tr");

        row.innerHTML=`
            <td>${index+1}</td>
            <td><strong>${subject.code}</strong></td>
            <td>${subject.name}</td>
             <td>${subject.credit}</td>
            <td>Semester ${subject.semester}</td>
            <td>
            <button type="button" class="btn btn-sm btn-outline-primary"
                onclick="editSubject('${subject.code}')">
                Edit
                </button>

                <button type="button" class="btn btn-sm btn-outline-danger"
                onclick="deleteSubject('${subject.code}')">
                Delete
            </button>
            </td>
        `;

        subjectList.appendChild(row);
    });
}

// Search and filter subjects
function filterSubjects() {

    const searchValue = subjectSearch.value.toLowerCase();
    const semesterValue = semesterFilter.value;

    const filteredSubjects = subjects.filter(subject => {

        const matchesSearch =
            subject.code.toLowerCase().includes(searchValue) ||
            subject.name.toLowerCase().includes(searchValue);

        const matchesSemester =
            semesterValue === "all" ||
            subject.semester.toString() === semesterValue;

        return matchesSearch && matchesSemester;
    });

    displaySubjects(filteredSubjects);
}

// Add or update subject
subjectForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const code = subjectCode.value.trim().toUpperCase();

    const newSubject = {
        code: code,
        name: subjectName.value.trim(),
        credit: Number(subjectCredit.value),
        semester: Number(subjectSemester.value)
    };

    if (editSubjectCode.value) {

        const index = subjects.findIndex(
            subject => subject.code === editSubjectCode.value
        );

        if (index !== -1) {
            // Check for duplicate course code
            const duplicate = subjects.some(
                subject => subject.code === code &&
                subject.code !== editSubjectCode.value
            );

            if (duplicate) {
                subjectMessage.textContent = "Course code already exists!";
                return;
            }

            subjects[index] = newSubject;
            subjectMessage.textContent = "Subject updated successfully!";
        }

    } else {

        // Prevent duplicate course codes
        const duplicate = subjects.some(
            subject => subject.code === code
        );

        if (duplicate) {
            subjectMessage.textContent = "Course code already exists!";
            return;
        }

        subjects.push(newSubject);
        subjectMessage.textContent = "Subject added successfully!";
    }

    saveSubjects();
    updateSubjectCount();
    filterSubjects();
    resetSubjectForm();
});

// Edit subject
function editSubject(code) {

    const subject = subjects.find(
        item => item.code === code
    );

    if (!subject) return;

    subjectCode.value = subject.code;
    subjectName.value = subject.name;
    subjectCredit.value = subject.credit;
    subjectSemester.value = subject.semester;

    editSubjectCode.value = subject.code;

    formTitle.textContent = "Edit Subject";
    subjectSubmitButton.textContent = "Update Subject";
    cancelEditButton.style.display = "inline-block";

    subjectMessage.textContent = "";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// DELETE SUBJECT
function deleteSubject(code) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this subject?"
    );

    if (!confirmDelete) return;

    subjects = subjects.filter(subject => subject.code !== code);

    saveSubjects();
    updateSubjectCount();
    filterSubjects();

    // Reset form if the deleted subject is being edited
    if (editSubjectCode.value === code) {
        resetSubjectForm();
    }

    subjectMessage.textContent = "Subject deleted successfully!";
    subjectMessage.style.color = "green";
}

// Reset form
function resetSubjectForm() {

    subjectForm.reset();
    editSubjectCode.value = "";

    formTitle.textContent = "Add New Subject";
    subjectSubmitButton.textContent = "Add Subject";
    cancelEditButton.style.display = "none";
}

// Cancel edit
cancelEditButton.addEventListener("click", function() {
    resetSubjectForm();
    subjectMessage.textContent = "";
});

// Listen for search and filter
subjectSearch.addEventListener("input", filterSubjects);
semesterFilter.addEventListener("change", filterSubjects);

// Initial display
updateSubjectCount();
displaySubjects(subjects);

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