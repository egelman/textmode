document.addEventListener("DOMContentLoaded", function() {

    const WIDTH = 1000;
    const HEIGHT = 1000;
    const chars = "RECURSE;:0)";
    const svgNS = "http://www.w3.org/2000/svg";
    const numShapes = 6;

    const spacing = () => {
        return 15;
        // return  5 + random.beta(10,10) * 15
    };

    const randomBeta = (alpha, beta) => {
        let u = 0, v = 0;
        while (u === 0) u = Math.random();
        while (v === 0) v = Math.random();
        return Math.pow(u, 1 / alpha) / (Math.pow(u, 1 / alpha) + Math.pow(v, 1 / beta));
    };

    function randomRange(min, max) {
            return Math.random() * (max - min) + min;
    }

    const svgContainer = document.getElementById("svgContainer");
    
    // SVG element
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", WIDTH);
    svg.setAttribute("height", HEIGHT);
    svg.setAttribute("viewBox", `0 0 ${WIDTH} ${HEIGHT}`);
    svgContainer.appendChild(svg);


    // create and append text to SVG
    const createText = (x, y, content, offset) => {
        const text = document.createElementNS(svgNS, "text");
        text.setAttribute("x", x + offset);
        text.setAttribute("y", y + offset);
        text.textContent = content;
        svg.appendChild(text);
    };
    
    let parameters = []
        
    function setParameters() {
        let h1 = randomRange(100,800)
        let h2 = randomRange(h1,900)
        let w1 = randomRange(100,700)
        let w2 = randomRange(w1,900)
        parameters.push(h1, h2, w1, w2);
    }

    function generateArt() {
        svg.innerHTML = "";
        parameters = []
                
        for (let i = 0; i < numShapes; i++) {
            setParameters()
        }
        for (let i = 0; i < numShapes; i++) {
            let c = i * 4;
            for (let y = parameters[c]; y < parameters[c+1]; y += spacing()) {
                for (let x = parameters[c+2]; x < parameters[c+3]; x += spacing()) {
                let i = 1 - Math.abs(WIDTH / 2 - x) / 300;
                const r = Math.round(Math.random() * (chars.length - 1));
                let content = chars[r];
                if (i > 0.6) {
                    const length = Math.round(randomBeta(2, 2) * (i - 0.5) / 0.5 * 3);
                    for (let j = 0; j < length; j += 1) {
                    const r = Math.round(Math.random() * (chars.length - 1));
                    content += chars[r];
                    }
                }
                i = Math.E ** (3 * (i - 1));
                const offset = i * Math.random() * 40 - 20;
                createText(x, y, content, offset);
                }
            }
        }
    }

    
    
    for (let y = 100; y < HEIGHT - 300; y += spacing()) {
        for (let x = 200; x < WIDTH - 400; x += spacing()) {
            let i = 1 - Math.abs(WIDTH / 2 - x) / 300;

            const r = Math.round(Math.random() * (chars.length - 1));
            let content = chars[r];
            if (i > 0.6) {
                const length = Math.round(randomBeta(2, 2) * (i - 0.5) / 0.5 * 3);
                for (let j = 0; j < length; j += 1) {
                    const r = Math.round(Math.random() * (chars.length - 1));
                    content += chars[r];
                }
            }

            i = Math.E ** (3 * (i - 1));
            const offset = i * Math.random() * 40 - 20;
            createText(x, y, content, offset);
        }
    }

    generateArt();

    document.addEventListener("click", generateArt);

});
