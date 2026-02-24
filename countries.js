// Country data with flags and committee assignments
const countries = [
    { name: "United States", flag: "🇺🇸", committees: ["UNSC", "DISEC", "WHO"] },
    { name: "United Kingdom", flag: "🇬🇧", committees: ["UNSC", "UNHRC", "DISEC"] },
    { name: "China", flag: "🇨🇳", committees: ["UNSC", "DISEC", "WHO"] },
    { name: "Russia", flag: "🇷🇺", committees: ["UNSC", "DISEC", "UNODC"] },
    { name: "France", flag: "🇫🇷", committees: ["UNSC", "UNHRC", "UNEP"] },
    { name: "Germany", flag: "🇩🇪", committees: ["UNHRC", "UNEP", "WHO"] },
    { name: "Japan", flag: "🇯🇵", committees: ["DISEC", "WHO", "UNEP"] },
    { name: "India", flag: "🇮🇳", committees: ["UNHRC", "UNEP", "WHO"] },
    { name: "Brazil", flag: "🇧🇷", committees: ["UNEP", "UNHRC", "UNODC"] },
    { name: "Canada", flag: "🇨🇦", committees: ["UNHRC", "UNEP", "WHO"] },
    { name: "Australia", flag: "🇦🇺", committees: ["UNEP", "DISEC", "WHO"] },
    { name: "South Africa", flag: "🇿🇦", committees: ["UNHRC", "UNEP", "UNODC"] },
    { name: "Mexico", flag: "🇲🇽", committees: ["UNHRC", "UNODC", "WHO"] },
    { name: "Italy", flag: "🇮🇹", committees: ["UNHRC", "WHO", "UNEP"] },
    { name: "Spain", flag: "🇪🇸", committees: ["UNHRC", "UNEP", "UNODC"] },
    { name: "South Korea", flag: "🇰🇷", committees: ["DISEC", "WHO", "UNEP"] },
    { name: "Turkey", flag: "🇹🇷", committees: ["UNHRC", "UNODC", "WHO"] },
    { name: "Saudi Arabia", flag: "🇸🇦", committees: ["DISEC", "UNEP", "UNODC"] },
    { name: "Argentina", flag: "🇦🇷", committees: ["UNHRC", "UNEP", "UNODC"] },
    { name: "Indonesia", flag: "🇮🇩", committees: ["UNHRC", "UNEP", "WHO"] },
    { name: "Netherlands", flag: "🇳🇱", committees: ["UNHRC", "DISEC", "WHO"] },
    { name: "Sweden", flag: "🇸🇪", committees: ["UNHRC", "UNEP", "WHO"] },
    { name: "Norway", flag: "🇳🇴", committees: ["UNHRC", "UNEP", "DISEC"] },
    { name: "Egypt", flag: "🇪🇬", committees: ["UNHRC", "UNODC", "WHO"] },
    { name: "Pakistan", flag: "🇵🇰", committees: ["UNHRC", "DISEC", "UNODC"] },
    { name: "Bangladesh", flag: "🇧🇩", committees: ["UNHRC", "UNEP", "WHO"] },
    { name: "Nigeria", flag: "🇳🇬", committees: ["UNHRC", "UNODC", "WHO"] },
    { name: "Israel", flag: "🇮🇱", committees: ["DISEC", "WHO", "UNHRC"] },
    { name: "Singapore", flag: "🇸🇬", committees: ["DISEC", "WHO", "UNEP"] },
    { name: "Malaysia", flag: "🇲🇾", committees: ["UNHRC", "UNEP", "UNODC"] },
    { name: "Thailand", flag: "🇹🇭", committees: ["UNHRC", "WHO", "UNODC"] },
    { name: "Vietnam", flag: "🇻🇳", committees: ["UNHRC", "UNEP", "WHO"] },
    { name: "Philippines", flag: "🇵🇭", committees: ["UNHRC", "WHO", "UNODC"] },
    { name: "Iran", flag: "🇮🇷", committees: ["DISEC", "UNODC", "UNHRC"] },
    { name: "Iraq", flag: "🇮🇶", committees: ["UNHRC", "UNODC", "WHO"] },
    { name: "Poland", flag: "🇵🇱", committees: ["UNHRC", "DISEC", "WHO"] },
    { name: "Ukraine", flag: "🇺🇦", committees: ["UNHRC", "DISEC", "WHO"] },
    { name: "Belgium", flag: "🇧🇪", committees: ["UNHRC", "UNEP", "WHO"] },
    { name: "Switzerland", flag: "🇨🇭", committees: ["UNHRC", "WHO", "UNEP"] },
    { name: "Austria", flag: "🇦🇹", committees: ["UNHRC", "UNEP", "WHO"] },
    { name: "Denmark", flag: "🇩🇰", committees: ["UNHRC", "UNEP", "WHO"] },
    { name: "Finland", flag: "🇫🇮", committees: ["UNHRC", "UNEP", "WHO"] },
    { name: "Greece", flag: "🇬🇷", committees: ["UNHRC", "UNEP", "WHO"] },
    { name: "Portugal", flag: "🇵🇹", committees: ["UNHRC", "UNEP", "UNODC"] },
    { name: "Chile", flag: "🇨🇱", committees: ["UNHRC", "UNEP", "WHO"] },
    { name: "Colombia", flag: "🇨🇴", committees: ["UNHRC", "UNODC", "WHO"] },
    { name: "Peru", flag: "🇵🇪", committees: ["UNHRC", "UNEP", "UNODC"] },
    { name: "Venezuela", flag: "🇻🇪", committees: ["UNHRC", "UNODC", "WHO"] },
    { name: "Kenya", flag: "🇰🇪", committees: ["UNHRC", "UNEP", "WHO"] },
    { name: "Ethiopia", flag: "🇪🇹", committees: ["UNHRC", "UNEP", "WHO"] }
];

