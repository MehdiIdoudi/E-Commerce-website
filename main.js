document.addEventListener("DOMContentLoaded", () => {
    const follower = document.createElement("div");
    follower.classList.add("follower");
    document.body.appendChild(follower);
  
    let mouseX = 0, mouseY = 0; // Mouse coordinates
    let circleX = 0, circleY = 0; // Circle coordinates
    const delay = 0.1; // Animation delay (lower is faster)
  
    // Track mouse movement
    document.addEventListener("mousemove", (e) => {
      mouseX = e.pageX; // Mouse position relative to document
      mouseY = e.pageY; // Mouse position relative to document
    });
  
    // Update circle position during scroll
    document.addEventListener("scroll", () => {
      // Update the circle's position based on current mouse coordinates
      circleX = mouseX; 
      circleY = mouseY;
  
      follower.style.left = `${circleX}px`;
      follower.style.top = `${circleY}px`;
    });
  
    // Smoothly animate the circle's movement
    function animateCircle() {
      circleX += (mouseX - circleX) * delay; // Smooth follow for X
      circleY += (mouseY - circleY) * delay; // Smooth follow for Y
  
      // Update circle position
      follower.style.left = `${circleX}px`;
      follower.style.top = `${circleY}px`;
  
      requestAnimationFrame(animateCircle); // Keep animation running
    }
  
    animateCircle(); // Start animation
  });
  

  const circleContainer = document.getElementById('circle-container');
const follower = document.querySelector('.follower');

// Function to create 30x20 grid of small circles
function createCircles(rows, cols) {
    for (let i = 0; i < rows * cols; i++) {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        circleContainer.appendChild(circle);
    }
}

// Function to update the follower and circle sizes on mouse move
function onMouseMove(event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Show the follower at the mouse position
    follower.style.left = `${mouseX}px`;
    follower.style.top = `${mouseY}px`;
    follower.style.visibility = 'visible';

    // Get all circles
    const circles = document.querySelectorAll('.circle');
    
    circles.forEach(circle => {
        const rect = circle.getBoundingClientRect();
        const distance = Math.sqrt(Math.pow(mouseX - (rect.left + rect.width / 2), 2) + Math.pow(mouseY - (rect.top + rect.height / 2), 2));

        // Adjust the size of the circle based on the distance from the mouse
        const scale = Math.max(1.1, 1 / (distance / 100));
        circle.style.transform = `scale(${scale})`;
    });
}

// Initialize circles (30 in width, 20 in height)
createCircles(20, 30);  // 20 rows, 30 columns

// Add mouse move event listener
document.addEventListener('mousemove', onMouseMove);
