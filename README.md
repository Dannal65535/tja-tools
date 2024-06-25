# TJA Tools

日本語 [中文](README-CH.md) [English](README-EN.md)

tjaファイルの譜面画像や情報を表示するツールです。
[Snack](https://github.com/Snack-X)様の[tja-tools](https://github.com/Snack-X/tja-tools)をフォークした、
[WHMHammer](https://github.com/WHMHammer)様の[tja-tools](https://github.com/WHMHammer/tja-tools)をベースにしています。

## サイト

[https://dannal65535.github.io/tja-tools/](https://dannal65535.github.io/tja-tools/)
にアクセスしてください。

## ビルド

Nodeのv14で下みたいな感じでやれば出来るらしい：

```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install 14.19.1
```

```
git clone https://github.com/Dannal65535/tja-tools
cd tja-tools
```

```
npm install
```

```
npm run build
```

ビルドが終わったら、直下にある`index.html`を開くとツールが起動します。
（`src/index.html`ではないので注意。）

## 例

![](示例.png)

![](示例-春节序曲-谱面.png)

![](示例-春节序曲-统计.png)

## 進捗

- [x] 文字コードを指定する
- [x] 異なる分岐を並べて表示する
- ヘッダ（譜面全体）
    - [x] `TITLE`
    - [ ] `SUBTITLE`
    - [x] `BPM`
    - [x] `GENRE`
- ヘッダ（難易度ごと）
    - `COURSE`
        - [x] `Easy` / `0`
        - [x] `Normal` / `1`
        - [x] `Hard` / `2`
        - [x] `Oni` / `3`
        - [x] `Edit` / `Ura` / `4`
        - [ ] `Tower` / `5`
        - [ ] `Dan` / `6`
    - [x] `LEVEL`
    - [x] `BALLOON`
    - [ ] `STYLE`
- ノーツ
    - [x] `0`（なし）
    - [x] `1`（面）
    - [x] `2`（縁）
    - [x] `3`（大面）
    - [x] `4`（大縁）
    - [x] `5`（黄色連打始点）
    - [x] `6`（大黄色連打始点）
    - [x] `7`（風船音符始点）
    - [x] `8`（連打・風船終点）
    - [x] `9`（くすだま音符始点）
    - [x] `A`（手つなぎ大面）
    - [x] `B`（手つなぎ大縁）
    - [x] `C`（爆弾音符）
    - [x] `F`（アドリブ音符）
    - [x] `G`（紫音符）
- コマンド
    - [x] `#START`
    - [x] `#END`
    - [x] `#MEASURE`
    - [x] `#BPMCHANGE`
    - [ ] `#DELAY`
    - [x] `#SCROLL`
    - [x] `#GOGOSTART`
    - [x] `#GOGOEND`
    - [x] `#BARLINEOFF`
    - [x] `#BARLINEON`
    - [x] `#BRANCHSTART`
    - [x] `#N`
    - [x] `#E`
    - [x] `#M`
    - [x] `#BRANCHEND`
    - [ ] `#LYRIC`
    - [ ] `#LEVELHOLD`
    - [ ] `#NEXTSONG`

## 独自追加命令

- ヘッダ（譜面全体）
	- `FONT`
	曲名と難易度のフォントを変更することが出来ます。
		- `sans-serif`
		TJA Toolsで元々使用されていたフォントです。`sans-serif`が使用されます。
	- `TITLECOLOR`
	1または2にすることで曲名をジャンルに応じた色に変えることが出来ます。
	1は濃い目の色、2は明るめの色になっています。
	- `LEVELCOLOR`
	1または2にすることで難易度の文字列を難易度に応じた色に変えることが出来ます。
	1にするとおに裏がおにと同じ色になります。
	- `LEVELURA`
	1にすることでおに裏の時の文字列の組み合わせが変化します。
	通常は曲名に`(裏譜面)`を追加し、難易度を`おに`と表記しますが、
	この命令の値を1にすることで、曲名はそのままで、難易度を`おに裏`と表記します。
	- `SPROLL`
	くすだま音符の始点を他の特殊な音符に変えることが出来ます。
		- `potato`
		いも音符になります。
		- `denden`
		でんでん音符になります。
		- `suzudon`
		すずどん音符になります。

- ヘッダ（難易度ごと）

- コマンド
	- `#TTBREAK`、`#NEWLINE`
	このコマンドがある箇所で改行させることが出来ます。
	元々`#TTBREAK`は存在していましたが、
	どんすこあで使用されている`#newline`にも対応しました。
	- `#MOVEEVENT`
	このコマンド以降のBPMやHSの情報の縦位置(Y座標)をずらすことが出来ます。
	- `#COUNTCHANGE`
	このコマンドの次の小節数を変更することが出来ます。
	- `#AVOIDTEXTOFF`、`#AVOIDTEXTON`
	このコマンド以降のBPMやHSの情報に縦線が被らないように出来ます。

## 独自仕様

- エディタ
	- どんすこあ構文を埋め込む
	プレビューでの譜面画像のヘッダにどんすこあのテキストを埋め込むことが出来ます。
	チェックを外すと選んだ難易度分のTJAテキストが埋め込まれます。
	どちらの場合でも`reverse.exe`でテキストファイルとして取り出すことが出来ます。

- プレビュー
	- スマホでの画像保存対応

- 統計
	- どんすこあ構文を保存
	どんすこあのテキストをファイルとして保存します。

	- 難易度
	難易度が統計に表示されます。

	- 譜面分岐対応
	分岐を選んでそれぞれの統計が見れるようになりました。
	
	- BPM
	最低BPM-最高BPMが表示されます。
	
	- 配点
	AC15配点以外に、真打やAC16配点にも対応しました。
	ゴーゴーの配点切り捨て方式をAC15方式とRC方式から選べるようになりました。
	
	- 平均密度
	元々TJA Toolsでの平均密度の計算式は「(音符数)/演奏時間」でしたが、
	[譜面とかWiki](https://wikiwiki.jp/taiko-fumen)で使用している「(音符数-1)/演奏時間」に変更しました。
	
	- 連打のテキストコピー
	見出し横のコピーボタンをクリックすると、
	[譜面とかWiki](https://wikiwiki.jp/taiko-fumen)で書かれている形式で連打秒数のテキストをコピーできます。

# スペシャルサンクス

- [Snack様](https://github.com/Snack-X)：ツールの製作者
- [申しコミ様](https://github.com/0auBSQ)：`A`、`B`、`C`、`F`、`G`の音符の追加の支援
- [WHMHammer様](https://github.com/WHMHammer)：ツールのフォーク版の製作者
