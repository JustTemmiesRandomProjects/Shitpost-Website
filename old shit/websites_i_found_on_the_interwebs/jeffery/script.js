;(function () {
    // Money counting logic
    const q = id => document.getElementById(id)
    const MONEY_PER_SECOND = 2537
    const moneyField = q('money-counter-text')

    function* updateMoney(start, step) {
        let currentAmount = start
        while (true) yield (currentAmount += step)
    }

    const moneyCounter = updateMoney(0, MONEY_PER_SECOND)

    setInterval(() => {
        moneyField.innerText = moneyCounter.next().value.toLocaleString('en-US')
    }, 1000)

    // Dark and light mode
    const rootElement = document.querySelector(':root')
    const modeBtn = q('mode')
    const savedMode = localStorage.getItem('mode')

    function toggleMode(mode) {
        return mode === 'light' ? 'dark' : 'light'
    }

    function swapStyles() {
        const rootStyles = getComputedStyle(rootElement)
        const currentFg = rootStyles.getPropertyValue('--fg-color')
        const currentBg = rootStyles.getPropertyValue('--bg-color')
        rootElement.style.setProperty('--fg-color', currentBg)
        rootElement.style.setProperty('--bg-color', currentFg)
    }

    if (savedMode === 'dark') swapStyles()
    else localStorage.setItem('mode', 'light')

    modeBtn.addEventListener('click', () => {
        swapStyles()
        localStorage.setItem('mode', toggleMode(localStorage.getItem('mode')))
    })
})()
