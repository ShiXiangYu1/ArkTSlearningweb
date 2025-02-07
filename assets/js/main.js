// 主题切换功能
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // 检查本地存储中的主题设置
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.body.setAttribute('data-theme', currentTheme);
        updateThemeIcon(currentTheme);
    } else if (prefersDarkScheme.matches) {
        document.body.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
    }
    
    // 主题切换按钮点击事件
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    // 更新主题图标
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fa fa-sun-o' : 'fa fa-moon-o';
    }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 导航栏滚动效果
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > lastScrollTop) {
        // 向下滚动
        header.style.transform = 'translateY(-100%)';
    } else {
        // 向上滚动
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}, { passive: true });

// 添加页面加载动画
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// 响应式导航菜单
const createMobileMenu = () => {
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelector('.nav-links');
    
    // 创建汉堡菜单按钮
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-button';
    menuButton.innerHTML = '<i class="fa fa-bars"></i>';
    
    // 在小屏幕下显示汉堡菜单
    if (window.innerWidth <= 768) {
        nav.insertBefore(menuButton, navLinks);
        
        menuButton.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            menuButton.querySelector('i').className = 
                navLinks.classList.contains('show') ? 'fa fa-times' : 'fa fa-bars';
        });
        
        // 点击链接后关闭菜单
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('show');
                menuButton.querySelector('i').className = 'fa fa-bars';
            });
        });
    }
};

// 监听窗口大小变化
window.addEventListener('resize', createMobileMenu);
createMobileMenu(); 