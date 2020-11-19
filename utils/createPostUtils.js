
export function loadSuggestions(text) {
    return new Promise((accept, reject) => {
        setTimeout(() => {
            const suggestions = [
                {
                    preview: "json",
                    value: "@json"
                },
                {
                    preview: "Angela",
                    value: "@angela"
                },
                {
                    preview: "David",
                    value: "@david"
                },
                {
                    preview: "Louise",
                    value: "@louise"
                }
            ].filter((i) => i.preview.toLowerCase().includes(text.toLowerCase()));
            accept(suggestions);
        }, 250);
    });
}

export function bufferToBase64(buf) {
    let binstr = Array.prototype.map.call(buf, function (ch) {
        return String.fromCharCode(ch);
    }).join('');
    return btoa(binstr);
}