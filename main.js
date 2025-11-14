
// Get Elements
const update_b = document.getElementById('update');

// input: Markdown text
// output: HTML from Mrkdown
let input, output;

// Buttons
update_b.onclick = convert; // Convert Markdown To HTML

// Markdown
// Options
marked.setOptions({
    breaks: true,
    gfm: true,  
    headerIds: false,
    smartLists: true,
    smartypants: true,
});

// Syntax
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
          return `<span class="blue">${token.text}</span>`;
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
          return `<span class="green">${token.text}</span>`;
        }
      },
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
          const lang = token.lang ? ` class="language-${token.lang}"` : '';
          const escaped = token.text
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;");
          return `<pre><code${lang}>${escaped}</code></pre>\n`;
        }            
      }
           
  ]
});

// Markdown Convert
function convert() {
  update_b.innerHTML = "Refreshing...";

  input = document.getElementById('input').value;

  output = marked.parse(input);

  const preview = document.getElementsByClassName('markdown');
  preview.innerHTML = output;

  // Highlight all code blocks
  preview.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block);
  });

  update_b.innerHTML = "Refresh";
}

hljs.highlightAll();  