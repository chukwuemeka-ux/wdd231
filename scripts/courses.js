// WDD231 Course Home Page
// Update each completed property to reflect your actual progress.

const courses = [
    {
        subject: "CSE",
        number: 110,
        title: "Introduction to Programming",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        completed: true
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        completed: true
    },
    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        completed: false
    },
    {
        subject: "WDD",
        number: 231,
        title: "Web Frontend Development I",
        credits: 2,
        completed: false
    }
];

const courseList = document.querySelector("#course-list");
const creditsDisplay = document.querySelector("#credits");
const courseCount = document.querySelector("#course-count");
const filterButtons = document.querySelectorAll("[data-filter]");

function displayCourses(courseArray) {
    if (!courseList || !creditsDisplay || !courseCount) {
        console.error("Course page elements are missing. Check index.html IDs.");
        return;
    }

    courseList.replaceChildren();

    courseArray.forEach((course) => {
        const card = document.createElement("article");
        card.classList.add("course-card");

        if (course.completed) {
            card.classList.add("completed");
        }

        const title = document.createElement("h3");
        title.textContent = `${course.subject} ${course.number} `;

        const courseName = document.createElement("p");
        courseName.textContent = course.title;

        const creditInfo = document.createElement("p");
        creditInfo.textContent =
            `${course.credits} ${course.credits === 1 ? "credit" : "credits"} `;

        const status = document.createElement("span");
        status.classList.add("course-status");
        status.textContent = course.completed ? "Completed" : "Not Completed";

        card.append(title, courseName, creditInfo, status);
        courseList.appendChild(card);
    });

    const totalCredits = courseArray.reduce(
        (total, course) => total + course.credits,
        0
    );

    creditsDisplay.textContent = `Total Credits: ${totalCredits} `;

    courseCount.textContent =
        `Showing ${courseArray.length} of ${courses.length} courses`;
}

function filterCourses(filter) {
    let filteredCourses;

    if (filter === "WDD" || filter === "CSE") {
        filteredCourses = courses.filter(
            (course) => course.subject === filter
        );
    } else {
        filteredCourses = courses;
    }

    displayCourses(filteredCourses);

    filterButtons.forEach((button) => {
        const isActive =
            button.dataset.filter.toLowerCase() === filter.toLowerCase();

        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });
}

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        filterCourses(button.dataset.filter);
    });
});

// Display all courses when the page first loads.
filterCourses("all");