# TJA工具

将`.tja`文件转化为图片。由[Snack](https://github.com/Snack-X)的[tja-tools](https://github.com/Snack-X/tja-tools)分叉。

[English README](README-EN.md)

## 运行

访问[https://whmhammer.github.io/tja-tools](https://whmhammer.github.io/tja-tools)

**或**

下载[tja-tools.html](https://github.com/WHMHammer/tja-tools/releases/download/v2.1.2/tja-tools.html)并用浏览器打开

## 构建

安装Node v14：

```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install 14.19.1
```

克隆代码库：

```
git clone https://github.com/WHMHammer/tja-tools
cd tja-tools
```

安装其它依赖：

```
npm install
```

构建：

```
npm run build
```

接着在浏览器中打开`index.html`（注意不是`src/index.html`）。

## 示例

![](示例-春节序曲-谱面.png)

![](示例-春节序曲-统计.png)

## 进度

- 全局元信息
    - [x] TITLE:
    - [x] SUBTITLE:
    - [x] BPM:
    - [x] WAVE:
    - [x] OFFSET:
    - [x] DEMOSTART:
    - [ ] SCOREMODE:
    - [x] GENRE:
    - [ ] STYLE:
- 各难度内部元信息
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
- 指令
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

## 版本历史

<details>
    <summary>v2.1.2</summary>
    <ul>
        <li>完整的谱面分歧支持</li>
    </ul>
</details>

<details>
    <summary>v2.1.1</summary>
    <ul>
        <li>更完整的谱面分歧支持（现在可正确解析如《杏之歌》的谱面，但尚不支持<code>#LEVELHOLD</code>）</li>
    </ul>
</details>

<details>
    <summary>v2.1.0</summary>
    <ul>
        <li>初步谱面分歧支持</li>
        注：目前硬编码为解析<code>#M</code>（达人）分支。适用于大部分谱面（反例：《杏之歌》）
    </ul>
</details>

<details>
    <summary>v2.0.x</summary>
    <ul>
        <li>现可解析里魔王谱面</li>
        <li>完善了文档</li>
    </ul>
</details>

<details>
    <summary>v1.x</summary>
    <ul>
        <li><a href="https://github.com/Snack-X" target="_blank">Snack</a>原本的<a href="https://github.com/Snack-X/tja-tools" target="_blank">tja-tools</a></li>
    </ul>
</details>
