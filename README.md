# TJA Tools

A tool to visualize the `.tja` chart files. Forked from [Snack](https://github.com/Snack-X)'s [tja-tools](https://github.com/Snack-X/tja-tools).

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

You shall then open `index.html` in your browser.

## Progress

- Global Header
    - [x] TITLE:
    - [x] SUBTITLE:
    - [x] BPM:
    - [x] WAVE:
    - [x] OFFSET:
    - [ ] SONGVOL:
    - [ ] SEVOL:
    - [x] DEMOSTART:
    - [ ] SCOREMODE:
    - [x] GENRE:
    - [ ] SIDE:
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
    - [ ] #START
    - [ ] #END
    - [x] #GOGOSTART
    - [x] #GOGOEND
    - [x] #MEASURE
    - [x] #SCROLL
    - [x] #BPMCHANGE
    - [ ] #DELAY
    - [ ] #BRANCHSTART
    - [ ] #BRANCHEND
    - [ ] #SECTION
    - [ ] #N
    - [ ] #E
    - [ ] #M
    - [ ] #LEVELHOLD
    - [ ] #BMSCROLL
    - [ ] #HBSCROLL
    - [ ] #BARLINEOFF
    - [ ] #BARLINEON
