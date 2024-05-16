## 安装

### 前置准备

- [Node.js](https://nodejs.org/) 18 及以上版本。
- 通过命令行界面 (CLI) 访问 VitePress 的终端。
- 支持 [Markdown](https://en.wikipedia.org/wiki/Markdown) 语法的编辑器。
  - 推荐 [VSCode](https://code.visualstudio.com/) 及其[官方 Vue 扩展](https://marketplace.visualstudio.com/items?itemName=Vue.volar)。

VitePress 可以单独使用，也可以安装到现有项目中。在这两种情况下，都可以使用以下方式安装它：


```sh [npm]
$ npm add -D vitepress
```

```sh [pnpm]
$ pnpm add -D vitepress
```

```sh [yarn]
$ yarn add -D vitepress
```

```sh [bun]
$ bun add -D vitepress
```

## 启动并运行

该工具还应该将以下 npm 脚本注入到 `package.json` 中：

```json
{
  ...
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  },
  ...
}
```

`docs:dev` 脚本将启动具有即时热更新的本地开发服务器。使用以下命令运行它：


```sh [npm]
$ npm run docs:dev
```

```sh [pnpm]
$ pnpm run docs:dev
```

```sh [yarn]
$ yarn docs:dev
```

```sh [bun]
$ bun run docs:dev
```


除了 npm 脚本，还可以直接调用 VitePress：


```sh [npm]
$ npx vitepress dev docs
```

```sh [pnpm]
$ pnpm vitepress dev docs
```

```sh [yarn]
$ yarn vitepress dev docs
```

```sh [bun]
$ bun vitepress dev docs
```


## 部署

以下指南基于一些前提：

- VitePress 站点位于项目的 `docs` 目录中。
- 你使用的是默认的生成输出目录 （`.vitepress/dist`）。
- VitePress 作为本地依赖项安装在项目中，并且你已在 `package.json` 中设置以下脚本：

  ```json
  {
    "scripts": {
      "docs:build": "vitepress build docs",
      "docs:preview": "vitepress preview docs"
    }
  }
  ```

## 本地构建与测试 {#build-and-test-locally}

1. 可以运行以下命令来构建文档：

   ```sh
   $ npm run docs:build
   ```

2. 构建文档后，通过运行以下命令可以在本地预览它：

   ```sh
   $ npm run docs:preview
   ```

   `preview` 命令将启动一个本地静态 Web 服务 `http://localhost:4173`，该服务以 `.vitepress/dist` 作为源文件。这是检查生产版本在本地环境中是否正常的一种简单方法。

3. 可以通过传递 `--port` 作为参数来配置服务器的端口。

   ```json
   {
     "scripts": {
       "docs:preview": "vitepress preview docs --port 8080"
     }
   }
   ```

   现在 `docs:preview` 方法将会在 `http://localhost:8080` 启动服务。

## 设定 public 根目录 {#setting-a-public-base-path}

默认情况下，我们假设站点将部署在域名 (`/`) 的根路径上。如果站点在子路径中提供服务，例如 `https://mywebsite.com/blog/`，则需要在 VitePress 配置中将 [`base`](../reference/site-config#base) 选项设置为 `'/blog/'`。

**例**：如果你使用的是 Github（或 GitLab）页面并部署到 `user.github.io/repo/`，请将 `base` 设置为 `/repo/`。

## HTTP 缓存标头 {#http-cache-headers}

如果可以控制生产服务器上的 HTTP 标头，则可以配置 `cache-control` 标头以在重复访问时获得更好的性能。

生产版本对静态资源 (JavaScript、CSS 和其他非 `public` 目录中的导入资源) 使用哈希文件名。如果你使用浏览器开发工具的网络选项卡查看生产预览，你将看到类似 `app.4f283b18.js` 的文件。

此哈希 `4f283b18` 是从此文件的内容生成的。相同的哈希 URL 保证提供相同的文件内容——如果内容更改，URL 也会更改。这意味着你可以安全地为这些文件使用最强的缓存标头。所有此类文件都将放置在输出目录的 `assets/` 中，因此你可以为它们配置以下标头：

```
Cache-Control: max-age=31536000,immutable
```

::: details Netlify 示例 `_headers` 文件

```
/assets/*
  cache-control: max-age=31536000
  cache-control: immutable
```

注意：该 `_headers` 文件应放置在 [public 目录](/guide/asset-handling#the-public-directory)中 (在我们的例子中是 `docs/public/_headers`)，以便将其逐字复制到输出目录。

[Netlify 自定义标头文档](https://docs.netlify.com/routing/headers/)

:::

::: details Vercel 配置示例 `vercel.json`

```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

注意：`vercel.json` 文件应放在存储库的根目录中。

[Vercel 关于标头配置的文档](https://vercel.com/docs/concepts/projects/project-configuration#headers)
