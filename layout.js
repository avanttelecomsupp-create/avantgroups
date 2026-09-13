/**
 * Avant Groups - Universal Modular Layout Injector
 */

(function() {
    const path = window.location.pathname;
    const page = path.split("/").pop() || "index.html";
    const isHomePage = (page === "index.html" || page === "" || page === "/");

    // 1. Header HTML
    const headerHTML = `
    <header class="site-header">
        <div class="header-container">
            <div class="logo-container">
                <a href="index.html">
                    <img src="logo.png" alt="Avant Groups Logo">
                </a>
            </div>
            <div class="mobile-menu-toggle" id="mobile-menu">
                <i class="fas fa-bars"></i>
            </div>
            <nav class="main-nav">
                <ul>
                    <li><a href="index.html"${isHomePage ? ' class="active"' : ''}>Home</a></li>
                    <li><a href="our-group.html"${page === 'our-group.html' ? ' class="active"' : ''}>Our Group</a></li>
                    <li><a href="news.html"${page === 'news.html' ? ' class="active"' : ''}>News</a></li>
                    <li><a href="free-apps.html"${page === 'free-apps.html' ? ' class="active"' : ''}>Free Apps</a></li>
                    <li><a href="javascript:void(0)" onclick="openContactModal('')">Contact Us</a></li>
                </ul>
            </nav>
        </div>
    </header>
    `;

    // 2. Footer HTML (Floating back button hidden on homepage!)
    const backBtnHTML = isHomePage ? '' : `
    <a href="javascript:history.back()" class="floating-back-btn" title="Go Back">
        <i class="fas fa-chevron-left"></i>
    </a>`;

    const footerHTML = `
    <footer>
        <p>&copy; 2026 Avant Groups. All rights reserved.</p>
    </footer>

    ${backBtnHTML}

    <!-- Global Contact Modal Overlay (Guaranteed Hidden by Default) -->
    <div class="modal-overlay" id="contactModal" style="display: none;">
        <div class="modal-content">
            <button type="button" class="modal-close" onclick="closeContactModal()"><i class="fas fa-times"></i></button>
            <div class="form-header" style="text-align: center; margin-bottom: 25px;">
                <h2 style="color: var(--primary-color); font-weight: 800; margin-bottom: 4px; letter-spacing: -0.5px;">Connect With Us</h2>
                <p style="font-size: 0.85rem; letter-spacing: 1.5px; color: #555; font-weight: 700;">AVANT GROUP</p>
            </div>
            <form id="contactForm" onsubmit="submitContactForm(event)">
                <div class="form-group" style="margin-bottom: 18px;">
                    <label style="display:block; font-size: 0.75rem; font-weight: 700; color: #333; margin-bottom: 6px;">SERVICE REQUIRED</label>
                    <select name="service" id="modalServiceSelect" required style="width:100%; padding: 12px 15px; border-radius: 8px; border: 1px solid #e1e4e8; background:#fafbfc; font-size:0.95rem;">
                        <option value="" disabled selected>Select a Service...</option>
                        <option value="Avant Telecom">Avant Telecom</option>
                        <option value="Avant IT Services">Avant IT Services</option>
                        <option value="Avant Logistics">Avant Logistics</option>
                        <option value="Avant Agro">Avant Agro</option>
                        <option value="Avant Energy">Avant Energy</option>
                    </select>
                </div>
                <div class="form-group" style="margin-bottom: 18px;">
                    <label style="display:block; font-size: 0.75rem; font-weight: 700; color: #333; margin-bottom: 6px;">FULL NAME</label>
                    <input type="text" name="name" placeholder="John Doe" required style="width:100%; padding: 12px 15px; border-radius: 8px; border: 1px solid #e1e4e8; background:#fafbfc; font-size:0.95rem;">
                </div>
                <div class="form-row" style="display:flex; gap: 15px; margin-bottom: 18px;">
                    <div class="form-group half" style="flex:1;">
                        <label style="display:block; font-size: 0.75rem; font-weight: 700; color: #333; margin-bottom: 6px;">EMAIL</label>
                        <input type="email" name="email" placeholder="john@company.com" pattern="[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$" title="Please enter a valid email address" required style="width:100%; padding: 12px 15px; border-radius: 8px; border: 1px solid #e1e4e8; background:#fafbfc; font-size:0.95rem;">
                    </div>
                    <div class="form-group half" style="flex:1;">
                        <label style="display:block; font-size: 0.75rem; font-weight: 700; color: #333; margin-bottom: 6px;">PHONE</label>
                        <div class="phone-input-group" style="display:flex; gap:8px;">
                            <select name="country_code" style="width:130px; flex-shrink:0; padding: 12px 8px; border-radius: 8px; border: 1px solid #e1e4e8; background:#fafbfc; font-size:0.85rem;">
                                <option value="+91" selected>India (+91)</option>
                                <option value="+1">USA (+1)</option>
                                <option value="+44">UK (+44)</option>
                                <option value="+61">Aus (+61)</option>
                            </select>
                            <input type="tel" name="phone" placeholder="9876543210" pattern="[0-9]{7,15}" title="Please enter a valid phone number" oninput="this.value = this.value.replace(/[^0-9]/g, '')" required style="flex:1; min-width:0; padding: 12px 12px; border-radius: 8px; border: 1px solid #e1e4e8; background:#fafbfc; font-size:0.95rem;">
                        </div>
                    </div>
                </div>
                <div class="form-group" style="margin-bottom: 18px;">
                    <label style="display:block; font-size: 0.75rem; font-weight: 700; color: #333; margin-bottom: 6px;">MESSAGE</label>
                    <textarea name="message" rows="4" placeholder="How can we help you?" required style="width:100%; padding: 12px 15px; border-radius: 8px; border: 1px solid #e1e4e8; background:#fafbfc; font-size:0.95rem;"></textarea>
                </div>
                <button type="submit" id="submitBtn" class="submit-btn" style="width:100%; padding: 14px; background: #0b192c; color: #fff; border:none; border-radius: 8px; font-weight:700; cursor:pointer;">SEND MESSAGE</button>
            </form>
        </div>
    </div>
    `;

    // 3. Inject elements
    document.addEventListener("DOMContentLoaded", function() {
        document.body.insertAdjacentHTML("afterbegin", headerHTML);
        document.body.insertAdjacentHTML("beforeend", footerHTML);

        // Mobile nav bind
        const mobileBtn = document.getElementById("mobile-menu");
        if (mobileBtn) {
            mobileBtn.addEventListener("click", function() {
                const nav = document.querySelector(".main-nav");
                if (nav) {
                    nav.classList.toggle("active");
                    const icon = this.querySelector("i");
                    if (nav.classList.contains("active")) {
                        icon.classList.remove("fa-bars");
                        icon.classList.add("fa-times");
                        document.body.style.overflow = "hidden";
                    } else {
                        icon.classList.remove("fa-times");
                        icon.classList.add("fa-bars");
                        document.body.style.overflow = "auto";
                    }
                }
            });
        }
    });

    // 4. Modal Functions
    window.openContactModal = function(serviceName) {
        const modal = document.getElementById("contactModal");
        if (modal) {
            modal.style.display = "flex";
            modal.classList.add("active");
            document.body.style.overflow = "hidden";
        }
        const select = document.getElementById("modalServiceSelect");
        if (select) {
            select.value = serviceName ? serviceName : "";
        }
        const nav = document.querySelector(".main-nav");
        if (nav && nav.classList.contains("active")) {
            nav.classList.remove("active");
            const icon = document.querySelector("#mobile-menu i");
            if (icon) {
                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");
            }
        }
    };

    window.closeContactModal = function() {
        const modal = document.getElementById("contactModal");
        if (modal) {
            modal.style.display = "none";
            modal.classList.remove("active");
            document.body.style.overflow = "auto";
        }
    };

    window.addEventListener("click", function(event) {
        const modal = document.getElementById("contactModal");
        if (event.target === modal) {
            window.closeContactModal();
        }
    });

    window.submitContactForm = function(e) {
        e.preventDefault();
        const form = document.getElementById("contactForm");
        const submitBtn = document.getElementById("submitBtn");
        submitBtn.disabled = true;
        submitBtn.textContent = "SENDING...";

        const scriptURL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
        const formData = new FormData(form);

        fetch(scriptURL, { method: "POST", body: formData })
            .then(function() {
                alert("Thank you! Your message has been sent successfully to info@avantgroups.in");
                form.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = "SEND MESSAGE";
                window.closeContactModal();
            })
            .catch(function() {
                alert("Submitted! (Make sure your Google Apps Script URL is configured).");
                submitBtn.disabled = false;
                submitBtn.textContent = "SEND MESSAGE";
                window.closeContactModal();
            });
    };
})();
