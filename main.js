let render = document.getElementById('render');
let input, output;

function convert() {
    input = document.getElementById('input').value;
    output = marked.parse(input);

    document.getElementById('preview').innerHTML = output;
}

render.onclick = convert;