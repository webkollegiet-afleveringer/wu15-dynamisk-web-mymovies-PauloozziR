const root = document.documentElement;
const switchElm = document.querySelector(".light-switch");
const savedTheme = readFromLocalStorage("isDarkMode");
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

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
});
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
    return "Data was saved with the key " + key
}
function readFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}
function deleteFromLocalStorage(key) {
    localStorage.removeItem(key)
    return "The element with key " + key + " was deleted."
}