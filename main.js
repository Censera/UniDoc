let update = document.getElementById('update');
let input, output;

function convert() {
    input = document.getElementById('field').value;
    output = marked.parse(input);

    document.getElementById('preview_text').innerHTML = output;
}

update.onclick = convert;