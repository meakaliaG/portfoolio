/* Helper functions for client-side operations */

/* Display error message to user */
const handleError = (message) => {
  const errorElement = document.getElementById('errorMessage');
  const messageArea = document.getElementById('messageArea');
  
  if (errorElement && messageArea) {
    errorElement.textContent = message;
    messageArea.classList.remove('hidden');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      messageArea.classList.add('hidden');
    }, 5000);
  }
};

/* Display success message to user */
const handleSuccess = (message) => {
  const successElement = document.getElementById('successMessage');
  const messageArea = document.getElementById('messageArea');
  
  if (successElement && messageArea) {
    successElement.textContent = message;
    messageArea.classList.remove('hidden');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      messageArea.classList.add('hidden');
    }, 5000);
  }
};

/* Sends POST requests to the server using fetch.
   Will look for various entries in the response JSON object,
   and will handle them appropriately.
*/
const sendPost = async (url, data, handler) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    
    // Hide any existing messages
    hideError();

    if (result.redirect) {
      window.location = result.redirect;
    }

    if (result.error) {
      handleError(result.error);
    }

    if (result.message) {
      handleSuccess(result.message);
    }

    if (handler) {
      handler(result);
    }
    
    return result;
  } catch (err) {
    console.error('Request failed:', err);
    handleError('An error occurred. Please try again.');
    return { error: 'Request failed' };
  }
};

/* Sends GET requests to the server using fetch */
const sendGet = async (url, handler) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (result.error) {
      handleError(result.error);
    }

    if (handler) {
      handler(result);
    }
    
    return result;
  } catch (err) {
    console.error('Request failed:', err);
    handleError('An error occurred. Please try again.');
    return { error: 'Request failed' };
  }
};

/* Sends DELETE requests to the server using fetch */
const sendDelete = async (url, handler) => {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (result.error) {
      handleError(result.error);
    }

    if (result.message) {
      handleSuccess(result.message);
    }

    if (handler) {
      handler(result);
    }
    
    return result;
  } catch (err) {
    console.error('Request failed:', err);
    handleError('An error occurred. Please try again.');
    return { error: 'Request failed' };
  }
};

/* Hide error/success messages */
const hideError = () => {
  const messageArea = document.getElementById('messageArea');
  if (messageArea) {
    messageArea.classList.add('hidden');
  }
};

/* Hide messages (alias for hideError for backwards compatibility) */
const hideMessage = hideError;

module.exports = {
  handleError,
  handleSuccess,
  sendPost,
  sendGet,
  sendDelete,
  hideError,
  hideMessage,
};