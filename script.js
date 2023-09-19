function timer() {
  let time = 60;
  const timer = document.querySelector("#timer");
  timer.innerHTML = time;
  setInterval(() => {
    time--;
    if (time === -1) time = 60;
    timer.innerHTML = time;
  }, 1000);
}

async function getData() {
  try {
    const response = await fetch("https://crypto-data.onrender.com/fetchData");
    const data = await response.json();

    const tbody = document.querySelector("#cripto_table");

    data.forEach((item, index) => {
      const row = document.createElement("tr");
      row.classList.add("table-row");
      const last = +item.last;
      const buy = +item.buy;
      const sell = +item.sell;
      const volume = +item.volume;

      const difference = (((sell - buy) / sell) * 100).toFixed(2);
      const savings = ((sell - buy) * volume).toFixed(0);

      row.innerHTML = `
      <td class="table-data">${index + 1}</td>
      <td class="table-data">${item.name}</td>
      <td class="table-data">₹ ${last.toFixed(0)}</td>
      <td class="table-data">₹ ${buy.toFixed(0)} / ₹ ${sell.toFixed(0)}</td>
      <td class="table-data ${
        difference < 0 ? "loss" : "profit"
      }">${difference} %</td>
      <td class="table-data ${difference < 0 ? "loss" : "profit"}">${
        difference < 0 ? "▼" : "▲"
      } ₹ ${savings}</td>
    `;

      tbody.appendChild(row);
    });
  } catch (error) {
    console.log(error);
  }
}

timer();
getData();
