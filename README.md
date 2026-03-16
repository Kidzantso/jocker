# Jocker 🦹‍♂️

A small always-on-top Electron widget that sits in the bottom-right corner of your screen and opens a quick tools menu.

## Features

- Floating widget with a radial/stack menu UI
- Tools included:
  - QR Reader (decode QR from pasted/uploaded/dropped image) 📷
  - QR Maker (generate/copy/download QR codes) 📷
  - Notes 📝
  - Tasks 📋
  - Pomodoro Timer ⏳
  - Keyboard Switch (EN ⇄ AR key mapping) 🌐
- Auto “magnetize”/hide to the right edge after inactivity
- Starts on login (can be changed in `main.js`)

## Tech

- Electron (`main.js`, `preload.js`, `renderer.js`)
- Tool UIs are plain HTML in `tools/` and are loaded in an iframe
- Some tools load libraries from a CDN (internet required): `tools/qrreader.html`, `tools/qrmaker.html`

## Getting started

Prereqs: Node.js + npm.

```bash
npm ci
npm start
```

## Build (Windows installer)

This project is configured for a Windows NSIS installer via `electron-builder`.

You can found a release version in GitHub releases, or you can build it yourself


## Add a new tool

1. Create a new page in `tools/` (example: `tools/mytool.html`).
2. Add an icon in `index.html` with a `data-tool` label.

The current loader derives the file name from `data-tool` like this:

`fileName = tool.toLowerCase().replace(/\s+/g, '') + ".html"`

So `data-tool="QR Reader"` loads `tools/qrreader.html`.

