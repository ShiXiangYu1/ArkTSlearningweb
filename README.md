# ArkTS学习网站

## 项目简介
这是一个帮助用户系统性学习ArkTS语言的教育网站。采用单页面应用(SPA)架构，每个功能模块都采用独立的文件夹管理，确保代码结构清晰，便于维护和扩展。

## 技术栈
- HTML5
- CSS3
- JavaScript (ES6+)
- 国内CDN：字节跳动CDN (http://cdn.bytedance.com)

## 项目结构
```
/
├── index.html              # 主页面
├── assets/                 # 静态资源目录
│   ├── css/               # CSS文件
│   ├── js/                # JavaScript文件
│   ├── images/            # 图片资源
│   └── icons/             # 图标资源
├── components/            # 公共组件
├── pages/                 # 页面模块
│   ├── basic/            # 基础教程
│   ├── advanced/         # 进阶教程
│   ├── examples/         # 示例代码
│   └── practice/         # 练习题
└── docs/                 # 文档说明
```

## 功能模块
1. 基础教程
   - ArkTS简介
   - 开发环境搭建
   - 基础语法
   - 组件使用

2. 进阶教程
   - 状态管理
   - 生命周期
   - 动画效果
   - 性能优化

3. 实战示例
   - 常用组件示例
   - 项目实战
   - 最佳实践

4. 在线练习
   - 交互式代码编辑器
   - 即时预览
   - 练习题库

## 开发进度
- [ ] 项目初始化
- [ ] 基础架构搭建
- [ ] 首页开发
- [ ] 基础教程模块
- [ ] 进阶教程模块
- [ ] 示例代码模块
- [ ] 练习题模块
- [ ] 测试与优化
- [ ] 部署上线

## 设计规范
1. 界面设计
   - 采用现代简约风格
   - 响应式布局
   - 深色/浅色主题支持

2. 交互设计
   - 清晰的导航结构
   - 流畅的页面切换
   - 友好的错误提示

## 性能优化
1. 资源加载
   - 使用字节跳动CDN
   - 图片懒加载
   - 代码分割

2. 缓存策略
   - 静态资源缓存
   - 浏览器缓存

## 项目依赖
所有依赖均使用国内源：
- NPM镜像：https://registry.npmmirror.com
- 字节跳动CDN：http://cdn.bytedance.com 