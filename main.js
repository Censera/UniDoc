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
      name: 'stroke',
      level: 'inline',
      start(src) { return src.match(/-/)?.index; },
      tokenizer(src) {
        const rule = /^-(.+?)-/;
        const match = rule.exec(src);
        if (match) return { type: 'stroke', raw: match[0], text: match[1] };
      },
      renderer(token) {
        return `<del>${token.text}</del>`;
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
        const rule = /^!(.+?)!-/;
        const match = rule.exec(src);
        if (match) return { type: 'mark', raw: match[0], text: match[1] };
      },
      renderer(token) {
        return `<mark>${token.text}</mark>`;
      }
    },
    {
        name: 'superscript',
        level: 'inline',
        start(src) { return src.indexOf('^'); },
        tokenizer(src) {
          const rule = /^\^([^\s]+)(\s|$)/;
          const match = rule.exec(src);
          if (match) {
            return {
              type: 'superscript',
              raw: match[0],
              text: match[1]
            };
          }
        },
        renderer(token) {
          return `<sup>${token.text}</sup> `;
        }
      }
  ]
});
  
function convert() {
    input = document.getElementById('input').value;
    output = marked.parse(input);
    document.getElementById('preview').innerHTML = output;
}

render.onclick = convert;