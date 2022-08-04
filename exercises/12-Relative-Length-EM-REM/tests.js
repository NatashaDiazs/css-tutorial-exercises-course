const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');
const css = fs.readFileSync(path.resolve(__dirname, "./styles.css"), "utf8");
document.documentElement.innerHTML = html.toString();

jest.dontMock('fs');

describe("All the styles should be applied", ()=>{
  const meta = document.querySelector("meta")
  const title = document.querySelector('title')
  const link = document.querySelector('link')
  test("The H2 Tag should have a font-size: 0.8em", ()=>{
    // get computed styles of any element you like
    document.querySelector(
      "head"
    ).innerHTML = `<style>${css.toString()}</style>`;
    const h2Tag = document.querySelector("h2");
    var styles = window.getComputedStyle(h2Tag);
    expect(styles["font-size"]).toBe("0.8em");
  });
  test("The H3 Tag should haave a font-size: 0.8rem", ()=>{
    // get computed styles of any element you like
    document.querySelector(
      "head"
    ).innerHTML = `<style>${css.toString()}</style>`;
    const h3Tag = document.querySelector("h3");
    var styles = window.getComputedStyle(h3Tag);
    expect(styles["font-size"]).toBe("0.8rem");
  });
  test("You should add your rules below the existing code", ()=>{
    document.querySelector(
      "head"
    ).innerHTML = `<style>${css.toString()}</style>`;
    let cssArray = document.styleSheets[0].cssRules[0].selectorText;

    expect(cssArray).toBe("#my-first-div");
  }
  )
  test("You should add your rules below the existing code", ()=>{
    document.querySelector(
      "head"
    ).innerHTML = `<style>${css.toString()}</style>`;
    let cssArray = document.styleSheets[0].cssRules[1].selectorText;
    expect(cssArray).toBe("#the-second-one");
  }
  )
  test("You should not change the existing head tag elements", ()=>{
    let head = document.querySelector('head')
    expect(head).toBeTruthy()

    expect(meta).toBeTruthy()

    let href = link.getAttribute('href')
    expect(href).toBe('./styles.css')

    expect(title).toBeTruthy()
  })

});
