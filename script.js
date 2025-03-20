// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Show loading animation
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        submitButton.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            console.log('Form submitted:', formObject);
            submitButton.innerHTML = '<i class="fas fa-check"></i> تم الإرسال!';
            this.reset();
            
            // Reset button after 2 seconds
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        }, 1500);
    });
}

// Scroll to top button with matrix effect
const scrollButton = document.createElement('button');
scrollButton.innerHTML = '↑';
scrollButton.className = 'scroll-top';
document.body.appendChild(scrollButton);

// Matrix rain effect for the scroll button
const matrixChars = '01';
let matrixInterval;

scrollButton.addEventListener('mouseenter', () => {
    matrixInterval = setInterval(() => {
        scrollButton.innerHTML = matrixChars[Math.floor(Math.random() * matrixChars.length)];
    }, 100);
});

scrollButton.addEventListener('mouseleave', () => {
    clearInterval(matrixInterval);
    scrollButton.innerHTML = '↑';
});

scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Show/hide scroll button based on scroll position
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollButton.style.display = 'block';
        setTimeout(() => {
            scrollButton.style.opacity = '1';
        }, 10);
    } else {
        scrollButton.style.opacity = '0';
        setTimeout(() => {
            scrollButton.style.display = 'none';
        }, 300);
    }
});

// Add some CSS for the scroll button
const style = document.createElement('style');
style.textContent = `
    .scroll-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--primary-color);
        color: var(--secondary-color);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 2px solid var(--secondary-color);
        cursor: pointer;
        display: none;
        font-size: 20px;
        box-shadow: 0 0 10px var(--secondary-color);
        z-index: 1000;
        transition: all 0.3s ease;
        opacity: 0;
    }
    
    .scroll-top:hover {
        background-color: var(--secondary-color);
        color: var(--primary-color);
        box-shadow: 0 0 20px var(--secondary-color);
        transform: scale(1.1);
    }
`;
document.head.appendChild(style);

// Add animation to service cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            // Add matrix effect on hover
            entry.target.addEventListener('mouseenter', () => {
                const originalText = entry.target.querySelector('h3').textContent;
                let matrixInterval = setInterval(() => {
                    entry.target.querySelector('h3').textContent = 
                        Array(originalText.length).fill().map(() => 
                            matrixChars[Math.floor(Math.random() * matrixChars.length)]
                        ).join('');
                }, 100);
                
                entry.target.addEventListener('mouseleave', () => {
                    clearInterval(matrixInterval);
                    entry.target.querySelector('h3').textContent = originalText;
                });
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Add typing effect to hero text
const heroText = document.querySelector('.hero h1');
if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            heroText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    typeWriter();
}

// Add glitch effect to logo
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('mouseenter', () => {
        const originalText = logo.textContent;
        let glitchInterval = setInterval(() => {
            logo.textContent = originalText
                .split('')
                .map(char => Math.random() > 0.9 ? matrixChars[Math.floor(Math.random() * matrixChars.length)] : char)
                .join('');
        }, 50);
        
        logo.addEventListener('mouseleave', () => {
            clearInterval(glitchInterval);
            logo.textContent = originalText;
        });
    });
}

// Tools Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Category Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const toolItems = document.querySelectorAll('.tool-item');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.getAttribute('data-category');

            // Show/hide tool items based on category
            toolItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Tool Item Hover Effect
    toolItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const header = item.querySelector('.tool-header');
            header.style.background = 'var(--secondary-color)';
            header.querySelector('i').style.color = 'var(--primary-color)';
            header.querySelector('h3').style.color = 'var(--primary-color)';
        });

        item.addEventListener('mouseleave', () => {
            const header = item.querySelector('.tool-header');
            header.style.background = 'var(--light-bg)';
            header.querySelector('i').style.color = 'var(--secondary-color)';
            header.querySelector('h3').style.color = 'var(--secondary-color)';
        });
    });

    // Code Block Copy Button
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-btn';
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        copyButton.title = 'نسخ الكود';
        
        block.parentNode.style.position = 'relative';
        block.parentNode.appendChild(copyButton);

        copyButton.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(block.textContent);
                copyButton.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            } catch (err) {
                console.error('فشل نسخ الكود:', err);
            }
        });
    });
});

