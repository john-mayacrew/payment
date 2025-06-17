// 계좌번호 복사 기능
document.addEventListener('DOMContentLoaded', function () {
  const copyBtn = document.querySelector('.copy-btn');
  const accountNumber = document.querySelector('.account-number');

  if (copyBtn && accountNumber) {
    copyBtn.addEventListener('click', function () {
      // 계좌번호 텍스트 복사
      const textToCopy = accountNumber.textContent;

      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(textToCopy)
          .then(function () {
            showCopyMessage('계좌번호가 복사되었습니다.');
          })
          .catch(function () {
            fallbackCopyTextToClipboard(textToCopy);
          });
      } else {
        fallbackCopyTextToClipboard(textToCopy);
      }
    });
  }

  // 폴백 복사 기능 (구형 브라우저 지원)
  function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
      showCopyMessage('계좌번호가 복사되었습니다.');
    } catch (err) {
      showCopyMessage('복사에 실패했습니다.');
    }

    document.body.removeChild(textArea);
  }

  // 복사 완료 메시지 표시
  function showCopyMessage(message) {
    // 기존 메시지가 있다면 제거
    const existingMessage = document.querySelector('.copy-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // 새 메시지 생성
    const messageEl = document.createElement('div');
    messageEl.className = 'copy-message';
    messageEl.textContent = message;
    messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #2e8b57;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 14px;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            animation: slideIn 0.3s ease-out;
        `;

    document.body.appendChild(messageEl);

    // 3초 후 메시지 제거
    setTimeout(function () {
      if (messageEl && messageEl.parentNode) {
        messageEl.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(function () {
          messageEl.remove();
        }, 300);
      }
    }, 3000);
  }

  // 금액 입력 필드 포맷팅
  const amountInput = document.querySelector('.form-input');
  if (amountInput) {
    amountInput.addEventListener('input', function (e) {
      let value = e.target.value.replace(/[^\d]/g, '');
      if (value) {
        value = parseInt(value).toLocaleString();
        e.target.value = value + '원';
      }
    });

    amountInput.addEventListener('focus', function (e) {
      let value = e.target.value.replace(/[^\d]/g, '');
      e.target.value = value;
    });

    amountInput.addEventListener('blur', function (e) {
      let value = e.target.value.replace(/[^\d]/g, '');
      if (value) {
        value = parseInt(value).toLocaleString();
        e.target.value = value + '원';
      }
    });
  }

  // 사이드바 메뉴 활성화
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();

      // 모든 메뉴에서 active 클래스 제거
      navItems.forEach(function (nav) {
        nav.classList.remove('active');
      });

      // 클릭된 메뉴에 active 클래스 추가
      this.classList.add('active');
    });
  });
});

// CSS 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
