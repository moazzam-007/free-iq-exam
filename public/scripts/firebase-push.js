// Native Google Chrome Web Push Notification with Safe Soft-Prompt for freeiqexam.com
(function() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator) || !('Notification' in window)) {
    return;
  }

  const FIREBASE_CONFIG = {
    apiKey: "AIzaSyCPK5DXNJ1Vuoi0lLFLO-GXIXOrrqYo62U",
    authDomain: "freeiqexam.firebaseapp.com",
    projectId: "freeiqexam",
    storageBucket: "freeiqexam.firebasestorage.app",
    messagingSenderId: "461140068366",
    appId: "1:461140068366:web:87a82bd3135ec05e5a545f"
  };

  const VAPID_KEY = "BP-270PEZcLtFU7yPbt475BantmvKf1uhoKEVLOFJDnjLHSzTM6mFji8FIAmP-HpsEjeiujR1y3dlMPBF6niM-I";

  function loadScript(src) {
    return new Promise(function(resolve, reject) {
      if (document.querySelector('script[src="' + src + '"]')) {
        return resolve();
      }
      const s = document.createElement('script');
      s.src = src;
      s.async = true;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  function registerFCM() {
    navigator.serviceWorker.register('/firebase-messaging-sw.js')
      .then(function(registration) {
        return Promise.all([
          loadScript('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js'),
          loadScript('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js')
        ]).then(function() {
          if (!window.firebase.apps.length) {
            window.firebase.initializeApp(FIREBASE_CONFIG);
          }
          const messaging = window.firebase.messaging();
          return messaging.getToken({
            vapidKey: VAPID_KEY,
            serviceWorkerRegistration: registration
          });
        });
      })
      .then(function(token) {
        if (token) {
          localStorage.setItem('freeiqexam_fcm_token', token);
          console.log('[FCM] Push Notification Registered Successfully:', token);
        }
      })
      .catch(function(err) {
        console.warn('[FCM] Push notification initialization note:', err.message || err);
      });
  }

  function showSoftPrompt() {
    if (document.getElementById('fcm-soft-prompt')) return;

    // Check if user dismissed within last 3 days
    const lastDismissed = localStorage.getItem('fcm_prompt_dismissed_at');
    if (lastDismissed && Date.now() - parseInt(lastDismissed, 10) < 3 * 24 * 60 * 60 * 1000) {
      return;
    }

    const modal = document.createElement('div');
    modal.id = 'fcm-soft-prompt';
    modal.innerHTML = `
      <div class="fcm-prompt-card">
        <div class="fcm-prompt-header">
          <div class="fcm-prompt-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="fcm-prompt-text">
            <div class="fcm-prompt-title">freeiqexam.com</div>
            <div class="fcm-prompt-desc">Get daily brain teasers, cognitive test updates & new IQ puzzles.</div>
          </div>
        </div>
        <div class="fcm-prompt-actions">
          <button id="fcm-btn-dismiss" class="fcm-btn-secondary">Later</button>
          <button id="fcm-btn-allow" class="fcm-btn-primary">Allow</button>
        </div>
      </div>
    `;

    const style = document.createElement('style');
    style.innerHTML = `
      #fcm-soft-prompt {
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 999999;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        animation: fcmSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      }
      @keyframes fcmSlideIn {
        from { opacity: 0; transform: translateY(-16px) scale(0.96); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
      .fcm-prompt-card {
        background: #ffffff;
        color: #18181b;
        border-radius: 14px;
        box-shadow: 0 12px 36px rgba(0, 0, 0, 0.18), 0 2px 8px rgba(0, 0, 0, 0.08);
        border: 1px solid rgba(0, 0, 0, 0.08);
        padding: 16px;
        max-width: 340px;
        box-sizing: border-box;
      }
      @media (prefers-color-scheme: dark) {
        .fcm-prompt-card {
          background: #18181b;
          color: #f4f4f5;
          border-color: #27272a;
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.45);
        }
      }
      .fcm-prompt-header {
        display: flex;
        align-items: flex-start;
        gap: 12px;
      }
      .fcm-prompt-icon {
        flex-shrink: 0;
        width: 38px;
        height: 38px;
        border-radius: 10px;
        background: #eff6ff;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      @media (prefers-color-scheme: dark) {
        .fcm-prompt-icon {
          background: #1e293b;
        }
      }
      .fcm-prompt-text {
        flex: 1;
      }
      .fcm-prompt-title {
        font-size: 14px;
        font-weight: 700;
        line-height: 1.2;
        margin-bottom: 4px;
      }
      .fcm-prompt-desc {
        font-size: 12px;
        line-height: 1.4;
        color: #71717a;
      }
      @media (prefers-color-scheme: dark) {
        .fcm-prompt-desc {
          color: #a1a1aa;
        }
      }
      .fcm-prompt-actions {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 10px;
        margin-top: 14px;
      }
      .fcm-btn-secondary {
        background: transparent;
        border: none;
        color: #71717a;
        font-size: 13px;
        font-weight: 500;
        padding: 7px 12px;
        cursor: pointer;
        border-radius: 8px;
        transition: background 0.15s;
      }
      .fcm-btn-secondary:hover {
        background: rgba(0, 0, 0, 0.05);
      }
      .fcm-btn-primary {
        background: #2563eb;
        border: none;
        color: #ffffff;
        font-size: 13px;
        font-weight: 600;
        padding: 7px 16px;
        cursor: pointer;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(37, 99, 235, 0.3);
        transition: transform 0.1s, background 0.15s;
      }
      .fcm-btn-primary:hover {
        background: #1d4ed8;
      }
      .fcm-btn-primary:active {
        transform: scale(0.97);
      }
      @media (max-width: 480px) {
        #fcm-soft-prompt {
          top: auto;
          bottom: 20px;
          left: 12px;
          right: 12px;
          animation: fcmSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes fcmSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fcm-prompt-card {
          max-width: 100%;
        }
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(modal);

    document.getElementById('fcm-btn-allow').addEventListener('click', function() {
      modal.remove();
      // User gesture triggered -> Chrome will show official permission without quiet penalty
      Notification.requestPermission().then(function(permission) {
        if (permission === 'granted') {
          registerFCM();
        }
      });
    });

    document.getElementById('fcm-btn-dismiss').addEventListener('click', function() {
      localStorage.setItem('fcm_prompt_dismissed_at', Date.now().toString());
      modal.remove();
    });
  }

  // If already granted, ensure token is registered
  if (Notification.permission === 'granted') {
    registerFCM();
  } else if (Notification.permission === 'default') {
    // Show soft prompt after 3 seconds of engagement
    setTimeout(showSoftPrompt, 3000);
  }
})();
