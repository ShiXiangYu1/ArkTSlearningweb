// Monaco Editor 配置
require.config({
    paths: {
        'vs': 'http://cdn.bytedance.com/monaco-editor/0.30.1/min/vs'
    }
});

// 编辑器实例
let editor;

// 练习题数据
const practiceData = {
    1: {
        title: 'Hello World组件',
        difficulty: 'easy',
        description: '创建一个简单的ArkTS组件，显示"Hello, World!"文本，并添加基本的样式。',
        initialCode: `@Component
struct HelloWorld {
    build() {
        // 在这里编写你的代码
    }
}`,
        solution: `@Component
struct HelloWorld {
    build() {
        Column() {
            Text('Hello, World!')
                .fontSize(24)
                .fontColor('#0A59F7')
        }
        .width('100%')
        .height('100%')
        .justifyContent(FlexAlign.Center)
    }
}`
    },
    2: {
        title: '计数器组件',
        difficulty: 'easy',
        description: '创建一个简单的计数器组件，包含一个数字显示和两个按钮用于增加和减少计数。',
        initialCode: `@Component
struct Counter {
    @State count: number = 0
    
    build() {
        // 在这里编写你的代码
    }
}`,
        solution: `@Component
struct Counter {
    @State count: number = 0
    
    build() {
        Column({ space: 20 }) {
            Text(this.count.toString())
                .fontSize(32)
                .fontWeight(FontWeight.Bold)
            
            Row({ space: 20 }) {
                Button('-')
                    .width(50)
                    .height(50)
                    .onClick(() => this.count--)
                
                Button('+')
                    .width(50)
                    .height(50)
                    .onClick(() => this.count++)
            }
        }
        .width('100%')
        .height('100%')
        .justifyContent(FlexAlign.Center)
    }
}`
    },
    3: {
        title: '输入表单',
        difficulty: 'medium',
        description: '创建一个包含用户名和密码输入框的表单组件，实现表单验证和提交功能。',
        initialCode: `@Component
struct LoginForm {
    @State username: string = ''
    @State password: string = ''
    @State errorMsg: string = ''
    
    build() {
        // 在这里编写你的代码
    }
}`,
        solution: `@Component
struct LoginForm {
    @State username: string = ''
    @State password: string = ''
    @State errorMsg: string = ''
    
    validateForm(): boolean {
        if (this.username.length < 3) {
            this.errorMsg = '用户名至少需要3个字符'
            return false
        }
        if (this.password.length < 6) {
            this.errorMsg = '密码至少需要6个字符'
            return false
        }
        return true
    }
    
    build() {
        Column({ space: 20 }) {
            TextInput({ placeholder: '用户名' })
                .width('80%')
                .height(40)
                .onChange((value: string) => {
                    this.username = value
                    this.errorMsg = ''
                })
            
            TextInput({ placeholder: '密码' })
                .width('80%')
                .height(40)
                .type(InputType.Password)
                .onChange((value: string) => {
                    this.password = value
                    this.errorMsg = ''
                })
            
            if (this.errorMsg) {
                Text(this.errorMsg)
                    .fontSize(14)
                    .fontColor(Color.Red)
            }
            
            Button('登录')
                .width('80%')
                .height(40)
                .onClick(() => {
                    if (this.validateForm()) {
                        console.info('表单提交成功')
                    }
                })
        }
        .width('100%')
        .height('100%')
        .padding(20)
    }
}`
    },
    4: {
        title: '列表渲染',
        difficulty: 'medium',
        description: '创建一个待办事项列表组件，支持添加、删除和标记完成功能。',
        initialCode: `@Component
struct TodoList {
    @State todos: Array<{id: number, text: string, completed: boolean}> = []
    @State newTodo: string = ''
    
    build() {
        // 在这里编写你的代码
    }
}`,
        solution: `@Component
struct TodoList {
    @State todos: Array<{id: number, text: string, completed: boolean}> = []
    @State newTodo: string = ''
    
    build() {
        Column({ space: 20 }) {
            Row() {
                TextInput({ placeholder: '添加新待办事项' })
                    .width('70%')
                    .height(40)
                    .onChange((value: string) => {
                        this.newTodo = value
                    })
                
                Button('添加')
                    .width('25%')
                    .height(40)
                    .onClick(() => {
                        if (this.newTodo.trim()) {
                            this.todos.push({
                                id: Date.now(),
                                text: this.newTodo,
                                completed: false
                            })
                            this.newTodo = ''
                        }
                    })
            }
            .width('100%')
            .justifyContent(FlexAlign.SpaceBetween)
            
            List({ space: 10 }) {
                ForEach(this.todos, (todo) => {
                    ListItem() {
                        Row() {
                            Checkbox()
                                .select(todo.completed)
                                .onChange((value) => {
                                    todo.completed = value
                                })
                            
                            Text(todo.text)
                                .decoration({ type: todo.completed ? 
                                    TextDecorationType.LineThrough : 
                                    TextDecorationType.None })
                            
                            Button('删除')
                                .onClick(() => {
                                    this.todos = this.todos
                                        .filter(t => t.id !== todo.id)
                                })
                        }
                        .width('100%')
                        .justifyContent(FlexAlign.SpaceBetween)
                    }
                })
            }
            .width('100%')
        }
        .width('100%')
        .height('100%')
        .padding(20)
    }
}`
    },
    5: {
        title: '图片轮播',
        difficulty: 'hard',
        description: '创建一个图片轮播组件，支持自动轮播和手动切换功能。',
        initialCode: `@Component
struct ImageCarousel {
    private images: string[] = [
        '/assets/images/slide1.jpg',
        '/assets/images/slide2.jpg',
        '/assets/images/slide3.jpg'
    ]
    @State currentIndex: number = 0
    
    build() {
        // 在这里编写你的代码
    }
}`,
        solution: `@Component
struct ImageCarousel {
    private images: string[] = [
        '/assets/images/slide1.jpg',
        '/assets/images/slide2.jpg',
        '/assets/images/slide3.jpg'
    ]
    @State currentIndex: number = 0
    private intervalId: number = -1
    
    aboutToAppear() {
        // 启动自动轮播
        this.intervalId = setInterval(() => {
            this.currentIndex = (this.currentIndex + 1) % this.images.length
        }, 3000)
    }
    
    aboutToDisappear() {
        // 清除定时器
        if (this.intervalId !== -1) {
            clearInterval(this.intervalId)
        }
    }
    
    build() {
        Stack({ alignContent: Alignment.Bottom }) {
            Swiper() {
                ForEach(this.images, (image) => {
                    Image(image)
                        .width('100%')
                        .height('100%')
                        .objectFit(ImageFit.Cover)
                })
            }
            .index(this.currentIndex)
            .autoPlay(true)
            .interval(3000)
            .indicator(false)
            .onChange((index: number) => {
                this.currentIndex = index
            })
            
            Row({ space: 20 }) {
                ForEach(this.images, (_, index) => {
                    Circle({ width: 10, height: 10 })
                        .fill(index === this.currentIndex ? '#0A59F7' : '#FFFFFF')
                        .onClick(() => {
                            this.currentIndex = index
                        })
                })
            }
            .width('100%')
            .justifyContent(FlexAlign.Center)
            .padding({ bottom: 20 })
        }
        .width('100%')
        .height(300)
    }
}`
    },
    6: {
        title: '主题切换',
        difficulty: 'hard',
        description: '创建一个支持主题切换的组件，实现浅色/深色主题的切换功能。',
        initialCode: `@Component
struct ThemeSwitcher {
    @State isDarkTheme: boolean = false
    
    build() {
        // 在这里编写你的代码
    }
}`,
        solution: `@Component
struct ThemeSwitcher {
    @State isDarkTheme: boolean = false
    @State content: string = '这是一段示例文本'
    
    @Styles function getCommonStyles() {
        .width('100%')
        .padding(20)
        .borderRadius(10)
        .animation({
            duration: 300,
            curve: Curve.EaseInOut
        })
    }
    
    build() {
        Column({ space: 20 }) {
            Toggle({ type: ToggleType.Switch, isOn: this.isDarkTheme })
                .onChange((isOn: boolean) => {
                    this.isDarkTheme = isOn
                })
            
            Column() {
                Text(this.content)
                    .fontSize(16)
                    .fontColor(this.isDarkTheme ? '#FFFFFF' : '#000000')
                
                Button('示例按钮')
                    .margin({ top: 20 })
                    .backgroundColor(this.isDarkTheme ? '#0A59F7' : '#2196F3')
                    .fontColor(this.isDarkTheme ? '#FFFFFF' : '#000000')
            }
            .getCommonStyles()
            .backgroundColor(this.isDarkTheme ? '#121212' : '#FFFFFF')
            
            Text('主题设置说明')
                .fontSize(14)
                .fontColor(this.isDarkTheme ? '#BBBBBB' : '#666666')
        }
        .width('100%')
        .height('100%')
        .backgroundColor(this.isDarkTheme ? '#000000' : '#F5F5F5')
        .padding(20)
    }
}`
    }
};

