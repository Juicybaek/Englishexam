/*
 * Client-side JavaScript for EnglishExam website.
 * Handles login verification, session persistence via localStorage,
 * redirecting users based on authentication state, sign‑out
 * functionality and dynamic test page rendering.
 */

// Utility to check login status and redirect if not logged in
function requireLogin() {
  const loggedIn = localStorage.getItem('loggedIn');
  if (!loggedIn) {
    // Not logged in, redirect to login page
    window.location.href = 'login.html';
  }
}

// Handle login form submission
function handleLogin(event) {
  event.preventDefault();
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const errorElement = document.getElementById('error-message');
  const username = usernameInput.value.trim();
  const password = passwordInput.value;
  // Expected credentials
  const expectedUser = 'student';
  const expectedPassword = 'student100%happy';
  if (username === expectedUser && password === expectedPassword) {
    localStorage.setItem('loggedIn', 'true');
    // Redirect to main page
    window.location.href = 'index.html';
  } else {
    errorElement.textContent = 'Invalid username or password. Please try again.';
  }
}

// Sign out function
function signOut() {
  localStorage.removeItem('loggedIn');
  window.location.href = 'login.html';
}

// Dynamic content for test page
function loadTestPage() {
  requireLogin();
  const params = new URLSearchParams(window.location.search);
  const year = params.get('year');
  const test = params.get('test');
  const section = params.get('section');
  const heading = document.getElementById('test-heading');
  const description = document.getElementById('test-description');
  if (year && test && section) {
    heading.textContent = `English Language Exam ${year} – Test ${test} ${section}`;
    description.textContent = `This page is a placeholder for the ${section.toLowerCase()} section of Test ${test} for the English Language Exam ${year}. More content will be added soon.`;
  } else {
    heading.textContent = 'Test Information';
    description.textContent = 'No specific test details were provided.';
  }
}