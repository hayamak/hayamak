# 開発環境構築

## 前提

* Mac
* Docker Desktop
* VS Code
* Dev Containers Extension

Node.js / npm はホスト環境にインストールしない。

## プロジェクト作成

```bash
mkdir project-name
cd project-name
```

`.devcontainer/devcontainer.json`

```json
{
  "name": "Astro",
  "build": {
    "dockerfile": "Dockerfile"
  },
  "forwardPorts": [4321],
  "remoteUser": "node",
  "customizations": {
    "vscode": {
      "extensions": [
        "astro-build.astro-vscode"
      ]
    }
  }
}
```

`.devcontainer/Dockerfile`

```dockerfile
FROM mcr.microsoft.com/devcontainers/javascript-node:22
```

## コンテナ起動

VS Code でプロジェクトを開く。

```text
Dev Containers: Reopen in Container
```

## Astro 作成

コンテナ内で実行。

```bash
npm create astro@latest .
```

## Astro プロジェクト作成

コンテナ内で実行。

```bash
npm create astro@latest .
```

`.devcontainer` のみ存在する場合は、そのままプロジェクトを作成できる。
作成できない場合は、一時的にサブディレクトリへ作成する。

```bash
npm create astro@latest tmp
```

作成後、必要に応じてルートへ移動する。

```bash
mv tmp/* .
mv tmp/.[!.]* . 2>/dev/null || true
rmdir tmp
```

## 開発サーバー起動

```bash
npm run dev -- --host
```

ブラウザで確認。

```text
http://localhost:4321
```

※ devcontainer 環境では `--host` を付けないとブラウザからアクセスできない場合がある。
