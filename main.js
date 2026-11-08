
"use strict";

/* =================================
   LANKIVO TRAVELS CONFIGURATION
================================= */

const CONFIG = {
    whatsappNumber: "94763590094",
    businessName: "LANKIVO TRAVELS"
};


/* =================================
   WHATSAPP FUNCTION
================================= */

function openWhatsApp(message) {

    const number = CONFIG.whatsappNumber;

    if (!/^94\d{9}$/.test(number)) {
        alert("Please configure the correct LANKIVO WhatsApp number.");
        return false;
    }

    const url =
        "https://wa.me/" +
        number +
        "?text=" +
        encodeURIComponent(message);

    const whatsappWindow = window.open(url, "_blank");

    if (!whatsappWindow) {
        window.location.href = url;
    } else {
        whatsappWindow.opener = null;
    }

    return true;
}


/* =================================
   PRELOADER
================================= */

(function () {

    let preloaderHidden = false;

    function hidePreloader() {

        if (preloaderHidden) return;

        const preloader = document.getElementById("preloader");

        if (!preloader) return;

        preloaderHidden = true;
        preloader.classList.add("hide");

        setTimeout(function () {
            preloader.style.display = "none";
        }, 600);
    }

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            hidePreloader,
            { once: true }
        );

    } else {

        hidePreloader();

    }

    window.addEventListener("load", hidePreloader, {
        once: true
    });

    setTimeout(hidePreloader, 2500);

})();


/* =================================
   MOBILE NAVIGATION
================================= */

const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

if (menuToggle && navigation) {

    function closeMobileMenu() {

        menuToggle.classList.remove("active");
        navigation.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
    }

    menuToggle.addEventListener("click", function () {

        const isOpen = navigation.classList.toggle("active");

        menuToggle.classList.toggle("active", isOpen);

        menuToggle.setAttribute("aria-expanded", String(isOpen));

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

    });

    navigation.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", closeMobileMenu);
    });

    window.addEventListener("resize", function () {

        if (window.innerWidth > 900) {
            closeMobileMenu();
        }

    });

}


/* =================================
   HEADER SCROLL EFFECT
================================= */

const header = document.getElementById("header");

function handleHeaderScroll() {

    if (!header) return;

    header.classList.toggle(
        "scrolled",
        window.scrollY > 30
    );

}

window.addEventListener("scroll", handleHeaderScroll, {
    passive: true
});

handleHeaderScroll();


/* =================================
   SCROLL REVEAL ANIMATION
================================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(

        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);

                }

            });

        },

        { threshold: 0.12 }

    );

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });

} else {

    revealElements.forEach(function (element) {
        element.classList.add("visible");
    });

}


/* =================================
   BOOKING SUCCESS TOAST
================================= */

const bookingToast = document.getElementById("bookingToast");
const closeToast = document.getElementById("closeToast");

let toastTimer;

function showBookingToast() {

    if (!bookingToast) return;

    bookingToast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(function () {
        bookingToast.classList.remove("show");
    }, 6000);

}

if (closeToast && bookingToast) {

    closeToast.addEventListener("click", function () {

        bookingToast.classList.remove("show");
        clearTimeout(toastTimer);

    });

}


/* =================================
   BOOKING FORM
================================= */

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {

    bookingForm.addEventListener("submit", function (event) {

        event.preventDefault();

        // Browser built-in validation
        if (!bookingForm.checkValidity()) {
            bookingForm.reportValidity();
            return;
        }

        // Get form values
        const passengerName =
            document.getElementById("passengerName").value.trim();

        const passengerPhone =
            document.getElementById("passengerPhone").value.trim();

        const pickup =
            document.getElementById("pickup").value.trim();

        const destination =
            document.getElementById("destination").value.trim();

        const travelDate =
            document.getElementById("travelDate").value;

        const vehicle =
            document.getElementById("vehicle").value;

        const passengers =
            document.getElementById("passengers").value;

        const requirements =
            document.getElementById("requirements").value.trim();


        // Validate required fields
        if (
            !passengerName ||
            !passengerPhone ||
            !pickup ||
            !destination ||
            !travelDate ||
            !vehicle ||
            !passengers
        ) {

            alert("Please complete all required booking details.");
            return;

        }


        // Validate travel date
        const selectedDate = new Date(travelDate + "T00:00:00");

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (
            Number.isNaN(selectedDate.getTime()) ||
            selectedDate < today
        ) {

            alert("Please select today or a future travel date.");
            return;

        }


        // Create WhatsApp booking message
        const message =

`Hello ${CONFIG.businessName}!

I would like to enquire about a vehicle booking.

PASSENGER DETAILS

Name: ${passengerName}
Contact Number: ${passengerPhone}
Number of Passengers: ${passengers}

JOURNEY DETAILS

Pickup Location: ${pickup}
Destination: ${destination}
Travel Date: ${travelDate}
Vehicle Type: ${vehicle}

ADDITIONAL REQUIREMENTS

${requirements || "No additional requirements."}

Please share the vehicle availability and estimated price.

Thank you!`;


        // Open WhatsApp and show notification
        const opened = openWhatsApp(message);

        if (opened) {
            showBookingToast();
        }

    });

}


/* =================================
   OTHER WHATSAPP LINKS
================================= */

document.querySelectorAll(".whatsapp-link").forEach(function (link) {

    link.addEventListener("click", function (event) {

        event.preventDefault();

        const message =

`Hello ${CONFIG.businessName}!

I would like to know more about your travel services.

Please share more details.

Thank you!`;

        openWhatsApp(message);

    });

});


/* =================================
   DATE MINIMUM
================================= */

const travelDateInput = document.getElementById("travelDate");

if (travelDateInput) {

    const now = new Date();

    const localDate = [

        now.getFullYear(),

        String(now.getMonth() + 1).padStart(2, "0"),

        String(now.getDate()).padStart(2, "0")

    ].join("-");

    travelDateInput.min = localDate;

}


/* =================================
   BACK TO TOP
================================= */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {

    if (!backToTop) return;

    backToTop.classList.toggle(
        "show",
        window.scrollY > 450
    );

}, {
    passive: true
});

if (backToTop) {

    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =================================
   ACTIVE NAVIGATION
================================= */

const pageSections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    navLinks.forEach(function (link) {

                        link.classList.remove("active");

                        if (
                            link.getAttribute("href") ===
                            "#" + entry.target.id
                        ) {
                            link.classList.add("active");
                        }

                    });

                }

            });

        },

        {
            rootMargin: "-30% 0px -60% 0px"
        }

    );

    pageSections.forEach(function (section) {
        sectionObserver.observe(section);
    });

}


/* =================================
   COPYRIGHT YEAR
================================= */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =================================
   JAVASCRIPT LOADED
================================= */

console.log("LANKIVO TRAVELS JavaScript Loaded Successfully.");
