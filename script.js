async function getData() {
  const response = await fetch("http://localhost:4000/fetchData");
  const data = await response.json();

  const tbody = document.querySelector("#cripto_table");

  data.forEach((item, index) => {
    const row = document.createElement("tr");
    row.classList.add("table-row");

    const difference = (((item.sell - item.buy) / item.sell) * 100).toFixed(2);
    const savings = ((item.sell - item.buy) * item.volume).toFixed(0);

    row.innerHTML = `
    <td class="table-data">${index + 1}</td>
    <td class="table-data">${item.name}</td>
    <td class="table-data">₹ ${item.last.toFixed(0)}</td>
    <td class="table-data">₹ ${item.buy.toFixed(0)} / ₹ ${item.sell.toFixed(
      0
    )}</td>
    <td class="table-data ${
      difference < 0 ? "loss" : "profit"
    }">${difference} %</td>
    <td class="table-data ${difference < 0 ? "loss" : "profit"}">${
      difference < 0 ? "▼" : "▲"
    } ₹ ${savings}</td>
  `;

    tbody.appendChild(row);
  });
  buyer(data);
}
function buyer(data){
  console.log(data);
  
}

getData();
