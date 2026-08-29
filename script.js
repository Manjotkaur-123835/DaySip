// ===============================
// ☕ DaySip
// ===============================


// Get saved information

let budget = Number(localStorage.getItem("budget")) || 0;

let rent = Number(localStorage.getItem("rent")) || 0;

let mobile = Number(localStorage.getItem("mobile")) || 0;

let electricity = Number(localStorage.getItem("electricity")) || 0;


// Get saved daily expenses

let allDays =
    JSON.parse(localStorage.getItem("allDays")) || {};


// The day currently being viewed

let selectedDay = 1;


// ===============================
// GET HTML ELEMENTS
// ===============================

const budgetInput =
    document.getElementById("budgetInput");

const budgetMessage =
    document.getElementById("budgetMessage");

const rentInput =
    document.getElementById("rentInput");

const mobileInput =
    document.getElementById("mobileInput");

const electricityInput =
    document.getElementById("electricityInput");

const selectedDate =
    document.getElementById("selectedDate");

const dailyInputs =
    document.querySelectorAll(".daily-input");


// ===============================
// LOAD SAVED INFORMATION
// ===============================

function loadSavedInformation() {

    budgetInput.value = budget;

    rentInput.value = rent;

    mobileInput.value = mobile;

    electricityInput.value = electricity;

    loadDay(selectedDay);

    updateSummary();

}


// ===============================
// SAVE BUDGET
// ===============================

document
    .getElementById("saveBudget")
    .addEventListener("click", function () {

        budget =
            Number(budgetInput.value) || 0;

        localStorage.setItem(
            "budget",
            budget
        );

        budgetMessage.textContent =
            "Budget saved successfully! ☕";

        updateSummary();

    });


// ===============================
// SAVE FIXED EXPENSES
// ===============================

document
    .getElementById("saveFixed")
    .addEventListener("click", function () {

        rent =
            Number(rentInput.value) || 0;

        mobile =
            Number(mobileInput.value) || 0;


        localStorage.setItem(
            "rent",
            rent
        );

        localStorage.setItem(
            "mobile",
            mobile
        );


        updateSummary();

        alert(
            "Fixed expenses saved! 🏠"
        );

    });


// ===============================
// SAVE MONTHLY BILLS
// ===============================

document
    .getElementById("saveBills")
    .addEventListener("click", function () {

        electricity =
            Number(electricityInput.value) || 0;


        localStorage.setItem(
            "electricity",
            electricity
        );


        updateSummary();

        alert(
            "Monthly bill saved! ⚡"
        );

    });


// ===============================
// CALENDAR
// ===============================

const calendarDays =
    document.querySelectorAll(".calendar-day");


calendarDays.forEach(
    function (dayButton) {

        dayButton.addEventListener(
            "click",
            function () {

                selectedDay =
                    Number(
                        dayButton.dataset.day
                    );

                loadDay(selectedDay);

            }
        );

    }
);


// ===============================
// LOAD A DAY
// ===============================

function loadDay(day) {

    selectedDate.textContent =
        "📅 September " + day;


    const savedDay =
        allDays[day] || {};


    dailyInputs.forEach(
        function (input) {

            const category =
                input.dataset.category;


            input.value =
                savedDay[category] || 0;

        }
    );


    calculateTodayTotal();

}


// ===============================
// SAVE TODAY'S EXPENSES
// ===============================

document
    .getElementById("saveDay")
    .addEventListener("click", function () {

        let dayExpenses = {};


        dailyInputs.forEach(
            function (input) {

                const category =
                    input.dataset.category;


                const amount =
                    Number(input.value) || 0;


                dayExpenses[category] =
                    amount;

            }
        );


        allDays[selectedDay] =
            dayExpenses;


        localStorage.setItem(
            "allDays",
            JSON.stringify(allDays)
        );


        calculateTodayTotal();

        updateSummary();

        updateCalendar();


        alert(
            "September " +
            selectedDay +
            " saved! ☕"
        );

    });


// ===============================
// TODAY'S TOTAL
// ===============================

function calculateTodayTotal() {

    let total = 0;


    dailyInputs.forEach(
        function (input) {

            total +=
                Number(input.value) || 0;

        }
    );


    document.getElementById(
        "todayTotal"
    ).textContent =
        "₹" +
        total.toLocaleString("en-IN");

}


// ===============================
// GET ALL DAILY EXPENSES
// ===============================

function getDailyTotal() {

    let total = 0;


    Object.values(allDays).forEach(
        function (day) {

            Object.values(day).forEach(
                function (amount) {

                    total +=
                        Number(amount) || 0;

                }
            );

        }
    );


    return total;

}


// ===============================
// MONTHLY SUMMARY
// ===============================

function updateSummary() {

    const fixedTotal =
        rent + mobile;


    const billsTotal =
        electricity;


    const dailyTotal =
        getDailyTotal();


    const monthlyTotal =
        fixedTotal +
        billsTotal +
        dailyTotal;


    const remaining =
        budget -
        monthlyTotal;


    document.getElementById(
        "fixedTotal"
    ).textContent =
        "₹" +
        fixedTotal.toLocaleString("en-IN");


    document.getElementById(
        "billsTotal"
    ).textContent =
        "₹" +
        billsTotal.toLocaleString("en-IN");


    document.getElementById(
        "dailyTotal"
    ).textContent =
        "₹" +
        dailyTotal.toLocaleString("en-IN");


    document.getElementById(
        "monthlyTotal"
    ).textContent =
        "₹" +
        monthlyTotal.toLocaleString("en-IN");


    document.getElementById(
        "remaining"
    ).textContent =
        "₹" +
        Math.max(
            remaining,
            0
        ).toLocaleString("en-IN");


    document.getElementById(
        "savings"
    ).textContent =
        remaining > 0
            ? "₹" +
              remaining.toLocaleString("en-IN")
            : "₹0";

}


// ===============================
// CALENDAR AMOUNTS
// ===============================

function updateCalendar() {

    calendarDays.forEach(
        function (button) {

            const day =
                button.dataset.day;


            const expenses =
                allDays[day];


            let total = 0;


            if (expenses) {

                Object.values(expenses)
                    .forEach(
                        function (amount) {

                            total +=
                                Number(amount) || 0;

                        }
                    );

            }


            // Show the day's total

            if (total > 0) {

                button.innerHTML =
                    day +
                    "<br><small>₹" +
                    total.toLocaleString("en-IN") +
                    "</small>";

            }

            else {

                button.innerHTML =
                    day +
                    "<br><small>₹0</small>";

            }

        }
    );

}


// ===============================
// UPDATE TODAY'S TOTAL
// WHEN INPUT CHANGES
// ===============================

dailyInputs.forEach(
    function (input) {

        input.addEventListener(
            "input",
            function () {

                calculateTodayTotal();

            }
        );

    }
);


// ===============================
// START
// ===============================

loadSavedInformation();

updateCalendar();
