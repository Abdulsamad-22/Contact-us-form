const submitButton = document.querySelector('.cta');
const successMessage = document.querySelector('.success-container');

// Initialize the function to set up the event listeners
setupActiveRadio();

document.body.addEventListener('keydown', (event) => {
    keyEnter(event);
});

function keyEnter (event) {
    if (typeof event !== 'undefined' && event.key === 'Enter') {
        event.preventDefault();

         validateForm();
    }
  } 


submitButton.addEventListener('click', (event)=> {
    event.preventDefault();

    validateForm();
    
});

function validateForm() {
    const iconImage = document.createElement('img');

    successMessage.style.display = 'none';

    const isNameValid = validateNames();
    const isEmailValid = email();
    const isMessageValid = message();
    const isRadioValid = checksActiveRadio();
    const isCheckBoxValid = checkBox();

    if (isNameValid && isEmailValid && isMessageValid && isRadioValid && isCheckBoxValid) {
         let html = `
         <div class="message-success-container">
            <div class="icon-sent-message">
                <img class="success-icon" src="assets/images/icon-success-check.svg">
                <p class="message-title">
                   Message Sent
                </p>
            </div>
            <p class="sent-desc">
                Thanks for completing the form, we'll be in touch soon
            </p>
        </div>
        `
        // Display success message
        successMessage.textContent = 'Form submitted successfully!';
        successMessage.style.display = 'block';
        successMessage.innerHTML = html;
    } 
}

function validateNames() {
    const nameInput = document.querySelectorAll('.name-input');
    const nameContainer = document.querySelectorAll('.name-container');

    nameInput.forEach((input, index) => {
        let html = document.createElement('p');
        html.classList.add('error-message');
        input.classList.add('error-border');

        const container = nameContainer[index];
        container.querySelectorAll('.error-message').forEach(msg => msg.remove());

        if (input.value === '') {
            displayError(container, html, 'This field is required');
            return false;
        } else {
            input.classList.remove('error-border');
        }
    });
    return true
}


function email() {
    const emailContainer = document.querySelector('.email-container');
    const emailInput = document.querySelector('.email-input');

    const emailCheck = emailInput.value;

    let html = document.createElement('p');
    html.classList.add('error-message');

    emailInput.classList.add('error-border');

    emailContainer.querySelectorAll('.error-message').forEach(msg => msg.remove());

    if (!emailCheck.endsWith('@gmail.com')) {
        displayError(emailContainer, html, 'Please enter a valid email address');
        return false;
    } else {
        emailInput.classList.remove('error-border')
    }
    
    return true;
}

function setupActiveRadio() {
    const radioButtons = document.querySelectorAll('.js-radio');
    const radioContainers = document.querySelectorAll('.query-container');

    // Add event listener to each radio button to update the background on click
    radioButtons.forEach((radio, index) => {
        radio.addEventListener('click', () => {
            // Clear any existing active classes
            radioContainers.forEach(container => container.classList.remove('active'));

            // Add the active class to the clicked radio button's container
            if (radio.checked && radioContainers[index]) {
                radioContainers[index].classList.add('active');
            }
        });
    });
}


function checksActiveRadio() {
    const radioButtons = document.querySelectorAll('.js-radio');
    const queryContainer = document.querySelector('.query-type-container');

    // Create the error message element only once
    let html = document.createElement('p');
    html.classList.add('error-message');

    // Clear any existing error messages
    queryContainer.querySelectorAll('.error-message').forEach(msg => msg.remove());

    // Check if any radio button is selected
    const isChecked = Array.from(radioButtons).some(radio => radio.checked);

    if (!isChecked) {
        displayError(queryContainer, html, 'This field is required');
        return false;
       
    } 
    return true;
}

function message() {
    const messageContainer = document.querySelector('.message-box');

    const messageDisplay = document.querySelector('.message-container');
    let html = document.createElement('p');
    html.classList.add('error-message');

    messageContainer.classList.add('error-border');

    messageDisplay.querySelectorAll('.error-message').forEach(msg => msg.remove());

    const content = messageContainer.textContent.trim();

    if (content === '') {
        displayError(messageDisplay, html, 'This field is required');
        return false;
    } else {
        messageContainer.classList.remove('error-border');
    }
    return true;
}

function checkBox() {
    const checkList = document.querySelector('.check-box');

    const checkContainer = document.querySelector('.check-box-container');
    let html = document.createElement('p');
    html.classList.add('error-message');

    checkContainer.querySelectorAll('.error-message').forEach(msg => msg.remove());

    if (!checkList.checked) {
        displayError(checkContainer, html, 'To submit this form, please consent to being contacted');
        return false;
    }
    return true;
}

function displayError(container, element, message) {
    element.textContent = message;
    container.classList.add('error-message');
    container.appendChild(element);
}