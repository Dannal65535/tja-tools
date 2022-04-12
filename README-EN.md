# TJA Tools

A tool to visualize the `.tja` chart files. Forked from [Snack](https://github.com/Snack-X)'s [tja-tools](https://github.com/Snack-X/tja-tools).

[中文README](README.md)

## Run

Visit [https://whmhammer.github.io/tja-tools](https://whmhammer.github.io/tja-tools)

**OR**

Download [tja-tools.html](https://github.com/WHMHammer/tja-tools/releases/download/v2.1.1/tja-tools.html), and open it in your browser

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
    - [ ] #LEVELHOLD
    - [ ] #BARLINEOFF
    - [ ] #BARLINEON

## Version History

<details>
    <summary>v2.1.1</summary>
    <ul>
        <li>More complete branching support (now works with songs like Anzu no Uta, but still leave </code>#LEVELHOLD</code> unsupported)</li>
    </ul>
</details>

<details>
    <summary>v2.1.0</summary>
    <ul>
        <li>Rough branching support</li>
        Note: hard-coded to take the <code>#M</code> (master) branch. Works for most charts (counterexample: <em>Anzu no Uta</em>)
    </ul>
</details>

<details>
    <summary>v2.0.x</summary>
    <ul>
        <li>Now supports Edit/Ura courses</li>
        <li>Added documentation</li>
    </ul>
</details>

<details>
    <summary>v1.x</summary>
    <ul>
        <li><a href="https://github.com/Snack-X" target="_blank">Snack</a>'s original <a href="https://github.com/Snack-X/tja-tools" target="_blank">tja-tools</a></li>
    </ul>
</details>
