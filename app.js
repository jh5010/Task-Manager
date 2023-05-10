// Task 관련

// Task 제출을 처리하는 함수
function handleTaskSubmit(event) {
  event.preventDefault();

  const task = document.getElementById("task").value;
  const date = document.getElementById("date").value;

  const taskList = JSON.parse(localStorage.getItem("taskList")) || [];

  taskList.push({
    date,
    task,
  });

  localStorage.setItem("taskList", JSON.stringify(taskList));

  event.target.reset();
}

// 각 리스트 아이템마다 삭제 버튼을 추가하는 함수
function addDeleteButtonToListItems() {
  var listItems = document.querySelectorAll('#task-list li');
  for (var i = 0; i < listItems.length; i++) {
    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.onclick = function() {
      this.parentElement.remove();
      updateTaskList();
    }
    listItems[i].appendChild(deleteButton);
  }
}

// 페이지 로드 시 각 리스트 아이템에 삭제 버튼을 추가
window.onload = function() {
  addDeleteButtonToListItems();
}

// 작업 목록을 업데이트하는 함수
function updateTaskList() {
var listItems = document.querySelectorAll('#task-list li');
var taskList = [];

for (var i = 0; i < listItems.length; i++) {
  var date = listItems[i].querySelector('label').textContent.split(' ')[0];
  var task = listItems[i].querySelector('label').textContent.split(' ').slice(1).join(' ');

  taskList.push({
    date: date,
    task: task
  });
}

localStorage.setItem("taskList", JSON.stringify(taskList));
}

// 작업 목록을 렌더링하는 함수
function renderTaskList() {
  const taskList = JSON.parse(localStorage.getItem("taskList")) || [];

  const taskListElement = document.getElementById("task-list");

  taskListElement.innerHTML = "";

  taskList.sort((a, b) => new Date(a.date) - new Date(b.date)); // 날짜별로 정렬

  taskList.forEach((task, index) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `task-${index}`;
    checkbox.checked = false;
    const label = document.createElement("label");
    label.htmlFor = `task-${index}`;
    label.textContent = `${task.date} ${task.task}`;

    li.appendChild(checkbox);
    li.appendChild(label);

    taskListElement.appendChild(li);
  });
}

// Diary 관련

// Diary 제출을 처리하는 함수
function handleDiarySubmit(event) {
  event.preventDefault();

  const mood = document.getElementById("mood").value;
  const diary = document.getElementById("diary").value;
  const date = document.getElementById("diary-date").value;

  const diaryList = JSON.parse(localStorage.getItem("diaryList")) || [];

  diaryList.push({
    date,
    mood,
    diary,
  });

  localStorage.setItem("diaryList", JSON.stringify(diaryList));

  event.target.reset();
}

// Diary 선택 여부
const selectedDiaries = {};

// Diary 목록을 렌더링하는 함수
function renderDiaryList() {
  const diaryList = JSON.parse(localStorage.getItem("diaryList")) || [];

  const diaryListElement = document.getElementById("diary-list");

  diaryListElement.innerHTML = "";

  diaryList.sort((a, b) => new Date(b.date) - new Date(a.date)); // 날짜별로 정렬

  diaryList.forEach((diary, index) => {
    const div = document.createElement("div");
    const mood = document.createElement("p");
    const diaryContent = document.createElement("p");
    const date = document.createElement("p");

    date.textContent = `Date: ${diary.date}`;
    mood.textContent = `Mood: ${getMoodEmoji(diary.mood)}`;
    diaryContent.textContent = diary.diary;

    // Diary를 선택하기 위한 체크박스
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `diary-${index}`;
    checkbox.addEventListener("change", () => {
      selectedDiaries[index] = checkbox.checked;
    });

    div.appendChild(checkbox);
    div.appendChild(date);
    div.appendChild(mood);
    div.appendChild(diaryContent);

    diaryListElement.appendChild(div);
  });
}

function deleteSelectedDiaries() {
  const diaryList = JSON.parse(localStorage.getItem("diaryList")) || [];

  // 선택된 Diary의 인덱스 배열 생성
  const selectedIndexes = Object.entries(selectedDiaries)
    .filter(([index, selected]) => selected)
    .map(([index, selected]) => Number(index));

  // 선택된 Diary를 역순으로 제거
  selectedIndexes.sort((a, b) => b - a);
  selectedIndexes.forEach((index) => {
    diaryList.splice(index, 1);
  });

  // 변경된 Diary 목록을 로컬 스토리지에 저장하고 다시 렌더링
  localStorage.setItem("diaryList", JSON.stringify(diaryList));
  renderDiaryList();

  // 선택 여부 초기화
  selectedDiaries = {};
}

// Emoji를 반환하는 함수
function getMoodEmoji(mood) {
  switch (mood) {
    case "happy":
      return "😊 Happy";
    case "sad":
      return "😢 Sad";
    case "angry":
      return "😠 Angry";
    case "confused":
      return "😕 Confused";
    case "excited":
      return "😆 Excited";
    default:
      return mood;
  }
}

function goBack() {
  window.history.back();
}

renderTaskList();
renderDiaryList();