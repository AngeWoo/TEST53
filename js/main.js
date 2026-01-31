// ChaPond 茶加焙 - 主JavaScript文件

document.addEventListener('DOMContentLoaded', function() {
    // 隐藏加载动画
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500);
    }

    // 汉堡菜单切换
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // 移动端下拉菜单
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        if (window.innerWidth <= 768) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        }
    });

    // 主视觉轮播
    const heroSlides = document.querySelectorAll('.hero-slide');
    const sliderDots = document.querySelectorAll('.slider-nav .slider-dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        heroSlides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (sliderDots[i]) {
                sliderDots[i].classList.remove('active');
            }
        });

        if (heroSlides[index]) {
            heroSlides[index].classList.add('active');
        }
        if (sliderDots[index]) {
            sliderDots[index].classList.add('active');
        }
        currentSlide = index;
    }

    function nextSlide() {
        let next = currentSlide + 1;
        if (next >= heroSlides.length) next = 0;
        showSlide(next);
    }

    // 自动轮播
    if (heroSlides.length > 1) {
        slideInterval = setInterval(nextSlide, 5000);

        // 点击切换
        sliderDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(slideInterval);
                showSlide(index);
                slideInterval = setInterval(nextSlide, 5000);
            });
        });
    }

    // 新闻轮播
    const newsTrack = document.getElementById('newsTrack');
    const newsPrev = document.getElementById('newsPrev');
    const newsNext = document.getElementById('newsNext');
    let newsPosition = 0;

    if (newsTrack && newsPrev && newsNext) {
        const newsCards = newsTrack.querySelectorAll('.news-card');
        const cardWidth = newsCards[0] ? newsCards[0].offsetWidth + 20 : 0;
        const maxPosition = Math.max(0, (newsCards.length - 3) * cardWidth);

        newsNext.addEventListener('click', () => {
            newsPosition = Math.min(newsPosition + cardWidth, maxPosition);
            newsTrack.style.transform = `translateX(-${newsPosition}px)`;
        });

        newsPrev.addEventListener('click', () => {
            newsPosition = Math.max(newsPosition - cardWidth, 0);
            newsTrack.style.transform = `translateX(-${newsPosition}px)`;
        });
    }

    // 滚动时导航栏效果
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }

        lastScroll = currentScroll;
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 表单验证
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            let isValid = true;
            let errorMessages = [];

            // 检查必填字段
            const requiredFields = this.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ff4444';
                    errorMessages.push(`${field.name || 'Field'} is required`);
                } else {
                    field.style.borderColor = '#e0e0e0';
                }
            });

            // 验证邮箱格式
            const emailField = this.querySelector('input[type="email"]');
            if (emailField && emailField.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailField.value)) {
                    isValid = false;
                    emailField.style.borderColor = '#ff4444';
                    errorMessages.push('Please enter a valid email address');
                }
            }

            if (isValid) {
                // 模拟表单提交成功
                alert('Thank you for your message! We will contact you soon.');
                this.reset();
            } else {
                alert('Please fill in all required fields correctly:\n' + errorMessages.join('\n'));
            }
        });
    }

    // 搜索功能
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
        const searchInput = searchBox.querySelector('input');
        const searchButton = searchBox.querySelector('button');

        searchButton.addEventListener('click', (e) => {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                // 实际项目中可以跳转到搜索结果页
                alert(`Searching for: ${query}`);
            }
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchButton.click();
            }
        });
    }

    // 语言选择器
    const languageSelector = document.getElementById('language');
    if (languageSelector) {
        languageSelector.addEventListener('change', function() {
            const lang = this.value;
            // 实际项目中可以实现多语言切换
            console.log(`Language changed to: ${lang}`);
        });
    }

    // 产品卡片悬停效果增强
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // 滚动动画 - 元素进入视口时添加动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 为需要动画的元素添加初始样式和观察
    const animatedElements = document.querySelectorAll('.product-card, .news-card, .service-card, .feature-item');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // 响应式调整
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // 关闭移动端菜单
            if (window.innerWidth > 768 && navMenu) {
                navMenu.classList.remove('active');
            }
        }, 250);
    });
});

// 回到顶部功能（可选）
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
