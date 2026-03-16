const root = document.documentElement;
const switchElm = document.querySelector(".switch-toggle");
const savedTheme = readFromLocalStorage("isDarkMode");
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const buttons = document.querySelectorAll("button");

init();
function init() {
    let isDark;
    if (savedTheme !== null && savedTheme !== undefined) {
        isDark = savedTheme;
    } else {
        isDark = systemPrefersDark;
    }
    switchElm.checked = isDark;
    root.dataset.dark = isDark;
}
switchElm.addEventListener("change", () => {
    const isDark = switchElm.checked;
    root.setAttribute("data-dark", isDark);
    saveToLocalStorage("isDarkMode", isDark)
})
/* function colorSwitch() {
    switchElm.addEventListener("click", () => {
        if(isDark != systemPrefersDark) {
            buttons.classList.remove("dark-mode");
            buttons.classList.add("light-mode")
        } else {
            buttons.classList.remove("light-mode");
            buttons.classList.add("dark-mode")
        }
        buttons.classList.toggle('dark-mode');
        if(buttons.style.backgroundColor == "#000") {
            buttons.style.backgroundColor = "#AAA9B1"
        } else {
            buttons.style.backgroundColor = "#000"
        }
    })
} */
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
    return "Data was saved with the key " + key
}
function readFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}
function deleteFromLocalStorage(key) {
    localStorage.removeItem(key);
    return "The element with key " + key + " was deleted."
}