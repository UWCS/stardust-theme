// Borrowed from github.com/uwcs/warwickspeedrun

const formatPlural = function (n, term) {
    if (n == 0) return "";
    if (n == 1) return `${n} ${term}`;
    else return `${n} ${term}s`;
}

const listStr = function (parts) {
    if (parts.length == 0) return "";
    if (parts.length == 1) return parts[0];
    var result = parts[0];
    for (var i = 1; i < parts.length - 1; i++) {
        result += `, ${parts[i]}`;
    }
    result += ` and ${parts[parts.length - 1]}`;
    return result;
}

const listStrNonEmpty = function (parts, max_numb) {
    filtered = parts.filter(Boolean);
    if (filtered.length > max_numb) {
        filtered = filtered.slice(0, max_numb);
    }
    return listStr(filtered);
}

const setIntervals = function (cd_t, ut_t, q) {
    if (quick == q) return;
    clearInterval(x);
    x = setInterval(countdown, cd_t * 1000);
    quick = q;
}

var quick = null;
var x, cds, openElems = [], closedElems = [], alerts = [];
var prevOpen = null;

// Update the count down every minute
const countdown = function () {
    if (!cds) return

    // Find the distance between now and the count down date
    const now = new Date().getTime();
    targetDate = now <= startDate ? startDate : endDate;
    const distance = targetDate - now;
    if (distance < 0) {
        for (let cd of cds) {
            cd.innerHTML = "Shop now closed!";
        }
        if (quick != "ended" && quick != null) location.reload()
        setIntervals(60, 300, "ended");
    } else {
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        document.getElementById("countdown-alert").hidden = days >= 3
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / (1000));
        // Display the result in the countdown
        let daysText = formatPlural(days, "day");
        let hoursText = formatPlural(hours, "hour");
        let minutesText = formatPlural(minutes, "minute");
        let secondsText = formatPlural(seconds, "second");

        time_rem_str = listStrNonEmpty([daysText, hoursText, minutesText, secondsText], 2);
        if (days >= 7) time_rem_str = daysText;

        for (let cd of cds) {
            const prompt = now <= startDate ? "Opening" : "Closing"
            cd.innerHTML = `${prompt} in ${time_rem_str}`;
        }

        // Set update time
        if (days > 0) {
            setIntervals(60, 300, "days");
        } else if (days == 0 && hours > 1) {
            setIntervals(1, 60, "hours");
        } else if (hours <= 1) {
            setIntervals(1, 15, "mins");
        }
    }

    const open = startDate <= now && now < endDate;
    if (open !== prevOpen) {
        for (let elem of openElems) {
            elem.hidden = (!open && !preview);
        }
        for (let elem of closedElems) {
            elem.hidden = open;
        }
        if (!open && endDate < now) document.getElementById("countdown-alert").innerHTML = "Shop now closed!";
        prevOpen = open;
    }

    for (let elem of alerts) {
        if (elem.dataset.start !== undefined && elem.dataset.end !== undefined && elem.dataset.start !== "0") {
            console.log(elem, elem.dataset.start, elem.dataset.end);
            const s = new Date(elem.dataset.start);
            const e = new Date(elem.dataset.end);
            elem.hidden = !(s < now && now < e);
        } else {
            elem.hidden = false;
        }
    }

};

window.addEventListener('load', () => {
    cds = document.getElementsByClassName("countdown");
    openElems = document.getElementsByClassName("while-open");
    closedElems = document.getElementsByClassName("while-closed");
    alerts = document.getElementsByClassName("alert");
    console.log(cds, openElems, closedElems);
    countdown();
});
