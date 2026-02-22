// ========== ПРЕЛОАДЕР ==========
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.loader').classList.add('fade-out');
    }, 500);
});

// ========== ТЕМА (СВЕТЛАЯ/ТЕМНАЯ) ==========
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Загружаем сохраненную тему
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark');
    themeToggle.textContent = '☀️';
} else {
    themeToggle.textContent = '🌙';
}

// Переключение темы
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    
    if (body.classList.contains('dark')) {
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
    
    // Анимация переключения
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
});

// ========== ПЛАВНАЯ ПРОКРУТКА ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Обновляем URL без перезагрузки
            history.pushState(null, null, targetId);
        }
    });
});

// ========== АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ СКРОЛЛЕ ==========
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            if (entry.target.classList.contains('card')) {
                entry.target.classList.add('animated');
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .download-card, .author-card, .donate-card, .github-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========== ПАРАЛЛАКС ЭФФЕКТ ==========
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX / window.innerWidth - 0.5) * 20;
    const moveY = (e.clientY / window.innerHeight - 0.5) * 20;
    
    const platforms = document.querySelector('.platforms');
    if (platforms) {
        platforms.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
    
    const donateIcon = document.querySelector('.donate-icon');
    if (donateIcon) {
        donateIcon.style.transform = `translate(${moveX/2}px, ${moveY/2}px)`;
    }
});

// ========== АНИМАЦИЯ ДЛЯ ИКОНОК ПЛАТФОРМ ==========
const platformIcons = document.querySelectorAll('.platforms i');
platformIcons.forEach((icon) => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.2) rotate(5deg)';
        icon.style.transition = 'transform 0.3s';
    });
    
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// ========== ПОДДЕРЖКА DONATIONALERTS ==========
let donateStats = {
    clicks: parseInt(localStorage.getItem('donateClicks')) || 0,
    totalAmount: parseInt(localStorage.getItem('donateTotal')) || 0
};

const daBtn = document.querySelector('.da-btn');
if (daBtn) {
    setInterval(() => {
        daBtn.style.transform = 'scale(1.05)';
        daBtn.style.boxShadow = '0 10px 25px rgba(255, 77, 77, 0.4)';
        
        setTimeout(() => {
            daBtn.style.transform = 'scale(1)';
            daBtn.style.boxShadow = '0 5px 15px rgba(255, 77, 77, 0.3)';
        }, 200);
    }, 3000);
    
    daBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        donateStats.clicks++;
        localStorage.setItem('donateClicks', donateStats.clicks);
        
        showDonateNotification('Спасибо за интерес к проекту! ❤️');
        
        setTimeout(() => {
            window.open('https://www.donationalerts.com/r/gr33nyea_the_builder', '_blank');
        }, 500);
    });
}

document.querySelectorAll('.quick-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const amount = btn.textContent.replace('₽', '').trim();
        
        donateStats.totalAmount += parseInt(amount);
        localStorage.setItem('donateTotal', donateStats.totalAmount);
        
        showDonateNotification(`Спасибо за поддержку ${amount}₽! ❤️`);
        
        setTimeout(() => {
            window.open('https://www.donationalerts.com/r/gr33nyea_the_builder', '_blank');
        }, 500);
    });
});

function showDonateNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'donate-notification';
    notification.innerHTML = `
        <i class="fas fa-heart" style="color: #ff4d4d; margin-right: 10px;"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ========== СЧЕТЧИК СКАЧИВАНИЙ ==========
let downloadCount = parseInt(localStorage.getItem('downloadCount')) || 0;

document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (!confirm('Скачать файл?')) {
            e.preventDefault();
            return;
        }
        
        downloadCount++;
        localStorage.setItem('downloadCount', downloadCount);
        
        showDonateNotification(`Скачивание #${downloadCount}! Спасибо!`);
    });
});

// ========== АНИМАЦИЯ ДЛЯ КАРТОЧЕК ==========
document.querySelectorAll('.card, .github-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('i');
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(5deg)';
            icon.style.transition = 'transform 0.3s';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('i');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// ========== АНИМАЦИЯ ДЛЯ DONATE ИКОНКИ ==========
const donateIcon = document.querySelector('.donate-icon');
if (donateIcon) {
    setInterval(() => {
        const heart = document.createElement('i');
        heart.className = 'fas fa-heart';
        heart.style.cssText = `
            position: absolute;
            color: #ff4d4d;
            font-size: ${Math.random() * 20 + 10}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: 0;
            animation: floatHeart ${Math.random() * 3 + 2}s ease-out;
            pointer-events: none;
        `;
        
        donateIcon.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 3000);
    }, 1000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes floatHeart {
        0% {
            transform: translateY(0) scale(1);
            opacity: 0.8;
        }
        100% {
            transform: translateY(-100px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========== АКТИВНЫЙ ПУНКТ МЕНЮ ==========
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========== КНОПКА НАВЕРХ ==========
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'scale(1.1)';
    scrollTopBtn.style.background = 'var(--dark-green)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'scale(1)';
    scrollTopBtn.style.background = 'var(--green)';
});

// ========== ИНИЦИАЛИЗАЦИЯ ==========
console.log('✅ Сайт Рисовалка Pro загружен!');
console.log('❤️ От Gr33nYea');
console.log('💰 DonationAlerts: https://www.donationalerts.com/r/gr33nyea_the_builder');
console.log('🐙 GitHub: https://github.com/Gr33nYea-official/Gr33Yea-official.github.io');
