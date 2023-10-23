const addTable = document.querySelector(".add-td"),
  clearTable = document.querySelector(".clear");

clearTable.addEventListener("click", () => {
  const infoTable = document.querySelectorAll(".input-table");
  infoTable.forEach((value) => {
    value.remove();
  });
});

addTable.addEventListener("click", () => {
  const tableBody = document.querySelector(".table_container table tbody");
  const newTableLine = document.createElement("tr");
  newTableLine.classList.add("input-table");
  newTableLine.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.classList.contains("delete")) {
      target.parentElement.remove();
      setCode();
    }
  });

  newTableLine.innerHTML = `<td class="full-name"><input required form="my_form" type="text" name="fullName" /></td>
  <td class="code"><input type="#" name="code" form="my_form"/></td>
  <td class="position-select">
    <select name="position" form="my_form">
      <option value="1">Студент</option>
      <option value="2">Аспірант</option>
      <option value="3">Асистент</option>
      <option value="4">Старший викладач</option>
      <option value="5">Доцент</option>
      <option value="6">Професор</option>
      <option value="7">Завідувач</option>
      <option value="8">Декан</option>
      <option value="9">Проректор</option>
      <option value="10">Ректор</option>
    </select>
  </td>
  <td class="rank-and-degree-select">
    <select name="rankAndDegree" form="my_form">
      <option value="1">(без звання, без ступеня)</option>
      <option value="2">(без звання, кандидат наук)</option>
      <option value="3">(доцент, без ступеня)</option>
      <option value="4">(доцент, кандидат наук)</option>
      <option value="5">(професор, кандидат наук)</option>
      <option value="6">(професор, доктор наук)</option>
      <option value="7">(академік, доктор наук)</option>
    </select>
  </td>
  <td class="age"><input required type="number" name="age" min="0" form="my_form"/></td>
  <td class="length-of-service"><input required type="number" min="0" form="my_form" name="lengthOfService" /></td>
  <td class="pedagogical-activity"><input required type="number" min="0" form="my_form" name="pedagogicalActivity"/></td>
  <td class="delete">×</td>`;

  tableBody.append(newTableLine);
  setCode();
});

function setCode() {
  const code = document.querySelectorAll(".input-table .code");
  code.forEach((value, key) => {
    value.innerHTML = `<input type="text" name="code" readonly value="C${key + 1}" form="my_form"/>`;
  });
}

const positionTier = {
  10: "Ректор",
  9: "Проректор",
  8: "Декан",
  7: "Завідувач",
  6: "Професор",
  5: "Доцент",
  4: "Старший викладач",
  3: "Асистент",
  2: "Аспірант",
  1: "Студент",
};

const rankAndDegreeTier = {
  7: "(академік, доктор наук)",
  6: "(професор, доктор наук)",
  5: "(професор, кандидат наук)",
  4: "(доцент, кандидат наук)",
  3: "(доцент, без ступеня)",
  2: "(без звання, кандидат наук)",
  1: "(без звання, без ступеня)",
};

const forms = document.querySelectorAll("form");

forms.forEach((item) => {
  getData(item);
});

function getData(form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const object = {};
    const data = [];

    formData.forEach((value, key) => {
      object[key] = value;
      if (key === "pedagogicalActivity") {
        data.push({ ...object });
      }
    });

    createSortedTable(sort(data));
  });
}

function sort(json) {
  for (let i = 0, endI = json.length - 1; i < endI; i++) {
    let wasSwap = false;
    for (let j = 0, endJ = endI - i; j < endJ; j++) {
      if (+json[j].position < +json[j + 1].position) {
        [json[j], json[j + 1]] = [json[j + 1], json[j]];
        wasSwap = true;
        continue;
      } else if (+json[j].position > +json[j + 1].position) {
        continue;
      }

      if (+json[j].rankAndDegree < +json[j + 1].rankAndDegree) {
        [json[j], json[j + 1]] = [json[j + 1], json[j]];
        wasSwap = true;
        continue;
      } else if (+json[j].rankAndDegree > +json[j + 1].rankAndDegree) {
        continue;
      }

      if (+json[j].age < +json[j + 1].age) {
        [json[j], json[j + 1]] = [json[j + 1], json[j]];
        wasSwap = true;
        continue;
      } else if (+json[j].age > +json[j + 1].age) {
        continue;
      }

      if (+json[j].lengthOfService < +json[j + 1].lengthOfService) {
        [json[j], json[j + 1]] = [json[j + 1], json[j]];
        wasSwap = true;
        continue;
      } else if (+json[j].lengthOfService > +json[j + 1].lengthOfService) {
        continue;
      }

      if (+json[j].pedagogicalActivity < +json[j + 1].pedagogicalActivity) {
        [json[j], json[j + 1]] = [json[j + 1], json[j]];
        wasSwap = true;
        continue;
      } else if (+json[j].pedagogicalActivity > +json[j + 1].pedagogicalActivity) {
        continue;
      }
    }

    if (!wasSwap) break;
  }
  return json;
}

function createSortedTable(data) {
  const body = document.querySelector("body");

  if (body.getElementsByClassName("sorted_table").length == 0) {
    const firstTable = document.querySelector(".table_container");
    const sortedTableColumns = document.createElement("table");
    sortedTableColumns.classList.add("sorted_table");
    sortedTableColumns.innerHTML = `
        <tbody>
          <tr>
            <th colspan="2">Учасник</th>
            <th colspan="5">Характеристики</th>
          </tr>
          <tr>
            <td width="200">ПІБ</td>
            <td width="50">Код</td>
            <td width="250">Посада</td>
            <td width="380">Звання і ступінь</td>
            <td width="50">Вік</td>
            <td width="50">Стаж займаної посади</td>
            <td width="50">Стаж науковопедагогічної діяльності</td>
          </tr>
        </tbody>
    `;
    body.insertBefore(sortedTableColumns, firstTable.nextSibling);
    fillSortedTable(data);
  } else {
    const sortetTableInfo = document.querySelectorAll(".sorted_line");
    sortetTableInfo.forEach((value) => {
      value.remove();
    });
    fillSortedTable(data);
  }
}

function fillSortedTable(data) {
  const sortedTableBody = document.querySelector(".sorted_table tbody");

  console.log(data);
  data.forEach((value) => {
    const sortedTableLine = document.createElement("tr");
    sortedTableLine.classList.add("sorted_line");
    sortedTableLine.innerHTML = `
    <td class="full-name">${value.fullName}</td>
    <td class="code">${value.code + ""}</td>
    <td class="position">${positionTier[value.position]}</td>
    <td class="rank-and-degree">${rankAndDegreeTier[value.rankAndDegree]}</td>
    <td class="age">${value.age}</td>
    <td class="length-of-service">${value.lengthOfService}</td>
    <td class="pedagogical-activity">${value.pedagogicalActivity}</td>`;
    sortedTableBody.append(sortedTableLine);
  });
}
