function startCountingAnimation() {
    const valueDisplays = document.querySelectorAll(".stat-value");
    const decimalValueDisplays = document.querySelectorAll(".decimal-stat");
    const autopilotValueDisplays = document.querySelectorAll(".autopilot-stat");
    const interval = 4000;

    function animateValue(element, start, end, duration, decimalPlaces = 0, prefix = "", suffix = "") {
        let startTime = null;
        const fps = 10000;

        function step(currentTime) {
            if (!startTime) {
                startTime = currentTime;
            }

            const progress = (currentTime - startTime) / duration;
            if (progress <= 1) {
                let value;
                if (element.classList.contains("decimal-stat")) {                    
                    const randomValue = (Math.random() * (3.97 - 2.44) + 2.44).toFixed(decimalPlaces);
                    value = parseFloat(randomValue).toFixed(decimalPlaces);
                } else if (element.classList.contains("autopilot-stat")) {                  
                    const randomValue = (Math.random() * (57 - 48) + 48).toFixed(0);
                    value = parseFloat(randomValue).toFixed(0);
                    suffix = "%";
                } else {
                    value = start + progress * (end - start);
                }

                element.textContent = `${prefix}${value.toLocaleString(undefined, {
                    minimumFractionDigits: decimalPlaces,
                    maximumFractionDigits: decimalPlaces,
                })}${suffix}`;

                setTimeout(() => {
                    requestAnimationFrame(step);
                }, 1000 / fps);
            } else {
                element.textContent = `${prefix}${end.toLocaleString(undefined, {
                    minimumFractionDigits: decimalPlaces,
                    maximumFractionDigits: decimalPlaces,
                })}${suffix}`;
            }
        }

        requestAnimationFrame(step);
    }

    valueDisplays.forEach((valueDisplay) => {
        const startValue = 0;
        const endValue = parseFloat(valueDisplay.getAttribute("data-val"));
        const decimalPlaces = valueDisplay.classList.contains("decimal-stat") ? 2 : 0;

        if (valueDisplay.classList.contains("dollar-stat")) {
            animateValue(valueDisplay, startValue, endValue, interval, decimalPlaces, "$");
        } else {
            animateValue(valueDisplay, startValue, endValue, interval, decimalPlaces);
        }
    });

    autopilotValueDisplays.forEach((valueDisplay) => {
        const startValue = 0;
        const endValue = parseFloat(valueDisplay.getAttribute("data-val"));
        animateValue(valueDisplay, startValue, endValue, interval, 0, "", "%");
    });
}

const section = document.querySelector(".summary");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            startCountingAnimation();
            observer.unobserve(entry.target);
        }
    });
});

observer.observe(section);


document.addEventListener("DOMContentLoaded", function() {
function handleIntersection(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const milesBar = entry.target;
        const dataWidth = parseFloat(milesBar.getAttribute("data-width"));
        milesBar.style.width = dataWidth + "%";
        observer.unobserve(milesBar);
      }
    });
  }
  
  const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.1,
  });
  
  const milesBars = document.querySelectorAll(".miles-bar");
  
  milesBars.forEach((milesBar) => {
    observer.observe(milesBar);
  });
  

  });

const questions = document.querySelectorAll('.question');

questions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;

        answer.classList.toggle('open');
    });
});

const faqArrows = document.querySelectorAll('.faq-arrow');

faqArrows.forEach(faqArrow => {
  faqArrow.addEventListener('click', () => {
    const questionWrapper = faqArrow.parentElement;

    questionWrapper.classList.toggle('open');

    const answer = questionWrapper.nextElementSibling;

    if (answer.style.display === 'block') {
      answer.style.display = 'none';
      faqArrow.style.transform = 'rotate(0deg)';
    } else {
      answer.style.display = 'block';
      faqArrow.style.transform = 'rotate(180deg)';
    }
  });
});

let prevScrollPos = window.pageYOffset;

window.onscroll = function () {
  const currentScrollPos = window.pageYOffset;
  const navbar = document.querySelector('.navbar');

  if (prevScrollPos > currentScrollPos) {
    navbar.style.opacity = '1';
  } else {
    navbar.style.opacity = '0';
  }

  prevScrollPos = currentScrollPos;
};



const mobileNavLinks = document.querySelectorAll('#click-close');

mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    const checkbox = document.getElementById('check');
    checkbox.checked = false;
  });
});


  
  














  

