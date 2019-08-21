focus();
      document.querySelectorAll('.video').forEach(function (el) {
        const listener = addEventListener('blur', function () {
          const play = el.querySelector('.video-play');
          if (play && document.activeElement === el.querySelector('.video-iframe')) {
            el.removeChild(play);
          }
          removeEventListener('blur', listener);
        });
      });