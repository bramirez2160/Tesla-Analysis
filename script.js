function startCountingAnimation() {
    const valueDisplays = document.querySelectorAll(".stat-value");
    const decimalValueDisplays = document.querySelectorAll(".decimal-stat");
    const autopilotValueDisplays = document.querySelectorAll(".autopilot-stat");
    const interval = 4000;

    function animateValue(element, start, end, duration, decimalPlaces = 0, prefix = "", suffix = "") {
        let startTime = null;
        const fps = 10000; // Increase the frames per second (you can adjust this value)

        function step(currentTime) {
            if (!startTime) {
                startTime = currentTime;
            }

            const progress = (currentTime - startTime) / duration;
            if (progress <= 1) {
                let value;
                if (element.classList.contains("decimal-stat")) {
                    // Display random numbers for elements with .decimal-stat class
                    const randomValue = (Math.random() * (3.97 - 2.44) + 2.44).toFixed(decimalPlaces);
                    value = parseFloat(randomValue).toFixed(decimalPlaces);
                } else if (element.classList.contains("autopilot-stat")) {
                    // Display random numbers for elements with .autopilot-stat class
                    const randomValue = (Math.random() * (57 - 48) + 48).toFixed(0);
                    value = parseFloat(randomValue).toFixed(0);
                    suffix = "%"; // Add the % sign for autopilot-stat
                } else {
                    value = start + progress * (end - start);
                }

                element.textContent = `${prefix}${value.toLocaleString(undefined, {
                    minimumFractionDigits: decimalPlaces,
                    maximumFractionDigits: decimalPlaces,
                })}${suffix}`;

                // Request the next animation frame at a higher FPS for smoother transition
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

        // Start the animation
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

    // Additional code for autopilot-stat
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
    // Function to handle the intersection observer callback
function handleIntersection(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const milesBar = entry.target;
        const dataWidth = parseFloat(milesBar.getAttribute("data-width"));
        milesBar.style.width = dataWidth + "%";
        observer.unobserve(milesBar); // Stop observing once animated
      }
    });
  }
  
  // Create an Intersection Observer
  const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.1, // You can adjust the threshold as needed
  });
  
  // Get all elements with the class "miles-bar"
  const milesBars = document.querySelectorAll(".miles-bar");
  
  // Observe each "miles-bar" element
  milesBars.forEach((milesBar) => {
    observer.observe(milesBar);
  });
  

  });

// Add click event listeners to all questions
const questions = document.querySelectorAll('.question');

questions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling; // Get the next sibling element (answer)

        // Toggle the 'open' class to show/hide the answer and rotate the arrow
        answer.classList.toggle('open');
    });
});

// Select the faq-arrow elements
const faqArrows = document.querySelectorAll('.faq-arrow');

faqArrows.forEach(faqArrow => {
  faqArrow.addEventListener('click', () => {
    // Find the parent faq-question-wrapper
    const questionWrapper = faqArrow.parentElement;

    // Toggle the open class on the parent faq-question-wrapper
    questionWrapper.classList.toggle('open');

    // Find the faq-answer element
    const answer = questionWrapper.nextElementSibling;

    // Toggle the answer's display
    if (answer.style.display === 'block') {
      answer.style.display = 'none';
      faqArrow.style.transform = 'rotate(0deg)'; // Reset the arrow rotation
    } else {
      answer.style.display = 'block';
      faqArrow.style.transform = 'rotate(180deg)'; // Rotate the arrow 180 degrees
    }
  });
});

let prevScrollPos = window.pageYOffset;

window.onscroll = function () {
  const currentScrollPos = window.pageYOffset;
  const navbar = document.querySelector('.navbar');

  if (prevScrollPos > currentScrollPos) {
    // User is scrolling up
    navbar.style.opacity = '1';
  } else {
    // User is scrolling down
    navbar.style.opacity = '0'; // Adjust opacity as needed
  }

  prevScrollPos = currentScrollPos;
};



// Select all mobile navigation links using a common class
const mobileNavLinks = document.querySelectorAll('#click-close');

// Attach a click event listener to each link
mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    // Uncheck the checkbox to close the mobile menu
    const checkbox = document.getElementById('check');
    checkbox.checked = false;
  });
});


  
  














  

