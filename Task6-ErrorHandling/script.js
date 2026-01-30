// Error Handling Client-Side JavaScript

class ErrorHandler {
    constructor() {
        this.baseURL = 'http://localhost:3000/api';
        this.stats = {
            totalRequests: 0,
            successfulRequests: 0,
            errorRequests: 0
        };
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateStats();
    }

    setupEventListeners() {
        // Form submission
        const userForm = document.getElementById('userForm');
        if (userForm) {
            userForm.addEventListener('submit', this.handleFormSubmit.bind(this));
        }

        // Input validation on blur
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    // API Request Handler with comprehensive error handling
    async makeRequest(url, options = {}) {
        this.showLoading();
        this.stats.totalRequests++;

        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
            },
            ...options
        };

        try {
            const response = await fetch(url, defaultOptions);
            const data = await response.json();

            if (!response.ok) {
                throw new APIError(data.error.message, response.status, data.error.code, data.error.details);
            }

            this.stats.successfulRequests++;
            this.displayResponse(data, response.status, true);
            this.showToast('Request successful!', 'success');
            return data;

        } catch (error) {
            this.stats.errorRequests++;
            
            if (error instanceof APIError) {
                this.handleAPIError(error);
            } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
                this.handleNetworkError();
            } else {
                this.handleUnknownError(error);
            }
            
            throw error;
        } finally {
            this.hideLoading();
            this.updateStats();
        }
    }

    // Custom API Error Class
    handleAPIError(error) {
        const errorResponse = {
            status: 'error',
            error: {
                code: error.code,
                message: error.message,
                details: error.details
            },
            timestamp: new Date().toISOString()
        };

        this.displayResponse(errorResponse, error.statusCode, false);
        
        // Show specific error messages based on status code
        switch (error.statusCode) {
            case 400:
                this.showToast('Bad Request: Please check your input', 'error');
                break;
            case 401:
                this.showToast('Authentication required', 'error');
                break;
            case 403:
                this.showToast('Access denied', 'error');
                break;
            case 404:
                this.showToast('Resource not found', 'error');
                break;
            case 422:
                this.showToast('Validation failed', 'error');
                this.handleValidationErrors(error.details);
                break;
            case 500:
                this.showToast('Server error occurred', 'error');
                break;
            default:
                this.showToast(`Error ${error.statusCode}: ${error.message}`, 'error');
        }
    }

    handleNetworkError() {
        const errorResponse = {
            status: 'error',
            error: {
                code: 'NETWORK_ERROR',
                message: 'Unable to connect to server. Please check your internet connection.'
            },
            timestamp: new Date().toISOString()
        };

        this.displayResponse(errorResponse, 0, false);
        this.showToast('Network error: Unable to connect to server', 'error');
    }

    handleUnknownError(error) {
        const errorResponse = {
            status: 'error',
            error: {
                code: 'UNKNOWN_ERROR',
                message: error.message || 'An unexpected error occurred'
            },
            timestamp: new Date().toISOString()
        };

        this.displayResponse(errorResponse, 0, false);
        this.showToast('An unexpected error occurred', 'error');
    }

    // Form Validation
    validateField(input) {
        const value = input.value.trim();
        const fieldName = input.name;
        let isValid = true;
        let errorMessage = '';

        switch (fieldName) {
            case 'name':
                if (!value) {
                    errorMessage = 'Name is required';
                    isValid = false;
                } else if (value.length < 2) {
                    errorMessage = 'Name must be at least 2 characters long';
                    isValid = false;
                } else if (value.length > 50) {
                    errorMessage = 'Name cannot exceed 50 characters';
                    isValid = false;
                }
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    errorMessage = 'Email is required';
                    isValid = false;
                } else if (!emailRegex.test(value)) {
                    errorMessage = 'Please provide a valid email address';
                    isValid = false;
                }
                break;

            case 'age':
                const age = parseInt(value);
                if (!value) {
                    errorMessage = 'Age is required';
                    isValid = false;
                } else if (isNaN(age)) {
                    errorMessage = 'Age must be a number';
                    isValid = false;
                } else if (age < 13) {
                    errorMessage = 'Age must be at least 13';
                    isValid = false;
                } else if (age > 120) {
                    errorMessage = 'Age cannot exceed 120';
                    isValid = false;
                }
                break;

            case 'password':
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
                if (!value) {
                    errorMessage = 'Password is required';
                    isValid = false;
                } else if (value.length < 8) {
                    errorMessage = 'Password must be at least 8 characters long';
                    isValid = false;
                } else if (!passwordRegex.test(value)) {
                    errorMessage = 'Password must contain uppercase, lowercase, and number';
                    isValid = false;
                }
                break;
        }

        this.displayFieldError(fieldName, errorMessage, !isValid);
        return isValid;
    }

    displayFieldError(fieldName, message, hasError) {
        const input = document.getElementById(fieldName);
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        if (hasError) {
            input.classList.add('error');
            errorElement.textContent = message;
            input.parentElement.classList.add('shake');
            setTimeout(() => input.parentElement.classList.remove('shake'), 500);
        } else {
            input.classList.remove('error');
            errorElement.textContent = '';
        }
    }

    clearFieldError(input) {
        input.classList.remove('error');
        const errorElement = document.getElementById(`${input.name}-error`);
        if (errorElement) {
            errorElement.textContent = '';
        }
    }

    handleValidationErrors(details) {
        if (!details || !Array.isArray(details)) return;

        details.forEach(detail => {
            this.displayFieldError(detail.field, detail.message, true);
        });
    }

    // Form Submit Handler
    async handleFormSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const userData = Object.fromEntries(formData.entries());
        
        // Client-side validation
        let isValid = true;
        Object.keys(userData).forEach(key => {
            const input = document.getElementById(key);
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            this.showToast('Please fix the validation errors', 'warning');
            return;
        }

        try {
            await this.makeRequest(`${this.baseURL}/users`, {
                method: 'POST',
                body: JSON.stringify(userData)
            });
            
            // Reset form on success
            event.target.reset();
            this.showToast('User registered successfully!', 'success');
        } catch (error) {
            // Error already handled in makeRequest
        }
    }

    // Response Display
    displayResponse(data, statusCode, isSuccess) {
        const responseContainer = document.getElementById('response');
        const statusClass = isSuccess ? 'response-success' : 'response-error';
        const statusBadgeClass = isSuccess ? 'status-success' : 'status-error';
        
        responseContainer.className = `response-container ${statusClass}`;
        responseContainer.innerHTML = `
            <div class="status-badge ${statusBadgeClass}">
                ${statusCode} ${this.getStatusText(statusCode)}
            </div>
            <div class="response-content">${JSON.stringify(data, null, 2)}</div>
        `;
        
        responseContainer.classList.add('fade-in');
        setTimeout(() => responseContainer.classList.remove('fade-in'), 500);
    }

    getStatusText(statusCode) {
        const statusTexts = {
            200: 'OK',
            201: 'Created',
            400: 'Bad Request',
            401: 'Unauthorized',
            403: 'Forbidden',
            404: 'Not Found',
            422: 'Unprocessable Entity',
            500: 'Internal Server Error'
        };
        return statusTexts[statusCode] || 'Unknown';
    }

    // Loading States
    showLoading() {
        document.getElementById('loading').classList.add('show');
    }

    hideLoading() {
        document.getElementById('loading').classList.remove('show');
    }

    // Toast Notifications
    showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = this.getToastIcon(type);
        toast.innerHTML = `
            <i class="${icon}"></i>
            <span>${message}</span>
        `;
        
        toastContainer.appendChild(toast);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }

    getToastIcon(type) {
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        return icons[type] || icons.info;
    }

    // Statistics Update
    updateStats() {
        document.getElementById('total-requests').textContent = this.stats.totalRequests;
        document.getElementById('successful-requests').textContent = this.stats.successfulRequests;
        document.getElementById('error-requests').textContent = this.stats.errorRequests;
        
        const errorRate = this.stats.totalRequests > 0 
            ? Math.round((this.stats.errorRequests / this.stats.totalRequests) * 100)
            : 0;
        document.getElementById('error-rate').textContent = `${errorRate}%`;
    }
}

