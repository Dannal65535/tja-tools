# TJA Tools

[中文](README.md) English

A tool to visualize `.tja` chart files. Forked from [Snack](https://github.com/Snack-X)'s [tja-tools](https://github.com/Snack-X/tja-tools).

## Run

Visit [https://whmhammer.github.io/tja-tools](https://whmhammer.github.io/tja-tools)

## Build

Install Node v14:

```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install 14.19.1
```

Clone the repo:

```
git clone https://github.com/WHMHammer/tja-tools
cd tja-tools
```

Install other dependencies:

```
npm install
```

Build:

```
npm run build
```

You shall then open `index.html` (not `src/index.html`) in your browser.

## Example

![](示例-春节序曲-谱面.png)

![](示例-春节序曲-统计.png)

## Progress

- [x] Manual Selection of file encoding
- [ ] Show different branches side-by-side
- Global Header
    - [x] TITLE:
    - [x] SUBTITLE:
    - [x] BPM:
    - [x] WAVE:
    - [x] OFFSET:
    - [x] DEMOSTART:
    - [ ] SCOREMODE:
    - [x] GENRE:
    - [ ] STYLE:
- Per-course Headers
    - COURSE:
        - [x] Easy / 0
        - [x] Normal / 1
        - [x] Hard / 2
        - [x] Oni / 3
        - [x] Edit / Ura / 4
    - [x] LEVEL:
    - [x] BALLOON:
    - [x] SCOREINIT:
    - [x] SCOREDIFF:
- Command
    - [x] #START
    - [x] #END
    - [x] #GOGOSTART
    - [x] #GOGOEND
    - [x] #MEASURE
    - [x] #SCROLL
    - [x] #BPMCHANGE
    - [ ] #DELAY
    - [x] #BRANCHSTART
    - [x] #BRANCHEND
    - [x] #N
    - [x] #E
    - [x] #M
    - [x] #LEVELHOLD
    - [ ] #BARLINEOFF
    - [ ] #BARLINEON
