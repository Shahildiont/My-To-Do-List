import React, { useEffect } from 'react'

function New() {
  useEffect(() => {
    const inputbox = document.getElementById("todo-input");
    const submitbtn = document.getElementById("submitbtn");
    const resultList = document.getElementById("resultList");
    const filterSelect = document.querySelector(".filter");

    submitbtn.addEventListener("click", function (event) {
      event.preventDefault();

      const inputval = inputbox.value;
      if (!inputval.trim()) return;

      const li = document.createElement("li");
      li.innerHTML = `<input type="checkbox" class="tick"> ${inputval} `;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "x";
      deleteBtn.classList.add("delete-btn");

      deleteBtn.addEventListener("click", function () {
        li.remove();
      });

      li.appendChild(deleteBtn);
      resultList.appendChild(li);

      inputbox.value = "";
    });

    filterSelect.addEventListener("change", function () {
      const todos = document.querySelectorAll("#resultList li");

      todos.forEach(function (todo) {
        const checkbox = todo.querySelector(".tick");

        if (filterSelect.value === "All") {
          todo.style.display = "flex";
        } 
        else if (filterSelect.value === "Completed") {
          todo.style.display = checkbox.checked ? "flex" : "none";
        } 
        else if (filterSelect.value === "Incompleted") {
          todo.style.display = !checkbox.checked ? "flex" : "none";
        }
      });
    });
  }, []);

  return (
    <div>
      <header>
        <h1>To Do List</h1>
      </header>
      <center>
        <div id="todoforms">
          <input type="text" id="todo-input" placeholder="Enter What To Do" minLength="10" required />
          <button id="submitbtn">Submit</button>
        </div>

        <div className="select">
          <select name="todos" className="filter">
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Incompleted">Incompleted</option>
          </select>
        </div>
      </center>
      <div className="container">
        <ul id="resultList"></ul>
      </div>
    </div>
  )
}

export default New