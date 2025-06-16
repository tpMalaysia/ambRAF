document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const elements = {
        pageLangSelect: document.getElementById('page-lang-select'),
        bmsId: document.getElementById('bms-id'),
        bmsIdContainer: document.getElementById('bms-id-container'),
        jobLangSelect: document.getElementById('job-lang-select'),
        locationSelect: document.getElementById('location-select'),
        jobSelect: document.getElementById('job-select'),
        step1: document.getElementById('step1'),
        step2: document.getElementById('step2'),
        nextBtn: document.getElementById('next-btn'),
        backBtn: document.getElementById('back-btn'),
        referralLink: document.getElementById('referral-link'),
        copyBtn: document.getElementById('copy-btn'),
        qrCodeCanvas: document.getElementById('qr-code-canvas'),
        shareWhatsapp: document.getElementById('share-whatsapp'),
        shareLine: document.getElementById('share-line'),
        shareFacebook: document.getElementById('share-facebook'),
        referrerBmsId: document.getElementById('referrerBmsId'),
        referralNote: document.getElementById('referralNote')
    };

    // Application Data
    let jsonData = [];
    let currentLocation = '';
    let lastJobLangSelection = '';
    let lastLocationSelection = '';
    let currentReferralLink = '';
    let isHashBmsMode = false;

    // Complete Translations for all languages
    const translations = {
        english: {
            welcomeMessage: "Welcome to TP Internal Refer A Friend Program",
            pageLangLabel: "Choose Your Language:",
            bmsIdLabel: "Please enter your BMS ID:",
            bmsIdPlaceholder: "Enter your BMS ID",
            bmsIdError: "Please enter a valid 6 or 7 digit BMS ID",
            jobSelectionTitle: "Please select your referral's preferences",
            jobLangLabel: "Job Language:",
            jobLangError: "Please select a job language",
            locationLabel: "Working Location:",
            locationError: "Please select a location",
            jobLabel: "Job Position:",
            jobError: "Please select a job position",
            nextBtn: "Next",
            thankYouTitle: "Thank you for your referral!",
            referralMessage: "Here's the personalized link for your friend to apply:",
            scanText: "Or scan this QR code to apply",
            followUs: "Follow Us On:",
            backText: "Back",
            copyText: "Copy",
            whatsappText: "WhatsApp",
            lineText: "Line",
            facebookText: "Facebook",
            locationSocial: "Our Social Media:",
            shareMessage: "Check out this job opportunity at Teleperformance: ",
            sharePrompt: "Share this opportunity with your friends:",
            tpGlobal: "TP Global",
            tpMalaysia: "TP Malaysia",
            tpThailand: "TP Thailand",
            copiedText: "Copied!",
            facebookAlert: "For Facebook, please copy the link and share it manually on your Facebook.",
            referredByText: "Referred by: "
        },
        japanese: {
            welcomeMessage: "TP内部友人紹介プログラムへようこそ",
            pageLangLabel: "言語を選択してください:",
            bmsIdLabel: "BMS IDを入力してください:",
            bmsIdPlaceholder: "BMS IDを入力",
            bmsIdError: "6桁または7桁の有効なBMS IDを入力してください",
            jobSelectionTitle: "紹介者の希望を選択してください",
            jobLangLabel: "求人言語:",
            jobLangError: "求人言語を選択してください",
            locationLabel: "勤務地:",
            locationError: "勤務地を選択してください",
            jobLabel: "職種:",
            jobError: "職種を選択してください",
            nextBtn: "次へ",
            thankYouTitle: "ご紹介ありがとうございます!",
            referralMessage: "友達が応募するためのリンクです:",
            scanText: "QRコードをスキャンして応募",
            followUs: "フォローしてください:",
            backText: "戻る",
            copyText: "コピー",
            whatsappText: "WhatsApp",
            lineText: "Line",
            facebookText: "Facebook",
            locationSocial: "現地のソーシャルメディア:",
            shareMessage: "Teleperformanceのこの求人情報をチェックしてください: ",
            sharePrompt: "この機会を友達と共有しましょう:",
            tpGlobal: "TP グローバル",
            tpMalaysia: "TP マレーシア",
            tpThailand: "TP タイ",
            copiedText: "コピーしました!",
            facebookAlert: "Facebookで共有するには、リンクをコピーしてFacebookで手動で共有してください。",
            referredByText: "紹介者: "
        },
        korean: {
            welcomeMessage: "TP 내부 친구 추천 프로그램에 오신 것을 환영합니다",
            pageLangLabel: "언어 선택:",
            bmsIdLabel: "BMS ID를 입력하세요:",
            bmsIdPlaceholder: "BMS ID 입력",
            bmsIdError: "6자리 또는 7자리 유효한 BMS ID를 입력하세요",
            jobSelectionTitle: "추천인의 선호도를 선택하세요",
            jobLangLabel: "직무 언어:",
            jobLangError: "직무 언어를 선택하세요",
            locationLabel: "근무 위치:",
            locationError: "근무 위치를 선택하세요",
            jobLabel: "직위:",
            jobError: "직위를 선택하세요",
            nextBtn: "다음",
            thankYouTitle: "추천해 주셔서 감사합니다!",
            referralMessage: "친구가 지원할 수 있는 개인화된 링크입니다:",
            scanText: "또는 이 QR 코드를 스캔하여 지원하세요",
            followUs: "팔로우 하세요:",
            backText: "뒤로",
            copyText: "복사",
            whatsappText: "WhatsApp",
            lineText: "Line",
            facebookText: "Facebook",
            locationSocial: "현지 소셜 미디어:",
            shareMessage: "Teleperformance의 이 채용 기회를 확인하세요: ",
            sharePrompt: "이 기회를 친구들과 공유하세요:",
            tpGlobal: "TP 글로벌",
            tpMalaysia: "TP 말레이시아",
            tpThailand: "TP 태국",
            copiedText: "복사되었습니다!",
            facebookAlert: "Facebook에서 공유하려면 링크를 복사하여 Facebook에서 수동으로 공유하십시오.",
            referredByText: "추천인: "
        },
        malay: {
            welcomeMessage: "Selamat datang ke Program Rujuk Rakan Dalaman TP",
            pageLangLabel: "Pilih Bahasa Anda:",
            bmsIdLabel: "Sila masukkan ID BMS anda:",
            bmsIdPlaceholder: "Masukkan ID BMS",
            bmsIdError: "Sila masukkan ID BMS yang sah (6 atau 7 digit)",
            jobSelectionTitle: "Sila pilih keutamaan rujukan anda",
            jobLangLabel: "Bahasa Pekerjaan:",
            jobLangError: "Sila pilih bahasa pekerjaan",
            locationLabel: "Lokasi Kerja:",
            locationError: "Sila pilih lokasi kerja",
            jobLabel: "Jawatan:",
            jobError: "Sila pilih jawatan",
            nextBtn: "Seterusnya",
            thankYouTitle: "Terima kasih atas rujukan anda!",
            referralMessage: "Berikut adalah pautan peribadi untuk rakan anda memohon:",
            scanText: "Atau imbas kod QR ini untuk memohon",
            followUs: "Ikuti Kami Di:",
            backText: "Kembali",
            copyText: "Salin",
            whatsappText: "WhatsApp",
            lineText: "Line",
            facebookText: "Facebook",
            locationSocial: "Media Sosial Lokasi:",
            shareMessage: "Lihat peluang pekerjaan ini di Teleperformance: ",
            sharePrompt: "Kongsi peluang ini dengan rakan anda:",
            tpGlobal: "TP Global",
            tpMalaysia: "TP Malaysia",
            tpThailand: "TP Thailand",
            copiedText: "Telah disalin!",
            facebookAlert: "Untuk Facebook, sila salin pautan dan kongsi secara manual di Facebook anda.",
            referredByText: "Dirujuk oleh: "
        },
        mandarin: {
            welcomeMessage: "欢迎来到TP内部推荐朋友计划",
            pageLangLabel: "选择您的语言:",
            bmsIdLabel: "请输入您的BMS ID:",
            bmsIdPlaceholder: "输入BMS ID",
            bmsIdError: "请输入6或7位有效的BMS ID",
            jobSelectionTitle: "请选择您推荐的偏好",
            jobLangLabel: "工作语言:",
            jobLangError: "请选择工作语言",
            locationLabel: "工作地点:",
            locationError: "请选择工作地点",
            jobLabel: "职位:",
            jobError: "请选择职位",
            nextBtn: "下一步",
            thankYouTitle: "感谢您的推荐!",
            referralMessage: "这是您朋友申请的个性化链接:",
            scanText: "或扫描此二维码申请",
            followUs: "关注我们:",
            backText: "返回",
            copyText: "复制",
            whatsappText: "WhatsApp",
            lineText: "Line",
            facebookText: "Facebook",
            locationSocial: "当地社交媒体:",
            shareMessage: "查看Teleperformance的这个工作机会: ",
            sharePrompt: "与朋友分享这个机会:",
            tpGlobal: "TP 全球",
            tpMalaysia: "TP 马来西亚",
            tpThailand: "TP 泰国",
            copiedText: "已复制!",
            facebookAlert: "要在Facebook上分享，请复制链接并在Facebook应用中手动分享。",
            referredByText: "推荐人: "
        },
        thai: {
            welcomeMessage: "ยินดีต้อนรับสู่โปรแกรมแนะนำเพื่อนภายใน TP",
            pageLangLabel: "เลือกภาษาของคุณ:",
            bmsIdLabel: "กรุณาใส่ BMS ID ของคุณ:",
            bmsIdPlaceholder: "ใส่ BMS ID",
            bmsIdError: "กรุณาใส่ BMS ID ที่ถูกต้อง (6 หรือ 7 หลัก)",
            jobSelectionTitle: "กรุณาเลือกความต้องการของผู้ที่คุณจะแนะนำ",
            jobLangLabel: "ภาษาของงาน:",
            jobLangError: "กรุณาเลือกภาษาของงาน",
            locationLabel: "สถานที่ทำงาน:",
            locationError: "กรุณาเลือกสถานที่ทำงาน",
            jobLabel: "ตำแหน่งงาน:",
            jobError: "กรุณาเลือกตำแหน่งงาน",
            nextBtn: "ถัดไป",
            thankYouTitle: "ขอบคุณสำหรับการแนะนำ!",
            referralMessage: "นี่คือลิงก์ส่วนตัวสำหรับเพื่อนของคุณสมัครงาน:",
            scanText: "หรือสแกน QR code นี้เพื่อสมัคร",
            followUs: "ติดตามเราได้ที่:",
            backText: "กลับ",
            copyText: "คัดลอก",
            whatsappText: "WhatsApp",
            lineText: "Line",
            facebookText: "Facebook",
            locationSocial: "สื่อสังคมท้องถิ่น:",
            shareMessage: "ดูโอกาสงานนี้ที่ Teleperformance: ",
            sharePrompt: "แบ่งปันโอกาสนี้กับเพื่อนของคุณ:",
            tpGlobal: "TP ระดับโลก",
            tpMalaysia: "TP มาเลเซีย",
            tpThailand: "TP ประเทศไทย",
            copiedText: "คัดลอกแล้ว!",
            facebookAlert: "สำหรับ Facebook โปรดคัดลอกลิงก์และแชร์ด้วยตนเองบน Facebook ของคุณ",
            referredByText: "แนะนำโดย: "
        }
    };

    // Initialize the application
    function init() {
        document.getElementById('current-year').textContent = new Date().getFullYear();
        handleHashBmsId();
        handleUrlBmsId(); // Keep original URL handling as fallback
        loadData();
        setupEventListeners();
        updatePageContent('english');
    }

    // Handle BMS ID from hash (new functionality)
    function handleHashBmsId() {
        const hash = window.location.hash;
        
        if (hash && hash.length > 1) {
            // Remove the # symbol and get the potential BMS ID
            const hashValue = hash.substring(1);
            
            // Check if it's a valid BMS ID (6 or 7 digits)
            if (/^\d{6,7}$/.test(hashValue)) {
                isHashBmsMode = true;
                
                // Hide the BMS ID container completely
                elements.bmsIdContainer.style.display = 'none';
                
                // Set the BMS ID value
                elements.referrerBmsId.value = hashValue;
                elements.bmsId.value = hashValue;
                
                // Show referral note with translated text
                updateReferralNote(hashValue);
                elements.referralNote.style.display = 'block';
                
                // Add smooth fade-in animation to the referral note
                elements.referralNote.style.opacity = '0';
                elements.referralNote.style.transition = 'opacity 0.5s ease-in-out';
                setTimeout(() => {
                    elements.referralNote.style.opacity = '1';
                }, 100);
                
                console.log('Hash BMS ID detected:', hashValue);
                return true;
            }
        }
        
        // If no valid hash BMS ID, ensure normal mode
        isHashBmsMode = false;
        elements.bmsIdContainer.style.display = 'block';
        elements.referralNote.style.display = 'none';
        return false;
    }

    // Update referral note with current language
    function updateReferralNote(bmsId) {
        const currentLang = elements.pageLangSelect.value || 'english';
        const translation = translations[currentLang] || translations.english;
        elements.referralNote.innerHTML = `<div class="alert alert-info" style="margin: 0; padding: 12px; border-radius: 8px; background-color: #e3f2fd; border: 1px solid #90caf9; color: #1565c0;">
            <i class="fas fa-info-circle me-2"></i>
            <strong>${translation.referredByText}${bmsId}</strong>
        </div>`;
    }

    // Handle BMS ID from URL path (original functionality - kept as fallback)
    function handleUrlBmsId() {
        // Only run this if hash BMS ID wasn't detected
        if (isHashBmsMode) return;
        
        const path = window.location.pathname;
        const pathParts = path.split('/');
        const potentialBmsId = pathParts[pathParts.length - 1];
        
        if (/^\d{6,7}$/.test(potentialBmsId)) {
            elements.bmsIdContainer.style.display = 'none';
            elements.referrerBmsId.value = potentialBmsId;
            elements.bmsId.value = potentialBmsId;
            updateReferralNote(potentialBmsId);
            elements.referralNote.style.display = 'block';
            
            // Add smooth fade-in animation to the referral note
            elements.referralNote.style.opacity = '0';
            elements.referralNote.style.transition = 'opacity 0.5s ease-in-out';
            setTimeout(() => {
                elements.referralNote.style.opacity = '1';
            }, 100);
        }
    }

    // Listen for hash changes
    function setupHashChangeListener() {
        window.addEventListener('hashchange', function() {
            console.log('Hash changed, re-checking BMS ID');
            
            // Reset to normal state first
            isHashBmsMode = false;
            elements.bmsIdContainer.style.display = 'block';
            elements.referralNote.style.display = 'none';
            elements.referrerBmsId.value = '';
            elements.bmsId.value = '';
            
            // Re-check hash
            handleHashBmsId();
            
            // Re-validate form
            validateForm();
        });
    }

    // Load JSON data
    function loadData() {
        fetch('data.json')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                jsonData = data;
                initializeDropdowns();
            })
            .catch(error => {
                console.error('Error loading data:', error);
                showAlert('Failed to load job data. Please try again later.');
            });
    }

    // Initialize dropdowns with all options
    function initializeDropdowns() {
        populateDropdown(elements.jobLangSelect, getUniqueValues('Language'));
        populateDropdown(elements.locationSelect, getUniqueValues('Location'));
        populateDropdown(elements.jobSelect, []);
    }

    // Get unique values from a specific field
    function getUniqueValues(field) {
        return [...new Set(jsonData.map(item => item[field]))].filter(Boolean);
    }

    // Get locations for specific language
    function getLocationsForLanguage(language) {
        if (!jsonData.length) return [];
        return [...new Set(
            jsonData
                .filter(item => item.Language.toLowerCase() === language.toLowerCase())
                .map(item => item.Location)
        )].filter(Boolean);
    }

    // Get languages for specific location
    function getLanguagesForLocation(location) {
        if (!jsonData.length) return [];
        return [...new Set(
            jsonData
                .filter(item => item.Location === location)
                .map(item => item.Language)
        )].filter(Boolean);
    }

    // Get jobs for specific location and language
    function getJobsForLocationAndLanguage(location, language) {
        if (!jsonData.length) return [];
        return [...new Set(
            jsonData
                .filter(item => item.Location === location && item.Language === language)
                .map(item => item.Positions)
        )].filter(Boolean);
    }

    // Populate dropdown with options
    function populateDropdown(dropdown, options, preserveSelection = false) {
        const currentValue = dropdown.value;
        dropdown.innerHTML = '';
        
        const defaultOption = new Option('-- ' + (translations[elements.pageLangSelect.value]?.selectText || 'Select') + ' --', '');
        defaultOption.disabled = true;
        defaultOption.selected = !currentValue;
        dropdown.appendChild(defaultOption);
        
        options.forEach(option => {
            const newOption = new Option(option, option);
            if (preserveSelection && option === currentValue) {
                newOption.selected = true;
            }
            dropdown.appendChild(newOption);
        });
    }

    // Update page content based on selected language
    function updatePageContent(language) {
        const translation = translations[language] || translations.english;
        
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            if (translation[key]) {
                if (el.tagName === 'INPUT' && el.type === 'button') {
                    el.value = translation[key];
                } else {
                    el.textContent = translation[key];
                }
            }
        });
        
        document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
            const key = el.getAttribute('data-translate-placeholder');
            if (translation[key]) el.placeholder = translation[key];
        });
        
        // Update referral note if it's visible
        if (elements.referralNote.style.display !== 'none' && (elements.referrerBmsId.value || elements.bmsId.value)) {
            const bmsId = elements.referrerBmsId.value || elements.bmsId.value;
            updateReferralNote(bmsId);
        }
    }

    // Update jobs dropdown based on current selections
    function updateJobsDropdown() {
        const language = elements.jobLangSelect.value;
        const location = elements.locationSelect.value;
        
        if (language && location) {
            const jobs = getJobsForLocationAndLanguage(location, language);
            populateDropdown(elements.jobSelect, jobs, true);
        } else {
            populateDropdown(elements.jobSelect, []);
        }
    }

    // When job language changes
    function handleJobLangChange() {
        const language = elements.jobLangSelect.value;
        lastJobLangSelection = language;
        
        if (language) {
            const locations = getLocationsForLanguage(language);
            populateDropdown(elements.locationSelect, locations, true);
            
            if (lastLocationSelection && locations.includes(lastLocationSelection)) {
                elements.locationSelect.value = lastLocationSelection;
            }
        }
        
        updateJobsDropdown();
        validateForm();
    }

    // When location changes
    function handleLocationChange() {
        const location = elements.locationSelect.value;
        lastLocationSelection = location;
        
        if (location) {
            const languages = getLanguagesForLocation(location);
            populateDropdown(elements.jobLangSelect, languages, true);
            
            if (lastJobLangSelection && languages.includes(lastJobLangSelection)) {
                elements.jobLangSelect.value = lastJobLangSelection;
            }
        }
        
        updateJobsDropdown();
        validateForm();
    }

    // Validate BMS ID (6 or 7 digits only)
    function validateBMSId(bmsId) {
        return /^\d{6,7}$/.test(bmsId);
    }

    // Validate form
    function validateForm() {
        let isValid = true;
        
        // Only validate BMS ID if the container is visible (not in hash mode)
        if (elements.bmsIdContainer.style.display !== 'none') {
            if (!validateBMSId(elements.bmsId.value.trim())) {
                elements.bmsId.classList.add('is-invalid');
                isValid = false;
            } else {
                elements.bmsId.classList.remove('is-invalid');
            }
        } else {
            // In hash mode, ensure we have a valid BMS ID in the hidden field
            const bmsId = elements.referrerBmsId.value || elements.bmsId.value;
            if (!validateBMSId(bmsId)) {
                isValid = false;
            }
        }
        
        if (!elements.jobLangSelect.value) {
            elements.jobLangSelect.classList.add('is-invalid');
            isValid = false;
        } else {
            elements.jobLangSelect.classList.remove('is-invalid');
        }
        
        if (!elements.locationSelect.value) {
            elements.locationSelect.classList.add('is-invalid');
            isValid = false;
        } else {
            elements.locationSelect.classList.remove('is-invalid');
        }
        
        if (!elements.jobSelect.value) {
            elements.jobSelect.classList.add('is-invalid');
            isValid = false;
        } else {
            elements.jobSelect.classList.remove('is-invalid');
        }
        
        elements.nextBtn.disabled = !isValid;
        
        // Add visual feedback for the next button
        if (isValid) {
            elements.nextBtn.classList.remove('btn-secondary');
            elements.nextBtn.classList.add('btn-primary');
        } else {
            elements.nextBtn.classList.remove('btn-primary');
            elements.nextBtn.classList.add('btn-secondary');
        }
        
        return isValid;
    }

    // Generate and display referral link
    function generateReferralLink() {
        if (!validateForm()) return false;
        
        // Get BMS ID from appropriate source
        let bmsId;
        if (isHashBmsMode || elements.bmsIdContainer.style.display === 'none') {
            bmsId = elements.referrerBmsId.value || elements.bmsId.value;
        } else {
            bmsId = elements.bmsId.value.trim();
        }
            
        const job = elements.jobSelect.value;
        const language = elements.jobLangSelect.value;
        const location = elements.locationSelect.value;
        currentLocation = location.toLowerCase();
        
        const jobData = jsonData.find(
            item => item.Language === language && 
                   item.Location === location && 
                   item.Positions === job
        );
        
        if (jobData) {
            const referralLink = `${jobData['Evergreen link']}${bmsId}`;
            elements.referralLink.value = referralLink;
            generateQRCode(referralLink);
            return true;
        }
        
        showAlert(translations[elements.pageLangSelect.value]?.jobDataError || 'Error generating referral link');
        return false;
    }

    // Generate QR code using canvas
    function generateQRCode(url) {
        currentReferralLink = url;
        
        const ctx = elements.qrCodeCanvas.getContext('2d');
        ctx.clearRect(0, 0, elements.qrCodeCanvas.width, elements.qrCodeCanvas.height);
        
        QRCode.toCanvas(elements.qrCodeCanvas, url, {
            width: 200,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#ffffff'
            }
        }, function(error) {
            if (error) {
                console.error('QR Code generation error:', error);
                showAlert('Failed to generate QR code. Please try again.');
            } else {
                console.log('QR code generated successfully');
            }
        });
    }

    // Copy link to clipboard
    function copyToClipboard() {
        elements.referralLink.select();
        elements.referralLink.setSelectionRange(0, 99999); // For mobile devices
        
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                const originalText = elements.copyBtn.innerHTML;
                const currentLang = elements.pageLangSelect.value || 'english';
                const translation = translations[currentLang] || translations.english;
                
                elements.copyBtn.innerHTML = `<i class="fas fa-check"></i> ${translation.copiedText}`;
                elements.copyBtn.classList.add('btn-success');
                elements.copyBtn.classList.remove('btn-secondary');
                
                setTimeout(() => {
                    elements.copyBtn.innerHTML = originalText;
                    elements.copyBtn.classList.remove('btn-success');
                    elements.copyBtn.classList.add('btn-secondary');
                }, 2000);
            }
        } catch (err) {
            console.error('Copy failed:', err);
            showAlert('Failed to copy link. Please select and copy manually.');
        }
        
        // Deselect the text
        window.getSelection().removeAllRanges();
    }

    // Share functions
    function shareWhatsApp() {
        const currentLang = elements.pageLangSelect.value || 'english';
        const translation = translations[currentLang] || translations.english;
        const message = `${translation.shareMessage}${currentReferralLink}`;
        const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    function shareLine() {
        const currentLang = elements.pageLangSelect.value || 'english';
        const translation = translations[currentLang] || translations.english;
        const message = `${translation.shareMessage}${currentReferralLink}`;
        const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(message)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    function shareFacebook() {
        const currentLang = elements.pageLangSelect.value || 'english';
        const translation = translations[currentLang] || translations.english;
        
        // Show alert with current language
        showAlert(translation.facebookAlert);
        
        // Open Facebook sharer
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentReferralLink)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    }

// Show alert message
    function showAlert(message) {
        alert(message);
    }

    // Add smooth transitions to form steps
    function showStep(stepElement) {
        stepElement.style.opacity = '0';
        stepElement.style.display = 'block';
        stepElement.style.transition = 'opacity 0.3s ease-in-out';
        
        setTimeout(() => {
            stepElement.style.opacity = '1';
        }, 10);
    }

    function hideStep(stepElement) {
        stepElement.style.opacity = '0';
        stepElement.style.transition = 'opacity 0.3s ease-in-out';
        
        setTimeout(() => {
            stepElement.style.display = 'none';
        }, 300);
    }

    // Setup event listeners
    function setupEventListeners() {
        // Page language change
        elements.pageLangSelect.addEventListener('change', function() {
            updatePageContent(this.value);
        });

        // Form validation listeners
        elements.bmsId.addEventListener('input', validateForm);
        elements.jobLangSelect.addEventListener('change', handleJobLangChange);
        elements.locationSelect.addEventListener('change', handleLocationChange);
        elements.jobSelect.addEventListener('change', validateForm);

        // Navigation buttons
        elements.nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (generateReferralLink()) {
                hideStep(elements.step1);
                setTimeout(() => {
                    showStep(elements.step2);
                }, 300);
            }
        });

        elements.backBtn.addEventListener('click', function(e) {
            e.preventDefault();
            hideStep(elements.step2);
            setTimeout(() => {
                showStep(elements.step1);
            }, 300);
        });

        // Copy and share buttons
        elements.copyBtn.addEventListener('click', copyToClipboard);
        elements.shareWhatsapp.addEventListener('click', shareWhatsApp);
        elements.shareLine.addEventListener('click', shareLine);
        elements.shareFacebook.addEventListener('click', shareFacebook);

        // Set up hash change listener
        setupHashChangeListener();

        // Form submission prevention
        document.querySelector('form')?.addEventListener('submit', function(e) {
            e.preventDefault();
        });
    }

    // Update social media links based on current location
    function updateSocialMediaLinks() {
        const socialLinks = {
            'kuala lumpur': {
                facebook: 'https://www.facebook.com/TeleperformanceMalaysia',
                instagram: 'https://www.instagram.com/teleperformance_malaysia'
            },
            'penang': {
                facebook: 'https://www.facebook.com/TeleperformanceMalaysia', 
                instagram: 'https://www.instagram.com/teleperformance_malaysia'
            },
            'bangkok': {
                facebook: 'https://www.facebook.com/TeleperformanceThailand',
                instagram: 'https://www.instagram.com/teleperformance_thailand'
            },
            'default': {
                facebook: 'https://www.facebook.com/Teleperformance',
                instagram: 'https://www.instagram.com/teleperformance_global'
            }
        };

        const links = socialLinks[currentLocation] || socialLinks.default;
        
        // Update social media links if they exist
        const facebookLink = document.querySelector('.social-facebook');
        const instagramLink = document.querySelector('.social-instagram');
        
        if (facebookLink) facebookLink.href = links.facebook;
        if (instagramLink) instagramLink.href = links.instagram;
    }

    // Utility function to get current translations
    function getCurrentTranslations() {
        const currentLang = elements.pageLangSelect.value || 'english';
        return translations[currentLang] || translations.english;
    }

    // Enhanced error handling
    function handleError(error, context = '') {
        console.error(`Error in ${context}:`, error);
        const translation = getCurrentTranslations();
        showAlert(translation.genericError || 'An error occurred. Please try again.');
    }

    // Initialize application when DOM is loaded
    init();
});