// 当前练习题ID
let currentPracticeId = 1;

// 初始化编辑器
require(['vs/editor/editor.main'], function() {
    // 配置ArkTS语言
    monaco.languages.register({ id: 'arkts' });
    monaco.languages.setMonarchTokensProvider('arkts', {
        keywords: [
            'struct', 'build', 'Column', 'Row', 'Text', 'Image', 'Button',
            'width', 'height', 'fontSize', 'fontColor', 'backgroundColor',
            'margin', 'padding', 'justifyContent', 'alignItems'
        ],
        
        tokenizer: {
            root: [
                [/@\w+/, 'decorator'],
                [/\b(struct|build)\b/, 'keyword'],
                [/\b(Column|Row|Text|Image|Button)\b/, 'type'],
                [/\b(width|height|fontSize|fontColor|backgroundColor|margin|padding|justifyContent|alignItems)\b/, 'property'],
                [/"[^"]*"/, 'string'],
                [/'[^']*'/, 'string'],
                [/\/\/.*/, 'comment'],
                [/[0-9]+/, 'number'],
            ]
        }
    });

    // 创建编辑器
    editor = monaco.editor.create(document.getElementById('codeEditor'), {
        value: practiceData[currentPracticeId].initialCode,
        language: 'arkts',
        theme: 'vs-dark',
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
        automaticLayout: true
    });

    // 监听主题变化
    document.body.addEventListener('themeChange', (e) => {
        const theme = e.detail.theme;
        monaco.editor.setTheme(theme === 'dark' ? 'vs-dark' : 'vs');
    });
});

