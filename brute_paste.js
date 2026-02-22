function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function setNativeValue(element, value) {
    const prototype = Object.getPrototypeOf(element);
    const descriptor = Object.getOwnPropertyDescriptor(prototype, "value");
    descriptor.set.call(element, value);
}

function modelRV(cdf, values) {
    const t = Math.random();
    let left = 0;
    let right = values.length;

    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (t <= cdf[mid]) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    if (right == values.length) {
        return values[right - 1];
    }

    return values[right];
}

async function typeChar(el, char) {
    const start = el.selectionStart;
    const end = el.selectionEnd;

    const newValue =
        el.value.slice(0, start) +
        char +
        el.value.slice(end);

    setNativeValue(el, newValue);

    const newCursor = start + char.length;
    el.selectionStart = el.selectionEnd = newCursor;

    el.dispatchEvent(new Event("input", { bubbles: true }));
}

document.addEventListener("keydown", async (event) => {
    if (event.altKey && event.key.toLowerCase() === "v") {
        event.preventDefault();

        const text = await navigator.clipboard.readText();
        const el = document.activeElement;
        const speed_factor = 1.3;

        for (let index = 0; index < text.length; index++) {
            await typeChar(el, text[index]);

            if (index < text.length - 1) {
                transition = `${getToken(text[index])}-${getToken(text[index + 1])}`
                cdf = distributions[transition]["cdf_values"]
                values = distributions[transition]["time_values"]
                await sleep(modelRV(cdf, values) / speed_factor)
            }
        }
    }
});