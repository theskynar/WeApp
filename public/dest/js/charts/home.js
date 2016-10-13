
// Finances Charts details
var optFinance = {
    responsive: true
};

var dataFinance = {
    labels: [
        "Em conta",
        "A Receber",
        "A Pagar"
    ],
    datasets: [
        {
            data: [500.75, 200.05, 489.09],
            backgroundColor: [
                "#8bc34a",
                "#9ccc65",
                "#e53935"
            ],
            hoverBackgroundColor: [
                "#8bc34a",
                "#9ccc65",
                "#e53935"
            ]
        }
    ]
};

// Visits Charts details

var optEst = {
    responsive: true
};

var dataEst = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    datasets: [
        {
            label: "Visitas",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [500, 700, 356, 280, 743, 1500, 1200, 2000, 2050, 1987, 2389, 3000],
            spanGaps: false,
        },
        {
            label: "Receita",
            fill: false,
            lineTension: 0.18,
            backgroundColor: "#388e3c",
            borderColor: "#388e3c",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(0,0,0,0.4)",
            pointHoverBorderColor: "rgba(0,0,0,4)",
            pointHoverBorderWidth: 0,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [10000, 5000, 2000, 4000, 7500, 3869, 8004, 11000, 13000, 7000, 5000, 11000],
            spanGaps: false,
        },
        {
            label: "Visitas",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "#b71c1c",
            borderColor: "#b71c1c",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "#b71c1c",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#b71c1c",
            pointHoverBorderColor: "#b71c1c",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [15, 10, 6, 11, 4, 20, 6, 2, 25, 30, 20, 50],
            spanGaps: false,
        }
    ]
};

(function(){

    // Chart of Finances
    var financeObj = document.getElementById("financeChart").getContext("2d");
    var financeChart = new Chart(financeObj, {
        type: 'pie',
        data: dataFinance,
        options: optFinance
    });

    // Chart of Estatisticas
    var estObj = document.getElementById("estChart").getContext("2d");
    var estChart = new Chart(estObj, {
        type: 'line',
        data: dataEst,
        options: optEst
    });

})();