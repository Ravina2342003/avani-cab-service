// ============================================================
// AVANI CAB SERVICE NASHIK — scripts.js
// ============================================================
// MODE 1: LOCAL TESTING (no AWS needed)
//   → Keep API_ENDPOINT as "" — uses browser localStorage
//
// MODE 2: PRODUCTION (after AWS setup)
//   → Paste your API Gateway URL in API_ENDPOINT below
// ============================================================

var API_ENDPOINT = "https://jwgyvzgsgf.execute-api.ap-south-1.amazonaws.com/app1"; // ← Paste AWS URL here when ready. Leave "" for local testing.

// ─── LOCAL STORAGE HELPERS ───────────────────────────────────
function saveLocal(booking) {
    var all = getLocal();
    all.push(booking);
    localStorage.setItem("avani_bookings", JSON.stringify(all));
}
function getLocal() {
    return JSON.parse(localStorage.getItem("avani_bookings") || "[]");
}

// ─── DECIDE: use API or localStorage ─────────────────────────
var USE_LOCAL = (!API_ENDPOINT || API_ENDPOINT === "PASTE_YOUR_API_GATEWAY_URL_HERE");


// ============================================================
// SAVE BOOKING  (add_booking.html)
// ============================================================
var saveBtn = document.getElementById("savebooking");
if (saveBtn) {
    saveBtn.addEventListener("click", function () {

        var bookingid   = document.getElementById("bookingid").value.trim();
        var name        = document.getElementById("name").value.trim();
        var pickup      = document.getElementById("pickup").value.trim();
        var destination = document.getElementById("destination").value.trim();
        var traveldate  = document.getElementById("traveldate").value;
        var cabtype     = document.getElementById("cabtype").value;
        var price       = document.getElementById("price").value.trim();
        var phone       = document.getElementById("phone").value.trim();

        var successMsg = document.getElementById("successMsg");
        var errorMsg   = document.getElementById("errorMsg");
        successMsg.classList.remove("show");
        errorMsg.classList.remove("show");

        // Validation
        if (!bookingid || !name || !destination || !price) {
            errorMsg.textContent = "❌ Please fill in: Booking ID, Name, Destination and Price.";
            errorMsg.classList.add("show");
            return;
        }

        saveBtn.disabled    = true;
        saveBtn.textContent = "SAVING...";

        var inputData = {
            bookingid:   bookingid,
            name:        name,
            pickup:      pickup,
            destination: destination,
            traveldate:  traveldate,
            cabtype:     cabtype,
            price:       price,
            phone:       phone,
            createdAt:   new Date().toISOString(),
            status:      "Confirmed"
        };

        if (USE_LOCAL) {
            // ── LOCAL MODE ──
            saveLocal(inputData);
            successMsg.textContent = "✅ Booking saved! ID: " + bookingid + " (local mode — works without AWS)";
            successMsg.classList.add("show");
            saveBtn.disabled    = false;
            saveBtn.textContent = "CONFIRM BOOKING";
            clearForm();
        } else {
            // ── AWS MODE ──
            fetch(API_ENDPOINT, {
                method:  "POST",
                headers: { "Content-Type": "application/json" },
                body:    JSON.stringify(inputData)
            })
            .then(function(r) { return r.json(); })
            .then(function() {
                successMsg.textContent = "✅ Booking confirmed! Booking ID: " + bookingid;
                successMsg.classList.add("show");
                saveBtn.disabled    = false;
                saveBtn.textContent = "CONFIRM BOOKING";
                clearForm();
            })
            .catch(function(err) {
                console.error(err);
                errorMsg.textContent = "❌ API error. Check your API Gateway URL in scripts.js";
                errorMsg.classList.add("show");
                saveBtn.disabled    = false;
                saveBtn.textContent = "CONFIRM BOOKING";
            });
        }
    });
}

function clearForm() {
    ["bookingid","name","pickup","destination","traveldate","cabtype","price","phone"]
        .forEach(function(id) {
            var el = document.getElementById(id);
            if (el) el.value = "";
        });
}


// ============================================================
// FETCH ALL BOOKINGS  (fetch_all_bookings.html)
// ============================================================
function loadBookings() {
    var table    = document.getElementById("bookingTable");
    var loading  = document.getElementById("loadingState");
    var errorMsg = document.getElementById("errorMsg");
    var btn      = document.getElementById("getbookings");

    if (!table) return;

    loading.style.display = "block";
    errorMsg.classList.remove("show");
    if (btn) { btn.disabled = true; btn.textContent = "LOADING..."; }
    table.innerHTML = "";

    function renderRows(data) {
        loading.style.display = "none";
        if (btn) { btn.disabled = false; btn.textContent = "⟳ REFRESH"; }

        if (!data || data.length === 0) {
            table.innerHTML =
                "<tr><td colspan='9'>" +
                "<div class='empty-state'>" +
                "<div class='empty-icon'>🚗</div>" +
                "<p>No bookings yet. <a href='add_booking.html' style='color:var(--gold)'>Add one!</a></p>" +
                "</div></td></tr>";
            return;
        }

        data.forEach(function(b) {
            var row = table.insertRow();
            row.innerHTML =
                "<td><strong style='color:var(--gold)'>" + (b.bookingid || "—") + "</strong></td>" +
                "<td>" + (b.name        || "—") + "</td>" +
                "<td>" + (b.pickup      || "—") + "</td>" +
                "<td>" + (b.destination || "—") + "</td>" +
                "<td>" + (b.traveldate  || "—") + "</td>" +
                "<td>" + (b.cabtype     || "—") + "</td>" +
                "<td>" + (b.phone       || "—") + "</td>" +
                "<td><strong>₹" + (b.price || "—") + "</strong></td>" +
                "<td><span class='status-badge'>Confirmed</span></td>";
        });
    }

    if (USE_LOCAL) {
        // ── LOCAL MODE ──
        setTimeout(function() { renderRows(getLocal()); }, 300);
    } else {
        // ── AWS MODE ──
        fetch(API_ENDPOINT)
        .then(function(r) { return r.json(); })
        .then(renderRows)
        .catch(function(err) {
            console.error(err);
            loading.style.display = "none";
            if (btn) { btn.disabled = false; btn.textContent = "⟳ REFRESH"; }
            errorMsg.textContent = "❌ Could not load from AWS. Check your API URL in scripts.js";
            errorMsg.classList.add("show");
        });
    }
}

var loadBtn = document.getElementById("getbookings");
if (loadBtn) loadBtn.addEventListener("click", loadBookings);

// Auto-load when page opens
if (document.getElementById("bookingTable")) loadBookings();
