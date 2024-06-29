let currentPage = 1;

document.getElementById("nextPage").addEventListener("click", function() {
    currentPage++;
    updatePage();
});

document.getElementById("prevPage").addEventListener("click", function() {
    currentPage--;
    updatePage();
});

function updatePage() {
    const totalPages = document.getElementById("totalPages");
    const currentPageSpan = document.getElementById("currentPage");
    const container = document.getElementById("container");
    
    currentPage = Math.max(1, Math.min(currentPage, 10)); // قم بتعديل الحدود كما تريد
    
    currentPageSpan.innerText = currentPage;
    totalPages.innerText = currentPage;

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    for (let i = 1; i <= currentPage; i++) {
        const page = document.createElement("div");
        page.className = "page";
        page.textContent = "Page " + i;
        container.appendChild(page);
    }
}

document.getElementById("addPage").addEventListener("click", function() {
    currentPage++;
    updatePage();
});

const menuButton = document.getElementById("addPage");
const pageList = document.getElementById("pageList");

menuButton.addEventListener("click", function() {
    pageList.style.display = pageList.style.display === "block" ? "none" : "block";
});

document.addEventListener("click", function(e) {
    if (e.target.id !== "pageList" && !pageList.contains(e.target)) {
        pageList.style.display = "none";
    }
});

document.getElementById("container").addEventListener("click", function(e) {
    if (e.target.classList.contains("page")) {
        currentPage = parseInt(e.target.textContent.split(" ")[1]);
        updatePage();
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.querySelector(".menu-toggle");
    const sidebar = document.querySelector(".sidebar");

    menuToggle.addEventListener("click", function() {
        sidebar.classList.toggle("open");
    });
});