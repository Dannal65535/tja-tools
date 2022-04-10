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
    - [v] TITLE:
    - [v] SUBTITLE:
    - [v] BPM:
    - [v] WAVE:
    - [v] OFFSET:
    - [ ] SONGVOL:
    - [ ] SEVOL:
    - [v] DEMOSTART:
    - [ ] SCOREMODE:
    - [v] GENRE:
    - [ ] SIDE:
    - [ ] STYLE:
- Per-course Headers
    - COURSE:
        - [v] Easy / 0
        - [v] Normal / 1
        - [v] Hard / 2
        - [v] Oni / 3
        - [ ] Edit / 4
    - [v] LEVEL:
    - [v] BALLOON:
    - [v] SCOREINIT:
    - [v] SCOREDIFF:
- Command
    - [?] #START
    - [?] #END
    - [v] #GOGOSTART
    - [v] #GOGOEND
    - [v] #MEASURE
    - [v] #SCROLL
    - [v] #BPMCHANGE
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
