import SiteConfig from "../site.config";
import React from "react";

export function getSiteMetaData() {
  return SiteConfig.siteMetadata;
}

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

function flatten(text, child) {
  return typeof child === 'string'
      ? text + child
      : React.Children.toArray(child.props.children).reduce(flatten, text)
}

export function HeadingRenderer(props) {
  const children = React.Children.toArray(props.children)
  const text = children.reduce(flatten, '')
  const slug = text.toLowerCase().replace(/\s/g, '-')
  return React.createElement('h' + props.level, {id: slug}, props.children)
}