// Tutorials Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Tutorial Card Hover Effect
    const tutorialCards = document.querySelectorAll('.tutorial-card');
    
    tutorialCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const header = card.querySelector('.tutorial-header');
            header.style.background = 'var(--secondary-color)';
            header.querySelector('i').style.color = 'var(--primary-color)';
            header.querySelector('h3').style.color = 'var(--primary-color)';
        });

        card.addEventListener('mouseleave', () => {
            const header = card.querySelector('.tutorial-header');
            header.style.background = 'var(--light-bg)';
            header.querySelector('i').style.color = 'var(--secondary-color)';
            header.querySelector('h3').style.color = 'var(--secondary-color)';
        });
    });

    // Tutorial Button Click Effect
    const tutorialButtons = document.querySelectorAll('.tutorial-btn');
    
    tutorialButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const tutorialTitle = button.closest('.tutorial-card').querySelector('h3').textContent;
            
            // Create loading effect
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحميل...';
            button.style.pointerEvents = 'none';
            
            // Simulate loading
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-check"></i> تم التحميل';
                setTimeout(() => {
                    button.innerHTML = 'ابدأ التعلم';
                    button.style.pointerEvents = 'auto';
                }, 2000);
            }, 1500);
        });
    });

    // Animate tutorial cards on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    tutorialCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });
});

// Course Details Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Curriculum Item Toggle
    const curriculumItems = document.querySelectorAll('.curriculum-item');
    
    curriculumItems.forEach(item => {
        const header = item.querySelector('.curriculum-header');
        const content = item.querySelector('.curriculum-content');
        
        header.addEventListener('click', () => {
            const isOpen = content.style.maxHeight !== '0px';
            
            // Close all other items
            curriculumItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.curriculum-content').style.maxHeight = '0px';
                    otherItem.querySelector('.curriculum-header').classList.remove('active');
                }
            });
            
            // Toggle current item
            content.style.maxHeight = isOpen ? '0px' : content.scrollHeight + 'px';
            header.classList.toggle('active');
        });
    });

    // Enroll Button Click Effect
    const enrollBtn = document.querySelector('.enroll-btn');
    if (enrollBtn) {
        enrollBtn.addEventListener('click', () => {
            // Create loading effect
            enrollBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التسجيل...';
            enrollBtn.style.pointerEvents = 'none';
            
            // Simulate enrollment process
            setTimeout(() => {
                enrollBtn.innerHTML = '<i class="fas fa-check"></i> تم التسجيل بنجاح';
                setTimeout(() => {
                    enrollBtn.innerHTML = 'سجل الآن';
                    enrollBtn.style.pointerEvents = 'auto';
                }, 2000);
            }, 1500);
        });
    }

    // Animate course sections on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    const courseSections = document.querySelectorAll('.course-description, .course-objectives, .curriculum-item, .course-card');
    
    courseSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.5s ease';
        observer.observe(section);
    });
});