// Custom API Error Class
class APIError extends Error {
    constructor(message, statusCode, code, details = null) {
        super(message);
        this.name = 'APIError';
        this.statusCode = statusCode;
        this.code = code;
        this.details = details;
    }
}

// Initialize Error Handler
const errorHandler = new ErrorHandler();

// Global API Functions
async function testError(statusCode) {
    try {
        await errorHandler.makeRequest(`${errorHandler.baseURL}/test/${statusCode}`);
    } catch (error) {
        // Error already handled
    }
}

async function getUsers() {
    try {
        await errorHandler.makeRequest(`${errorHandler.baseURL}/users`);
    } catch (error) {
        // Error already handled
    }
}

async function getUser(id) {
    try {
        await errorHandler.makeRequest(`${errorHandler.baseURL}/users/${id}`);
    } catch (error) {
        // Error already handled
    }
}

async function getUserInvalidId() {
    try {
        await errorHandler.makeRequest(`${errorHandler.baseURL}/users/invalid-id`);
    } catch (error) {
        // Error already handled
    }
}

async function updateUserUnauthorized() {
    try {
        await errorHandler.makeRequest(`${errorHandler.baseURL}/users/1`, {
            method: 'PUT',
            body: JSON.stringify({ name: 'Updated Name' })
        });
    } catch (error) {
        // Error already handled
    }
}

async function deleteUserForbidden() {
    try {
        await errorHandler.makeRequest(`${errorHandler.baseURL}/users/1`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer valid-token',
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        // Error already handled
    }
}

// Add slideOut animation to CSS
const style = document.createElement('style');
style.textContent = `
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