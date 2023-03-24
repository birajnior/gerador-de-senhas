const inputEl = document.querySelector("#password")
const upperCaseCheckEl = document.querySelector("#uppercase-check")
const numberCheckEl = document.querySelector("#number-check")
const symbolCheckEl = document.querySelector("#symbol-check")
const securityIndicatorBarEl = document.querySelector("#security-indicator-bar")

let passwordLength = 16

function generatePassword() {
    let chars = "abcdefghjkmnpqrstuvwxyz"
    const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ"
    const numberChars = "123456789"
    const symbolChars = "?!@&*()[]"
    let password = ""

    if (upperCaseCheckEl.checked) {
        chars += upperCaseChars
    }

    if (numberCheckEl.checked) {
        chars += numberChars
    }

    if (symbolCheckEl.checked) {
        chars += symbolChars
    }

    for (let i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length)
        password += chars.substring(randomNumber, randomNumber + 1)
    }

    inputEl.value = password
    calculateQuality()
    calculateFontSize()
}

function calculateQuality() {
    const percent = Math.round(
        (passwordLength / 64) * 35 +
        (upperCaseCheckEl.checked ? 15 : 0) +
        (numberCheckEl.checked ? 20 : 0) +
        (symbolCheckEl.checked ? 30 : 0)
    )

    securityIndicatorBarEl.style.width = `${percent}%`

    if (percent >= 69) {
        securityIndicatorBarEl.classList.remove("critical")
        securityIndicatorBarEl.classList.remove("warning")
        securityIndicatorBarEl.classList.add("safe")
    } else if (percent >= 50) {
        securityIndicatorBarEl.classList.remove("safe")
        securityIndicatorBarEl.classList.remove("critical")
        securityIndicatorBarEl.classList.add("warning")
    } else {
        securityIndicatorBarEl.classList.remove("safe")
        securityIndicatorBarEl.classList.remove("warning")
        securityIndicatorBarEl.classList.add("critical")
    }

    if (percent >= 100) {
        securityIndicatorBarEl.classList.add("completed")
    } else {
        securityIndicatorBarEl.classList.remove("completed")
    }
}

function calculateFontSize() {
    if (passwordLength > 45) {
        inputEl.classList.remove("font-sm")
        inputEl.classList.remove("font-xs")
        inputEl.classList.add("font-xxs")
    } else if (passwordLength > 32) {
        inputEl.classList.remove("font-sm")
        inputEl.classList.remove("font-xxs")
        inputEl.classList.add("font-xs")
    } else if (passwordLength > 22) {
        inputEl.classList.remove("font-xxs")
        inputEl.classList.remove("font-xs")
        inputEl.classList.add("font-sm")
    } else {
        inputEl.classList.remove("font-xxs")
        inputEl.classList.remove("font-xs")
        inputEl.classList.remove("font-sm")
    }
}

function copy() {
    navigator.clipboard.writeText(inputEl.value)
}

const passwordLengthEl = document.querySelector("#password-length")
passwordLengthEl.addEventListener("input", function () {
    passwordLength = passwordLengthEl.value
    document.querySelector("#password-length-text").innerText = passwordLength
    generatePassword()
})

upperCaseCheckEl.addEventListener("click", generatePassword)
numberCheckEl.addEventListener("click", generatePassword)
symbolCheckEl.addEventListener("click", generatePassword)

document.querySelector("#copy-1").addEventListener("click", copy)
document.querySelector("#copy-2").addEventListener("click", copy)
document.querySelector("#renew").addEventListener("click", generatePassword)

generatePassword()
