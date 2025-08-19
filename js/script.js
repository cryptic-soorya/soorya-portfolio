$(document).ready(function() {
    // Navigation functionality
    $('.nav-link, .cta-button').click(function(e) {
        e.preventDefault();
        const target = $(this).attr('href');
        if (target && $(target).length) {
            const $heading = $(target).find('.section-title').first();
            const scrollTo = $heading.length ? $heading : $(target);
            const navHeight = $('.navbar').outerHeight() || 80;

            $('html, body').stop().animate({
                scrollTop: scrollTo.offset().top - navHeight
            }, 700, 'swing');

            $('.nav-link').removeClass('active');
            $(`.nav-link[href="${target}"]`).addClass('active');
        }
    });

    // Mobile menu toggle
    $('.hamburger').click(function() {
        $('.nav-menu').toggleClass('active');
        $(this).toggleClass('active');
    });

    $('.nav-link').click(function() {
        $('.nav-menu').removeClass('active');
        $('.hamburger').removeClass('active');
    });

    // Dynamic greeting message based on time
    function setGreeting() {
        const hour = new Date().getHours();
        let greeting = '';
        let emoji = '';
        
        if (hour < 12) {
            greeting = 'Good Morning! Ready to explore my journey?';
            emoji = '🌅';
        } else if (hour < 17) {
            greeting = 'Good Afternoon! Welcome to my portfolio.';
            emoji = '☀️';
        } else {
            greeting = 'Good Evening! Thanks for visiting my site.';
            emoji = '🌙';
        }
        
        $('.greeting-message').html(`${emoji} ${greeting}`);
    }
    
    setGreeting();

    // Intersection Observer for animations
  const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      $(entry.target).addClass('animate');
    } else {
      $(entry.target).removeClass('animate');
    }
  });
}, { threshold: 0.15 });