// DOM Elements
const countryGrid = document.getElementById('countryGrid');
const searchInput = document.getElementById('countrySearch');
const noResults = document.getElementById('noResults');
const filterButtons = document.querySelectorAll('.filter-btn');

let currentFilter = 'all';

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    renderCountries(countries);
    initializeNavbar();
    setupEventListeners();
});

// Render country cards
function renderCountries(countriesToRender) {
    if (countriesToRender.length === 0) {
        countryGrid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';
    countryGrid.innerHTML = countriesToRender.map(country => `
        <div class="country-card" data-country="${country.name}">
            <div class="country-card-header">
                <div class="country-flag">${country.flag}</div>
            </div>
            <div class="country-card-body">
                <h3 class="country-name">${country.name}</h3>
                <div class="committee-tags">
                    ${country.committees.map(committee => 
                        `<span class="committee-tag">${committee}</span>`
                    ).join('')}
                </div>
            </div>
        </div>
    `).join('');

    // Add animation
    animateCards();
}

// Animate cards on render
function animateCards() {
    const cards = document.querySelectorAll('.country-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filterCountries(searchTerm, currentFilter);
    });

    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Update current filter
            currentFilter = button.dataset.committee;
            
            // Filter countries
            const searchTerm = searchInput.value.toLowerCase();
            filterCountries(searchTerm, currentFilter);
        });
    });
}

// Filter countries based on search and committee
function filterCountries(searchTerm, committee) {
    let filtered = countries;

    // Filter by committee
    if (committee !== 'all') {
        filtered = filtered.filter(country => 
            country.committees.includes(committee)
        );
    }

    // Filter by search term
    if (searchTerm) {
        filtered = filtered.filter(country =>
            country.name.toLowerCase().includes(searchTerm)
        );
    }

    renderCountries(filtered);
}

// Initialize Navbar functionality
function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    // Sticky Navbar on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    mobileMenuBtn?.addEventListener('click', () => {
        navLinks?.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks?.classList.remove('active');
            mobileMenuBtn?.classList.remove('active');
        });
    });
}

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});