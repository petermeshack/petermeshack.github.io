document.addEventListener("DOMContentLoaded", function() {
    // Retrieve the canvas element
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
  
    // Set initial position and velocity of the ball
    var x = canvas.width / 2;
    var y = canvas.height - 30;
    var dx = 0; // Initial horizontal velocity is 0
    var dy = 0; // Initial vertical velocity is 0
    var gravity = 0.1; // Gravity pulling the ball down
    var isBouncing = false; // Flag to indicate if the ball is bouncing
    var ballRadius = 10;
  
    // Function to draw the ball on the canvas
    function drawBall() {
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.closePath();
    }
  
    // Function to update the position of the ball
    function update() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBall();
  
      // Bounce off the top boundary
      if (y - ballRadius < 0 && isBouncing) {
        dy = -dy;
        isBouncing = false;
      }
  
      // Apply gravity
      dy += gravity;
  
      // Bounce off the bottom boundary
      if (y + ballRadius + dy > canvas.height) {
        y = canvas.height - ballRadius;
        dy = 0; // Reset vertical velocity to stop the ball
        isBouncing = false;
      }
  
      // Move the ball horizontally
      x += dx;
  
      // Prevent the ball from going beyond the left and right boundaries
      if (x - ballRadius < 0) {
        x = ballRadius;
      } else if (x + ballRadius > canvas.width) {
        x = canvas.width - ballRadius;
      }
  
      // Update the vertical position
      y += dy;
    }
  
    // Function to handle keydown events
    function handleKeyDown(event) {
      if (event.key === "w" && !isBouncing) {
        dy = -3; // Adjust the velocity to move the ball up
        isBouncing = true;
      } else if (event.key === "d") {
        dx = 2; // Adjust the velocity to move the ball right
      } else if (event.key === "a") {
        dx = -2; // Adjust the velocity to move the ball left
      }
    }
  
    // Function to handle keyup events
    function handleKeyUp(event) {
      if (event.key === "w") {
        isBouncing = false;
      } else if (event.key === "d" || event.key === "a") {
        dx = 0; // Stop horizontal movement when the right or left key is released
      }
    }
  
    // Event listeners for keydown and keyup events
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
  
    // Animation loop
    function animate() {
      update();
      requestAnimationFrame(animate);
    }
  
    // Start the animation
    animate();
  });
  