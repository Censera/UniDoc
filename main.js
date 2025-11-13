let render = document.getElementById('render');
let input, output;

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
      name: 'underline',
      level: 'inline',
      start(src) { return src.match(/=/)?.index; },
      tokenizer(src) {
        const rule = /^=(.+?)=/;
        const match = rule.exec(src);
        if (match) return { type: 'underline', raw: match[0], text: match[1] };
      },
      renderer(token) {
        return `<u>${token.text}</u>`;
      }
    },
    {
      name: 'keyboard',
      level: 'inline',
      start(src) { return src.match(/&/)?.index; },
      tokenizer(src) {
        const rule = /^&(.+?)&/;
        const match = rule.exec(src);
        if (match) return { type: 'keyboard', raw: match[0], text: match[1] };
      },
      renderer(token) {
        return `<kbd>${token.text}</kbd>`;
      }
    },
    {
        name: 'mark',
        level: 'inline',
        start(src) { return src.match(/!/)?.index; },
        tokenizer(src) {
          const rule = /^!(.+?)!/;
          const match = rule.exec(src);
          if (match) return { type: 'mark', raw: match[0], text: match[1] };
        },
        renderer(token) {
          return `<mark>${token.text}</mark>`;
        }
    },
    {
        name: 'supscript',
        level: 'inline',
        start(src) { return src.match(/^/)?.index; },
        tokenizer(src) {
          const rule = /^\^\{(.+?)\}/;
          const match = rule.exec(src);
          if (match) return { type: 'supscript', raw: match[0], text: match[1] };
        },
        renderer(token) {
          return `<sup>${token.text}</sup>`;
        }
      },
      {
        name: 'subscripts',
        level: 'inline',
        start(src) { return src.match(/_/)?.index; },
        tokenizer(src) {
          const rule = /^_\{(.+?)\}/;
          const match = rule.exec(src);
          if (match) return { type: 'subscripts', raw: match[0], text: match[1] };
        },
        renderer(token) {
          return `<sub>${token.text}</sub>`;
        }
      },
      {
        name: 'blue',
        level: 'inline',
        start(src) { return src.match(/b_\[/)?.index; },
        tokenizer(src) {
          const rule = /^b_\[(.+?)\]/;
          const match = rule.exec(src);
          if (match) return { type: 'blue', raw: match[0], text: match[1] };
        },
        renderer(token) {
          return `<p style="color: #44f">${token.text}</p>`;
        }
      },
      {
        name: 'green',
        level: 'inline',
        start(src) { return src.match(/g_\[/)?.index; },
        tokenizer(src) {
          const rule = /^g_\[(.+?)\]/;
          const match = rule.exec(src);
          if (match) return { type: 'green', raw: match[0], text: match[1] };
        },
        renderer(token) {
          return `<p style="color: #4f4">${token.text}</p>`;
        }
      },
  ]
});
  
function convert() {
    input = document.getElementById('input').value;
    output = marked.parse(input);
    document.getElementById('preview').innerHTML = output;
}

render.onclick = convert;