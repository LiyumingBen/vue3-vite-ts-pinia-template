"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const path = require("path");
const mkdirp = require("mkdirp");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the super-excellent ${chalk.red(
          "generator-vue-vite-ts-pinia-template"
        )} generator!`
      )
    );

    const prompts = [
      {
        type: "input",
        name: "name",
        message: "Your project name",
        defualt: this.appname
      },
      {
        type: "list",
        name: "projectRoute",
        message: "whether to create the router",
        choices: [
          {
            name: "Yes",
            value: "yes",
            checked: true
          },
          {
            name: "No",
            value: "no"
          }
        ]
      },
      {
        type: "list",
        name: "projectPinia",
        message: "whether to create the pinia",
        choices: [
          {
            name: "Yes",
            value: "yes",
            checked: true
          },
          {
            name: "No",
            value: "no"
          }
        ]
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  default() {
    if (path.basename(this.destinationPath()) !== this.props.name) {
      this.log(`\nYour generator must be inside a folder named
        ${this.props.name}\n
        I will automatically create this folder.\n`);

      mkdirp(this.props.name);
      this.destinationRoot(this.destinationPath(this.props.name));
    }
  }

  // 把每个文件通过模板转换到目标路径
  // 遍历
  writing() {
    const templates = [
      ".editorconfig",
      ".env.development",
      ".env.production",
      ".eslintignore",
      ".eslintrc-auto-import.json",
      ".eslintrc.cjs",
      ".prettierignore",
      "auto-imports.d.ts",
      "commitlint.config.js",
      "components.d.ts",
      "env.d.ts",
      "index.html",
      "package.json",
      "README.md",
      "tsconfig.json",
      "vite.config.ts",
      "public/favicon.ico",
      ".husky/commit-msg",
      ".husky/pre-commit",
      "docs/前端代码规范.md",
      "docs/Git管理规范.md",
      "src/App.vue",
      "src/main.ts",
      "src/globals.d.ts",
      "src/shims-vue.d.ts",
      "src/vite-env.d.ts",
      "src/assets/index.ts",
      "src/components/index.ts",
      "src/config/index.ts",
      "src/constants/index.ts",
      "src/hooks/index.ts",
      "src/icons/e404-page.vue",
      "src/layout/types.ts",
      "src/plugins/index.ts",
      "src/router/index.ts",
      "src/services/http.ts",
      "src/store/index.ts",
      "src/store/store.ts",
      "src/styles/mixins/clearfix.scss",
      "src/styles/mixins/ellipsis.scss",
      "src/styles/mixins/scrollbar.scss",
      "src/styles/global.less",
      "src/styles/index.scss",
      "src/utils/index.ts",
      "src/utils/loading.ts",
      "src/views/index.ts",
      "src/views/e404/index.vue",
      "src/views/home/index.vue",
      "src/views/login/index.vue"
    ];
    const { name, projectRoute, projectPinia } = this.props || {};
    for (let temp of templates) {
      // 是否创建router pinia同理
      if (projectRoute === "yes" || projectPinia === "yes") {
        this.fs.copyTpl(this.templatePath(temp), this.destinationPath(temp), {
          name
        });
      } else {
        continue;
      }
    }
  }

  // 安装依赖
  install() {
    this.installDependencies();
  }
};
// 1.创建templates文件夹 放入vue项目所需文件
// 2.接受用户输入 并将vue项目中用到name的地方统一使用 <%= name %> 的方式替换
