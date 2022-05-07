// preloader variable
let preLoad = `.preload`;
// profile variables
let profile = `header .container .user-section .profile`;
let profileArrow = `header .container .user-section .profile .caret`;
let profileMenu = `.profile-pop`;
// navbar variables
let navBar = `nav`;
let navMenu = `header .container .toggle-menu`;
// color options variable
let optionBox = `.option`;
let optBtn = `.option .option-icon`;
let optIcon = `.option .option-icon > svg`;
let optColors = Array.from(document.querySelectorAll(`.option .option-box .color-option ul > li`));
let themeBar = `.option .mood-option .mood .mood-bar`;
let themeMoon = `.option .mood-option .mood .moon`;
let themeSun = `.option .mood-option .mood .sun`;
let langEnglish = `.option .lang-option .lang-box > a.english`;
let langArabic = `.option .lang-option .lang-box > a.arabic`;
let englishStyle = `link.style-en`;
let arabicStyle = `link.style-ar`;
// header & footer logo variables
let headerLogo = document.querySelector(`header .container .logo-icon img`);
let footerLogo = document.querySelector(`footer .container .top .end-wish img`);
// go up button variables
let goUpBtn = document.querySelector(`.go-up`);
// form variables
let nameInput = `.user-form form div.name-section input.user-name`;
let nameIcon = `.user-form form div.name-section .name-icon svg`;
let emailInput = `.user-form form div.email-section input.user-email`;
let emailIcon = `.user-form form div.email-section .email-icon svg`;
let passInputOne = `.user-form form div.pass-original input.user-password`;
let passIconOne = `.user-form form div.pass-original .show-password`;
let passIconSvgOne = `.user-form form div.pass-original .show-password svg`;
let passInputTwo = `.user-form form div.pass-confirm input.user-password`;
let passIconTwo = `.user-form form div.pass-confirm .show-password`;
let passIconSvgTwo = `.user-form form div.pass-confirm .show-password svg`;
// localstorage values variables
let saveLogo = localStorage.getItem("logo-color");
let saveColor = localStorage.getItem("option-color");
let saveThemeStat = localStorage.getItem("theme-status");
let saveThemeBG = localStorage.getItem("theme-background");
let saveThemeClr = localStorage.getItem("theme-color");
let saveLanguage = localStorage.getItem("page-language");
// End Variables
// Start check Localstorage
// color option value
if (saveColor !== null) {
    document.documentElement.style.setProperty("--option-color", saveColor);
    optColors.forEach(li => {
        if (li.dataset.color == saveColor) {
            li.classList.add("active");
        } else {
            if (li.classList.contains("active")) {
                li.classList.remove("active");
            }
        }
    });
}
// logo color value
if (saveLogo !== null) {
    headerLogo.setAttribute("src", `assets/imgs/${saveLogo}`);
    footerLogo.setAttribute("src", `assets/imgs/${saveLogo}`);
}
// theme mood value
if (saveThemeStat !== null) {
    if (!$(themeBar).hasClass(saveThemeStat)) {
        $(themeBar).toggleClass("light dark");
    }
}
// theme background color value
if (saveThemeBG !== null) {
    $("body").get(0).style.setProperty("--theme-background", saveThemeBG);
}
// theme color value
if (saveThemeClr !== null) {
    $("body").get(0).style.setProperty("--theme-color", saveThemeClr);
}
// page language value
if (saveLanguage !== null) {
    if (saveLanguage == "en") {
        if (!$(langEnglish).hasClass("active")) {
            $(langEnglish).siblings().removeClass("active");
            $(langEnglish).addClass("active");
            $("html").attr("lang", "en");
            $("body").attr("translate", "no");
            if ($(arabicStyle).attr("href") != undefined) {
                $(arabicStyle).remove();
            }
        }
    } else if (saveLanguage == "ar") {
        if (!$(langArabic).hasClass("active")) {
            $(langArabic).siblings().removeClass("active");
            $(langArabic).addClass("active");
            $("html").attr("lang", "ar");
            $("body").attr("translate", "yes");
            $(englishStyle).after(`<link rel="stylesheet" href="css/register-ar.css" class="style-ar" />`);
        }
    }
}
// End check Localstorage
// Fade preloader out
$(document).ready(() => {
    $(preLoad).fadeOut("slow");
});
// Toggle profile menu
$(profile).on("click", function() {
    toggleProfile();
});
// Toggle navbar menu
$(navMenu).on("click", function() {
    toggleNav();
});
// Fade navbar in after resizeing
$(window).on("resize", function() {
    if ($(document).width() >= 767) {
        $(navBar).slideDown("fast");
    } else {
        $(navBar).slideUp("fast");
        if ($(navMenu).hasClass("open")) {
            $(navMenu).removeClass("open");
        }
    }
});
// Toggle profile function
function toggleProfile() {
    if ($(navMenu).hasClass("open")) {
        $(navBar).slideUp("fast");
        $(navMenu).removeClass("open");
    }
    $(profileMenu).slideToggle("fast");
    $(profileArrow).toggleClass("fa-caret-down fa-caret-up");
}
// Toggle Navbar function
function toggleNav() {
    if ($(profileMenu).css("display") == "block") {
        $(profileMenu).slideUp("fast");
        $(profileArrow).removeClass("fa-caret-up").addClass("fa-caret-down");
    }
    $(navBar).slideToggle("fast");
    $(navMenu).toggleClass("open");
};
// toggle colors option box
$(optBtn).on("click", function() {
    $(optionBox).toggleClass("open");
    $(optIcon).toggleClass("fa-spin");
});
// click on a color option
optColors.forEach(li => {
    li.style.backgroundColor = li.dataset.color;
    li.addEventListener("click", () => {
        document.documentElement.style.setProperty("--option-color", li.dataset.color);
        headerLogo.setAttribute("src", `assets/imgs/${li.dataset.logo}`);
        footerLogo.setAttribute("src", `assets/imgs/${li.dataset.logo}`);
        localStorage.setItem("option-color", li.dataset.color);
        localStorage.setItem("logo-color", li.dataset.logo);
        optColors.forEach(clr => {
            if (clr.classList.contains("active")) {
                clr.classList.remove("active");
            }
        });
        li.classList.add("active");
        $(optionBox).removeClass("open");
        $(optIcon).removeClass("fa-spin");
    })
});
// click on theme bar
$(themeBar).on("click", function() {
    if ($(themeBar).hasClass("light")) {
        $("body").get(0).style.setProperty("--theme-background", "#333");
        $("body").get(0).style.setProperty("--theme-color", "#fff");
        localStorage.setItem("theme-status", "dark");
        localStorage.setItem("theme-background", "#333");
        localStorage.setItem("theme-color", "#fff");
        $(themeBar).toggleClass("light dark");
    } else if ($(themeBar).hasClass("dark")) {
        $("body").get(0).style.setProperty("--theme-background", "#fff");
        $("body").get(0).style.setProperty("--theme-color", "#333");
        localStorage.setItem("theme-status", "light");
        localStorage.setItem("theme-background", "#fff");
        localStorage.setItem("theme-color", "#333");
        $(themeBar).toggleClass("dark light");
    }
});
// click on moon icon
$(themeMoon).on("click", function() {
    if ($(themeBar).hasClass("light")) {
        $("body").get(0).style.setProperty("--theme-background", "#333");
        $("body").get(0).style.setProperty("--theme-color", "#fff");
        localStorage.setItem("theme-status", "dark");
        localStorage.setItem("theme-background", "#333");
        localStorage.setItem("theme-color", "#fff");
        $(themeBar).toggleClass("light dark");
    }
});
// click on sun icon
$(themeSun).on("click", function() {
    if ($(themeBar).hasClass("dark")) {
        $("body").get(0).style.setProperty("--theme-background", "#fff");
        $("body").get(0).style.setProperty("--theme-color", "#333");
        localStorage.setItem("theme-status", "light");
        localStorage.setItem("theme-background", "#fff");
        localStorage.setItem("theme-color", "#333");
        $(themeBar).toggleClass("dark light");
    }
});
// click on english btn
$(langEnglish).on("click", function(e) {
    if (!$(langEnglish).hasClass("active")) {
        $(langEnglish).siblings().removeClass("active");
        $(langEnglish).addClass("active");
        $("html").attr("lang", "en");
        $("body").attr("translate", "no");
        if ($(arabicStyle).attr("href") != undefined) {
            $(arabicStyle).remove();
        }
        localStorage.setItem("page-language", "en");
    } else {
        e.preventDefault();
    }
});
// click on arabic btn
$(langArabic).on("click", function(e) {
    if (!$(langArabic).hasClass("active")) {
        $(langArabic).siblings().removeClass("active");
        $(langArabic).addClass("active");
        $("html").attr("lang", "ar");
        $("body").attr("translate", "yes");
        $(englishStyle).after(`<link rel="stylesheet" href="css/register-ar.css" class="style-ar" />`);
        localStorage.setItem("page-language", "ar");
    } else {
        e.preventDefault();
    }
});
// Close opened menu by clicking Escape key
$(document).on("keydown", function(e) {
    if (e.key == "Escape") {
        if ($(profileMenu).css("display") == "block") {
            $(profileMenu).slideUp("fast");
            $(profileArrow).removeClass("fa-caret-up").addClass("fa-caret-down");
        }
        if ($(navBar).css("display") == "block" && $(document).width() <= 767) {
            $(navBar).slideUp("fast");
            $(navMenu).removeClass("open");
        }
        if ($(optionBox).hasClass("open")) {
            $(optionBox).removeClass("open");
            $(optIcon).removeClass("fa-spin");
        }
    }
});
// Close opened menu by clicking document body
$(document).on("click", function(e) {
    if ($(profileMenu).find(e.target).length == 0 && $(profile).find(e.target).length == 0 && e.target != $(profile)[0]) {
        if ($(profileMenu).css("display") == "block") {
            $(profileMenu).slideUp("fast");
            $(profileArrow).removeClass("fa-caret-up").addClass("fa-caret-down");
        }
    }
    if ($(navMenu).find(e.target).length == 0 && $(navBar).find(e.target).length == 0 && e.target != $(navMenu)[0]) {
        if ($(navMenu).hasClass("open")) {
            $(navBar).slideUp("fast");
            $(navMenu).removeClass("open");
        }
    }
    if ($(optionBox).find(e.target).length == 0 && $(optBtn).find(e.target).length == 0 && e.target != $(optionBox)[0]) {
        if ($(optionBox).hasClass("open")) {
            $(optionBox).removeClass("open");
            $(optIcon).removeClass("fa-spin");
        }
    }
});
// showing the go up btn
window.onscroll = function() {
    if (window.scrollY >= window.innerHeight) {
        goUpBtn.classList.add("show");
    } else {
        goUpBtn.classList.remove("show");
    }
};
// click on go up button
goUpBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0
    });
});
// Toggle name icon by focusing
$(nameInput).on({
    focus: function() {
        $(nameIcon).removeClass("fa-user").addClass("fa-user-pen");
    },
    blur: function() {
        $(nameIcon).removeClass("fa-user-pen").addClass("fa-user");
    }
});
// Toggle email icon by focusing
$(emailInput).on({
    focus: function() {
        $(emailIcon).removeClass("fa-envelope").addClass("fa-envelope-open");
    },
    blur: function() {
        $(emailIcon).removeClass("fa-envelope-open").addClass("fa-envelope");
    }
});
// Toggle original password value visablity
$(passIconOne).on("click", function() {
    if ($(passInputOne).attr("type") == "password") {
        $(passInputOne).attr("type", "text");
        $(passIconSvgOne).removeClass("fa-eye-slash").addClass("fa-eye");
        $(passIconSvgOne).attr("title", "Hide password");
    } else if ($(passInputOne).attr("type") == "text") {
        $(passInputOne).attr("type", "password");
        $(passIconSvgOne).removeClass("fa-eye").addClass("fa-eye-slash");
        $(passIconSvgOne).attr("title", "Show password");
    }
});
// Toggle confirmed password value visablity
$(passIconTwo).on("click", function() {
    if ($(passInputTwo).attr("type") == "password") {
        $(passInputTwo).attr("type", "text");
        $(passIconSvgTwo).removeClass("fa-eye-slash").addClass("fa-eye");
        $(passIconSvgTwo).attr("title", "Hide password");
    } else if ($(passInputTwo).attr("type") == "text") {
        $(passInputTwo).attr("type", "password");
        $(passIconSvgTwo).removeClass("fa-eye").addClass("fa-eye-slash");
        $(passIconSvgTwo).attr("title", "Show password");
    }
});