// -------- PROJECT CRUD --------

let projectCards = document.getElementById("projectCards");
let projTitle = document.getElementById("projTitle");
let projImg = document.getElementById("projImg");
let projDesc = document.getElementById("projDesc");

let projects = JSON.parse(localStorage.getItem("projects")) || [];
renderProjects();

function addProject() {
  let title = projTitle.value.trim();
  let desc = projDesc.value.trim();
  let file = projImg.files[0];

  if (!title || !file || !desc) {
    alert("Please fill all fields!");
    return;
  }

  let reader = new FileReader();
  reader.onload = () => {
    projects.push({
      title: title,
      desc: desc,
      img: reader.result
    });

    localStorage.setItem("projects", JSON.stringify(projects));
    projTitle.value = "";
    projDesc.value = "";
    projImg.value = "";
    renderProjects();
  };

  reader.readAsDataURL(file);
}

function deleteProject(index) {
  projects.splice(index, 1);
  localStorage.setItem("projects", JSON.stringify(projects));
  renderProjects();
}

function renderProjects() {
  projectCards.innerHTML = "";
  projects.forEach((p, i) => {
    projectCards.innerHTML += `
      <div class="project-card">
        <div class="project-image-container">
          <img src="${p.img}" class="project-image">
        </div>
        <div class="project-content">
          <h3>${p.title}</h3>
          <p>${p.desc}</p>

          <button class="btn small view-btn" onclick="viewProject(${i})">View</button>
          <button class="btn small delete-btn" onclick="deleteProject(${i})">Delete</button>
        </div>
      </div>
    `;
  });
}




// -------- ACHIEVEMENT CRUD --------

let achievementCards = document.getElementById("achievementCards");
let achTitle = document.getElementById("achTitle");
let achImg = document.getElementById("achImg");

let achievements = JSON.parse(localStorage.getItem("achievements")) || [];
renderAchievements();

function addAchievement() {
  let title = achTitle.value.trim();
  let file = achImg.files[0];

  if (!title || !file) {
    alert("Please enter title and image!");
    return;
  }

  let reader = new FileReader();
  reader.onload = () => {
    achievements.push({
      title: title,
      img: reader.result
    });

    localStorage.setItem("achievements", JSON.stringify(achievements));
    achTitle.value = "";
    achImg.value = "";
    renderAchievements();
  };

  reader.readAsDataURL(file);
}

function deleteAchievement(index) {
  achievements.splice(index, 1);
  localStorage.setItem("achievements", JSON.stringify(achievements));
  renderAchievements();
}

function renderAchievements() {
  achievementCards.innerHTML = "";
  achievements.forEach((a, i) => {
    achievementCards.innerHTML += `
      <div class="project-card">
        <div class="project-image-container">
          <img src="${a.img}" class="project-image">
        </div>
        <div class="project-content">
          <h3>${a.title}</h3>

          <button class="btn small view-btn" onclick="viewAchievement(${i})">View</button>
          <button class="btn small delete-btn" onclick="deleteAchievement(${i})">Delete</button>
        </div>
      </div>
    `;
  });
}
function viewProject(i) {
  document.getElementById("modalImg").src = projects[i].img;
  document.getElementById("modalTitle").textContent = projects[i].title;
  document.getElementById("modalDesc").textContent = projects[i].desc;
  document.getElementById("viewModal").style.display = "flex";
}

function viewAchievement(i) {
  document.getElementById("modalImg").src = achievements[i].img;
  document.getElementById("modalTitle").textContent = achievements[i].title;
  document.getElementById("modalDesc").textContent = ""; // No description
  document.getElementById("viewModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("viewModal").style.display = "none";
}
