let input = document.getElementById('input_area');
let output = document.getElementById('output_area');

let toggle_auto_update = true;

auto_update_btn = document.getElementById('auto_update');
manual_update_btn = document.getElementById('manual_update');
reset_btn = document.getElementById('reset_btn');

reset_btn.onclick = () => {
  if (confirm("Do want to reset? You may lose you progress.")) {
    fetch("reset.md")
      .then(r => r.text())
      .then(t => {
        input.value = t;
      })
      .then(() => {
        update();
      });
  }
};


auto_update_btn.onclick = () => {

    if (!toggle_auto_update) {
        manual_update_btn.style.display = "none";
        auto_update_btn.innerHTML = "Auto Update"
    } else {
        manual_update_btn.style.display = "";
        auto_update_btn.innerHTML = "<"
    }

    toggle_auto_update = !toggle_auto_update;
};


manual_update_btn.onclick = () => {
    update();
};

input.oninput = () => {
    if (toggle_auto_update) {
        update();
    }
};

// Markdown
marked.setOptions({
    breaks: true,
    gfm: true,  
    headerIds: false,
    smartLists: true,
    smartypants: true,
});

marked.use({
    extensions: [
      {
        name: 'codeBlockDiv',
        level: 'block',
        start(src) { return src.search(/(```|~~~)/); },
        tokenizer(src) {
          const rule = /^(?:```|~~~)(\w+)?\n([\s\S]+?)\n(?:```|~~~)/;
          const match = rule.exec(src);
          if (!match) return;
          return {
            type: 'codeBlockDiv',
            raw: match[0],
            lang: match[1],
            text: match[2]
          };
        },
        renderer(token) {
          const langClass = token.lang ? ` class="language-${token.lang}"` : '';
          const escaped = token.text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
          return `<pre><code${langClass}>${escaped}</code></pre>\n`;
        }                
      }
           
  ]
});

function update() {
    const html = marked.parse(input.value);
    output.innerHTML = html;

    output.querySelectorAll("pre code")
        .forEach(block => hljs.highlightElement(block));
}
hljs.highlightAll()