// 标签切换
document.querySelectorAll('.editor-tabs .tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.editor-tabs .tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const isPreview = tab.textContent === '预览';
        document.getElementById('codeEditor').style.display = isPreview ? 'none' : 'block';
        document.getElementById('preview').style.display = isPreview ? 'block' : 'none';
        
        if (isPreview) {
            updatePreview();
        }
    });
});

// 更新预览
function updatePreview() {
    const code = editor.getValue();
    const previewFrame = document.querySelector('.preview-frame');
    const consoleContent = document.querySelector('.console-content');
    
    try {
        // 这里应该实现实际的ArkTS代码预览逻辑
        // 由于浏览器无法直接运行ArkTS代码，这里只是模拟效果
        previewFrame.innerHTML = `
            <div style="padding: 20px; text-align: center;">
                <div style="color: #0A59F7; font-size: 24px;">
                    Hello, World!
                </div>
            </div>
        `;
        
        consoleContent.innerHTML += `
            <div style="color: #4CAF50;">[${new Date().toLocaleTimeString()}] 代码运行成功</div>
        `;
    } catch (error) {
        consoleContent.innerHTML += `
            <div style="color: #F44336;">[${new Date().toLocaleTimeString()}] 错误: ${error.message}</div>
        `;
    }
}

// 运行代码
document.getElementById('runCode').addEventListener('click', () => {
    const editorTab = document.querySelector('.editor-tabs .tab:first-child');
    const previewTab = document.querySelector('.editor-tabs .tab:last-child');
    
    editorTab.classList.remove('active');
    previewTab.classList.add('active');
    
    document.getElementById('codeEditor').style.display = 'none';
    document.getElementById('preview').style.display = 'block';
    
    updatePreview();
});

// 重置代码
document.getElementById('resetCode').addEventListener('click', () => {
    if (confirm('确定要重置代码吗？这将丢失所有更改。')) {
        editor.setValue(practiceData[currentPracticeId].initialCode);
    }
});

// 清空控制台
document.querySelector('.btn-clear').addEventListener('click', () => {
    document.querySelector('.console-content').innerHTML = '';
});

// 刷新预览
document.querySelector('.btn-refresh').addEventListener('click', updatePreview);

// 练习题切换
document.querySelectorAll('.practice-menu a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        document.querySelectorAll('.practice-menu a').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        const practiceId = parseInt(link.dataset.id);
        loadPractice(practiceId);
    });
});

// 加载练习题
function loadPractice(id) {
    currentPracticeId = id;
    const practice = practiceData[id];
    
    // 更新标题和难度
    document.querySelector('.practice-info h2').textContent = practice.title;
    document.querySelector('.practice-info .difficulty').className = `difficulty ${practice.difficulty}`;
    
    // 更新编辑器内容
    editor.setValue(practice.initialCode);
    
    // 更新进度
    const progress = Math.round((id / Object.keys(practiceData).length) * 100);
    document.querySelector('.progress-fill').style.width = `${progress}%`;
    document.querySelector('.progress span').textContent = `完成进度：${id}/${Object.keys(practiceData).length}`;
    
    // 更新导航按钮状态
    document.querySelector('.navigation button:first-child').disabled = id === 1;
    document.querySelector('.navigation button:last-child').disabled = id === Object.keys(practiceData).length;
}

// 导航按钮事件
document.querySelector('.navigation button:first-child').addEventListener('click', () => {
    if (currentPracticeId > 1) {
        const prevLink = document.querySelector(`.practice-menu a[data-id="${currentPracticeId - 1}"]`);
        prevLink.click();
    }
});

document.querySelector('.navigation button:last-child').addEventListener('click', () => {
    if (currentPracticeId < Object.keys(practiceData).length) {
        const nextLink = document.querySelector(`.practice-menu a[data-id="${currentPracticeId + 1}"]`);
        nextLink.click();
    }
});

// 搜索功能
document.querySelector('.search-input').addEventListener('input', (e) => {
    const searchText = e.target.value.toLowerCase();
    document.querySelectorAll('.practice-menu a').forEach(link => {
        const title = link.textContent.toLowerCase();
        link.parentElement.style.display = title.includes(searchText) ? 'block' : 'none';
    });
});

// 难度筛选
document.querySelector('.difficulty-select').addEventListener('change', (e) => {
    const difficulty = e.target.value;
    document.querySelectorAll('.practice-menu a').forEach(link => {
        const difficultyClass = link.querySelector('.difficulty').className;
        link.parentElement.style.display = 
            difficulty === 'all' || difficultyClass.includes(difficulty) ? 'block' : 'none';
    });
}); 