// Course Content Update Function
function updateCourseContent(courseId) {
    const courses = {
        'beginner': {
            title: 'دورة المبتدئين في Kali Linux',
            description: 'تعلم أساسيات الاختراق الأخلاقي من الصفر',
            duration: '20 ساعة',
            lessons: '15 درس',
            level: 'مبتدئ',
            objectives: [
                'فهم أساسيات نظام Kali Linux',
                'تعلم استخدام أدوات المسح الأساسية',
                'فهم مبادئ اختراق الشبكات',
                'تطبيق المعرفة في بيئة آمنة'
            ],
            curriculum: [
                {
                    title: 'الوحدة الأولى: مقدمة في Kali Linux',
                    duration: '2 ساعة',
                    lessons: [
                        'تثبيت Kali Linux',
                        'واجهة المستخدم الأساسية',
                        'الأوامر الأساسية',
                        'إدارة الحزم'
                    ]
                },
                {
                    title: 'الوحدة الثانية: أدوات المسح',
                    duration: '3 ساعة',
                    lessons: [
                        'Nmap الأساسي',
                        'تحليل الشبكات',
                        'فحص الثغرات',
                        'تقرير النتائج'
                    ]
                },
                {
                    title: 'الوحدة الثالثة: اختراق الشبكات',
                    duration: '4 ساعة',
                    lessons: [
                        'تحليل الحزم',
                        'هجمات الشبكات',
                        'حماية الشبكات',
                        'أفضل الممارسات'
                    ]
                }
            ]
        },
        'networking': {
            title: 'دورة الشبكات المتقدمة',
            description: 'تعمق في عالم اختراق الشبكات',
            duration: '25 ساعة',
            lessons: '18 درس',
            level: 'متقدم',
            objectives: [
                'فهم بروتوكولات الشبكات',
                'تحليل الشبكات المتقدم',
                'اختراق الشبكات اللاسلكية',
                'تأمين الشبكات'
            ],
            curriculum: [
                {
                    title: 'الوحدة الأولى: بروتوكولات الشبكات',
                    duration: '3 ساعة',
                    lessons: [
                        'TCP/IP',
                        'DNS',
                        'DHCP',
                        'HTTP/HTTPS'
                    ]
                },
                {
                    title: 'الوحدة الثانية: تحليل الشبكات',
                    duration: '4 ساعة',
                    lessons: [
                        'تحليل الحزم المتقدم',
                        'تحليل حركة الشبكة',
                        'تحليل الأداء',
                        'تحليل الأمان'
                    ]
                },
                {
                    title: 'الوحدة الثالثة: الشبكات اللاسلكية',
                    duration: '5 ساعة',
                    lessons: [
                        'بروتوكولات الشبكات اللاسلكية',
                        'تحليل الشبكات اللاسلكية',
                        'اختراق الشبكات اللاسلكية',
                        'حماية الشبكات اللاسلكية'
                    ]
                }
            ]
        },
        'web': {
            title: 'دورة اختراق الويب',
            description: 'تعلم اختراق تطبيقات الويب',
            duration: '30 ساعة',
            lessons: '20 درس',
            level: 'متوسط',
            objectives: [
                'فهم ثغرات الويب الشائعة',
                'تعلم أدوات اختبار اختراق الويب',
                'تحليل تطبيقات الويب',
                'تأمين تطبيقات الويب'
            ],
            curriculum: [
                {
                    title: 'الوحدة الأولى: أساسيات اختراق الويب',
                    duration: '3 ساعة',
                    lessons: [
                        'مقدمة في اختراق الويب',
                        'أدوات اختبار اختراق الويب',
                        'تحليل تطبيقات الويب',
                        'تحديد نقاط الضعف'
                    ]
                },
                {
                    title: 'الوحدة الثانية: ثغرات OWASP Top 10',
                    duration: '5 ساعة',
                    lessons: [
                        'حقن SQL',
                        'XSS',
                        'CSRF',
                        'تخزين البيانات غير الآمن'
                    ]
                },
                {
                    title: 'الوحدة الثالثة: تأمين الويب',
                    duration: '4 ساعة',
                    lessons: [
                        'تأمين التطبيقات',
                        'تشفير البيانات',
                        'إدارة الجلسات',
                        'أفضل الممارسات'
                    ]
                }
            ]
        },
        'forensics': {
            title: 'دورة التحليل الجنائي',
            description: 'تعلم تقنيات التحليل الجنائي الرقمي',
            duration: '35 ساعة',
            lessons: '22 درس',
            level: 'متقدم',
            objectives: [
                'فهم أساسيات التحليل الجنائي',
                'تعلم أدوات التحليل الجنائي',
                'تحليل الذاكرة والقرص',
                'استخراج وتحليل البيانات'
            ],
            curriculum: [
                {
                    title: 'الوحدة الأولى: أساسيات التحليل الجنائي',
                    duration: '3 ساعة',
                    lessons: [
                        'مقدمة في التحليل الجنائي',
                        'أدوات التحليل الجنائي',
                        'جمع الأدلة',
                        'توثيق النتائج'
                    ]
                },
                {
                    title: 'الوحدة الثانية: تحليل الذاكرة',
                    duration: '5 ساعة',
                    lessons: [
                        'تحليل الذاكرة الأساسي',
                        'تحليل العمليات',
                        'تحليل الشبكات',
                        'تحليل الملفات'
                    ]
                },
                {
                    title: 'الوحدة الثالثة: تحليل القرص',
                    duration: '6 ساعة',
                    lessons: [
                        'تحليل القرص الصلب',
                        'استخراج البيانات',
                        'تحليل الملفات المحذوفة',
                        'تحليل السجلات'
                    ]
                }
            ]
        }
    };

    const course = courses[courseId];
    if (!course) return;

    // Update course title and description
    document.querySelector('.course-hero h1').textContent = course.title;
    document.querySelector('.course-hero p').textContent = course.description;

    // Update course meta information
    document.querySelector('.course-meta span:nth-child(1)').innerHTML = `<i class="fas fa-clock"></i> ${course.duration}`;
    document.querySelector('.course-meta span:nth-child(2)').innerHTML = `<i class="fas fa-book"></i> ${course.lessons}`;
    document.querySelector('.course-meta span:nth-child(3)').innerHTML = `<i class="fas fa-user-graduate"></i> ${course.level}`;

    // Update course description
    document.querySelector('.course-description p').textContent = course.description;

    // Update course objectives
    const objectivesList = document.querySelector('.course-objectives ul');
    objectivesList.innerHTML = course.objectives.map(objective => 
        `<li>${objective}</li>`
    ).join('');

    // Update course curriculum
    const curriculumContainer = document.querySelector('.course-curriculum');
    curriculumContainer.innerHTML = `
        <h2>منهج الدورة</h2>
        ${course.curriculum.map(unit => `
            <div class="curriculum-item">
                <div class="curriculum-header">
                    <h3>${unit.title}</h3>
                    <span class="duration">${unit.duration}</span>
                </div>
                <div class="curriculum-content">
                    <ul>
                        ${unit.lessons.map(lesson => `<li>${lesson}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `).join('')}
    `;

    // Update course sidebar
    document.querySelector('.course-card:first-child ul').innerHTML = `
        <li><i class="fas fa-calendar"></i> تاريخ البداية: 1 يناير 2024</li>
        <li><i class="fas fa-clock"></i> المدة: ${course.duration}</li>
        <li><i class="fas fa-book"></i> عدد الدروس: ${course.lessons}</li>
        <li><i class="fas fa-user-graduate"></i> المستوى: ${course.level}</li>
    `;
}

// Update page title based on course
function updatePageTitle(courseId) {
    const courses = {
        'beginner': 'دورة المبتدئين في Kali Linux',
        'networking': 'دورة الشبكات المتقدمة',
        'web': 'دورة اختراق الويب',
        'forensics': 'دورة التحليل الجنائي'
    };

    const courseTitle = courses[courseId] || 'دورة Kali Linux';
    document.title = `${courseTitle} - تعلم الاختراق الأخلاقي`;
}

// Check if we're on the course details page
if (document.querySelector('.course-hero')) {
    // Get course ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('course') || 'beginner';
    
    // Update course content and page title
    updateCourseContent(courseId);
    updatePageTitle(courseId);
}

// Update active navigation link
function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    updateActiveNavLink();
});

// Update page title on scroll
function updateTitleOnScroll() {
    const sections = document.querySelectorAll('section');
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            const sectionTitle = section.querySelector('h1, h2');
            if (sectionTitle) {
                currentSection = sectionTitle.textContent;
            }
        }
    });
    
    if (currentSection) {
        document.title = `${currentSection} - Kali Linux`;
    }
}

// Add scroll event listener
window.addEventListener('scroll', updateTitleOnScroll);

// Create and update progress bar
function createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    createProgressBar();
});

// Add image animation effects
function addImageAnimations() {
    const images = document.querySelectorAll('img');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transform = 'scale(0.8)';
        img.style.transition = 'all 0.5s ease';
        observer.observe(img);
    });
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    addImageAnimations();
});

// Add text animation effects
function addTextAnimations() {
    const headings = document.querySelectorAll('h1, h2, h3');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    headings.forEach(heading => {
        heading.style.opacity = '0';
        heading.style.transform = 'translateY(20px)';
        heading.style.transition = 'all 0.5s ease';
        observer.observe(heading);
    });
}

// Add button animation effects
function addButtonAnimations() {
    const buttons = document.querySelectorAll('button, .btn');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    buttons.forEach(button => {
        button.style.opacity = '0';
        button.style.transform = 'scale(0.8)';
        button.style.transition = 'all 0.5s ease';
        observer.observe(button);
    });
}

// Add card animation effects
function addCardAnimations() {
    const cards = document.querySelectorAll('.card, .service-card, .tool-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) rotate(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) rotate(5deg)';
        card.style.transition = 'all 0.7s ease';
        observer.observe(card);
    });
}

// Call the functions when the page loads
document.addEventListener('DOMContentLoaded', function() {
    addTextAnimations();
    addButtonAnimations();
    addCardAnimations();
});

// Hacker Effect Function
function startHackerEffect() {
    // Create matrix rain effect
    const matrixRain = document.createElement('div');
    matrixRain.className = 'matrix-rain';
    document.body.appendChild(matrixRain);

    // Create canvas for matrix effect
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    matrixRain.appendChild(canvas);

    // Matrix rain animation
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    const columns = canvas.width/fontSize;

    const rainDrops = [];

    for( let x = 0; x < columns; x++ ) {
        rainDrops[x] = 1;
    }

    const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';

        for(let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i*fontSize, rainDrops[i]*fontSize);

            if(rainDrops[i]*fontSize > canvas.height && Math.random() > 0.975){
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    };

    // Start animation
    const interval = setInterval(draw, 30);

    // After 3 seconds, redirect to tutorials page
    setTimeout(() => {
        clearInterval(interval);
        window.location.href = 'tutorials.html';
    }, 3000);
}

// Remove authentication functions
function checkAuthentication() {
    // No authentication required
}

function logout() {
    // No logout needed
}

// Remove logout button from navigation
function addLogoutButton() {
    // No logout button needed
}

// Check authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    // No authentication check needed
});

// Loading Screen Function
function showLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    const siteContent = document.querySelector('.site-content');
    let progress = 0;

    // Show loading screen and hide site content initially
    loadingScreen.style.display = 'flex';
    loadingScreen.style.opacity = '1';
    siteContent.style.display = 'none';

    // Update progress bar slower
    const progressInterval = setInterval(() => {
        progress += 0.5; // Slower progress increment
        loadingProgress.style.width = `${progress}%`;

        if (progress >= 100) {
            clearInterval(progressInterval);
            // Hide loading screen and show site content
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    siteContent.style.display = 'block';
                }, 500);
            }, 1000);
        }
    }, 50); // Longer interval between updates
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    showLoadingScreen();
});

// دالة مشاركة الموقع
function shareWebsite() {
    // إنشاء عنصر نص مؤقت
    const tempInput = document.createElement('input');
    tempInput.value = 'لتشغيل الموقع:\n1. افتح الملف index.html في المتصفح';
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    // إظهار رسالة نجاح
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = 'تم نسخ التعليمات!';
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.display = 'none';
    }, 2000);
} 