// Observe all animatable content sections
$('.animatable-content').each(function(){
  observer.observe(this);
});


    // Project gallery functionality (jQuery)
    $('.project-thumb').click(function() {
        const projectId = $(this).data('project');
        const currentProject = $('.project-detail.active');
        const newProject = $(`#project-${projectId}`);
        
        if (newProject.hasClass('active')) return;
        
        $('.project-thumb').removeClass('active');
        $(this).addClass('active');
        
        currentProject.removeClass('active').hide();
        newProject.addClass('active').show();
    });

    // Image slideshow for RSET activities
  $(document).ready(function() {
    let currentSlide = 0;
    const slides = $('.gallery-slide');
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.removeClass('active');
        slides.eq(index).addClass('active');
    }

    // Show first slide initially
    showSlide(currentSlide);

    $('.gallery-next').click(function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    });

    $('.gallery-prev').click(function() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    });
});


    // Auto-advance slideshow
    setInterval(function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }, 5000);

    // Load Dev.to articles (RSS Feed)
    async function loadDevToArticles() {
        try {
            $('#articles-loading').show();
            const response = await fetch('https://dev.to/api/articles?username=soorya_sijin_e059e2397daf&per_page=5');
            
            if (!response.ok) {
                throw new Error('Failed to fetch articles');
            }
            
            const articles = await response.json();
            displayArticles(articles);
        } catch (error) {
            console.error('Error loading articles:', error);
            $('#articles-loading').html('Unable to load articles. Please try again later.');
        }
    }

    function displayArticles(articles) {
        $('#articles-loading').hide();
        const articlesGrid = $('#articles-grid');
        
        articles.forEach((article, index) => {
            const articleCard = $(`
                <div class="article-card">
                    <div class="article-meta">
                        📅 ${new Date(article.published_at).toLocaleDateString()}
                    </div>
                    <h3>
                        <a href="${article.url}" target="_blank">${article.title}</a>
                    </h3>
                    <p>${article.description || 'Click to read more...'}</p>
                    <div class="article-tags">
                        ${article.tag_list.slice(0, 3).map(tag => 
                            `<span class="tag">#${tag}</span>`
                        ).join('')}
                    </div>
                </div>
            `);
            articlesGrid.append(articleCard);
        });
    }

    // Weather API functionality
    const WEATHER_API_KEY = '62ead07bd8072db51ee6c198539c7306'; 

    $('#get-weather').click(async function() {
        const city = $('#city-input').val().trim();
        if (!city) {
            alert('Please enter a city name');
            return;
        }

        try {
            $('#weather-display').html('<p>Loading weather data...</p>');
            
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
            );
            
            if (!response.ok) {
                throw new Error('Weather data not found');
            }
            
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            console.error('Weather API error:', error);
            $('#weather-display').html(`
                <div class="weather-error">
                    <p>⚠️ Unable to fetch weather data</p>
                    <p>Please check the city name and try again</p>
                    <p><small>Note: You need to add your OpenWeatherMap API key</small></p>
                </div>
            `);
        }
    });

    function displayWeather(data) {
        const weatherHtml = `
            <div class="weather-info">
                <h3>${data.name}, ${data.sys.country}</h3>
                <div class="weather-temp">${Math.round(data.main.temp)}°C</div>
                <div class="weather-desc">${data.weather[0].description}</div>
                <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" 
                     alt="${data.weather.description}" class="weather-icon">
                <div class="weather-details">
                    <p>Feels like: ${Math.round(data.main.feels_like)}°C</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Wind Speed: ${data.wind.speed} m/s</p>
                </div>
            </div>
        `;
        $('#weather-display').html(weatherHtml);
    }

    // Contact form validation
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        
        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const message = $('#message').val().trim();
        
        // Validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        if (message.length < 10) {
            alert('Please enter a message with at least 10 characters');
            return;
        }
        
        // Success message (since this is a demo)
        alert('Thank you for your message! This is a demo form. In a real application, this would send your message.');
        this.reset();
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Navbar scroll effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // Initialize
    loadDevToArticles();
});
$(document).ready(function () {
    const navbar = $('.navbar');
    const navMenu = $('.nav-menu');
    const navLinks = $('.nav-link');
    // --- 1. Animated Navbar Underline Setup ---
    let navUnderline = $('<div class="nav-underline"></div>').appendTo(navMenu);

    function updateNavUnderline($active) {
        const navOffset = navMenu.offset().left;
        const linkOffset = $active.offset().left;
        navUnderline.css({
            width: $active.outerWidth(),
            left: linkOffset - navOffset
        });
    }
    // Initial position
    updateNavUnderline($('.nav-link.active'));

    // --- 2. Section ScrollSpy logic ---
    const sectionIds = navLinks.map(function(){return $(this).attr('href');}).get();
    const sections = sectionIds.map(id => $(id)).filter(s => s.length);

    function highlightNavOnScroll() {
        let scrollPos = $(window).scrollTop() + navbar.outerHeight() + 10;
        let currentSection;
        sections.forEach((section, idx) => {
            if(section.offset().top <= scrollPos)
                currentSection = section;
        });
        if(currentSection) {
            const id = "#"+currentSection.attr('id');
            navLinks.removeClass('active');
            const $active = navLinks.filter(`[href="${id}"]`).addClass('active');
            updateNavUnderline($active);
        }
    }
    // --- 3. Section Transition / Prominent Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                $(entry.target).addClass('animate');
            }
        });
    }, { threshold: 0.16 });
    $('.animatable-content').each(function(){
        observer.observe(this);
    });
    // --- 4. Apple-style Parallax on Scroll ---
    $('[data-parallax]').each(function(){
        const sec = $(this);
        // Add a background div
        let bg = $('<div class="parallax-bg"></div>');
        sec.prepend(bg);
    });
    $(window).on('scroll', function() {
        // Nav underline/scrollspy
        highlightNavOnScroll();

        // Apple style parallax
        $('[data-parallax]').each(function() {
            let $this = $(this);
            let bg = $this.find('.parallax-bg');
            let st = window.scrollY, et = $this.offset().top;
            let diff = (et-st) / $(window).height();
            // between -1.5 ... +1
            bg.css({
                transform: `translateY(${diff*30}px) scale(${1+0.05*Math.max(-diff,0)})`
            });
        });
    });
    // On nav click, scroll to heading
$('.nav-link, .cta-button').on('click', function(e) {
  e.preventDefault();

  let target = $(this).attr('href');
  if (!target || !$(target).length) return;

  // Activate overlay
  $('#transition-overlay').addClass('active');

  // Wait for fade-in (600ms), then scroll and fade out overlay
  setTimeout(() => {
    const navbarHeight = $('.navbar').outerHeight() || 80;
    const $heading = $(target).find('.section-title').first();
    const pos = $heading.length ? $heading.offset().top : $(target).offset().top;
    
    $('html, body').stop().animate({
      scrollTop: pos - navbarHeight
    }, 600, 'swing', () => {
      // Deactivate overlay after scroll completes
      $('#transition-overlay').removeClass('active');
    });

    // Update nav active state immediately for user feedback
    $('.nav-link').removeClass('active');
    $(`.nav-link[href="${target}"]`).addClass('active');
  }, 100);
});



    // CV Download Handler (optional, for analytics/UX)
    $('.download-btn[download]').on('click', function(){
        // If you want to log/track or animate, do here!
    });

    // Other scripts (greeting, gallery, articles, weather, etc.) remain as before

    // Initial call for scrollspy and parallax
    highlightNavOnScroll();
    $(window).trigger('scroll');
});
$('.section-title').each(function(){
  observer.observe(this);
});
// Find all major section IDs in your nav
const sectionNavIds = $('.nav-link').map(function() {
  return $(this).attr('href');
}).get();

// Keep track of last section to spot new transitions
let lastActiveSection = sectionNavIds[0];

function triggerSpotlight() {
  const $spot = $('#section-spotlight');
  $spot.addClass('flash active');
  setTimeout(() => {
    $spot.removeClass('active');
  }, 700);
  setTimeout(() => {
    $spot.removeClass('flash');
  }, 950);
}

// On navigation click: always trigger spotlight
$('.nav-link, .cta-button').on('click', function(e) {
  e.preventDefault();
  const target = $(this).attr('href');
  if (!target || !$(target).length) return;

  // Only trigger on section change (not repeated on same section)
  if(target !== lastActiveSection) {
    triggerSpotlight();
    lastActiveSection = target;
  }
  // Smooth scroll to heading as before
  const navbarHeight = $('.navbar').outerHeight() || 80;
  const $heading = $(target).find('.section-title').first();
  const pos = $heading.length ? $heading.offset().top : $(target).offset().top;
  $('html, body').stop(true).animate({
    scrollTop: pos - navbarHeight
  }, 650, 'swing');
  // Update nav states as before
  $('.nav-link').removeClass('active');
  $(`.nav-link[href="${target}"]`).addClass('active');
});

// Scrollspy scroll-activated spotlight
let lastScrollSection = '';
$(window).on('scroll', function() {
  let scrollPos = $(window).scrollTop() + $('.navbar').outerHeight() + 10;
  for(const id of sectionNavIds) {
    if($(id).length && $(id).offset().top <= scrollPos) {
      if(lastScrollSection !== id) {
        triggerSpotlight();
        lastScrollSection = id;
      }
    }
  }
});
function loadDevToArticles() {
    $('#articles-loading').show();
    $('#articles-grid').empty();

    // Replace 'yourusername' with your actual Dev.to username!
    fetch('https://dev.to/soorya_sijin_e059e2397daf')
      .then(res => res.json())
      .then(articles => {
        $('#articles-loading').hide();
        if (!articles || !articles.length) {
            $('#articles-grid').html('<p>No articles found.</p>');
            return;
        }
        articles.forEach(article => {
            $('#articles-grid').append(`
                <div class="article-card">
                    <div class="article-meta">
                      📅 ${new Date(article.published_at).toLocaleDateString()}
                    </div>
                    <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
                    <p>${article.description ? article.description : ''}</p>
                    <div class="article-tags">
                        ${(article.tag_list||[]).slice(0,3).map(tag => `<span class="tag">#${tag}</span>`).join('')}
                    </div>
                </div>
            `);
        });
      })
      .catch(err => {
        $('#articles-loading').hide();
        $('#articles-grid').html('<p>Could not load articles. Try again later.</p>');
      });
}

// This should be called on page load (usually inside your $(document).ready)
$(document).ready(function() {
    loadDevToArticles();
});

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu and body scroll
    const toggleMenu = () => {
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    };

    hamburger.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
});