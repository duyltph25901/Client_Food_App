const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^\d{10}$/;
    return phoneNumberRegex.test(phoneNumber);
}

const validatePassword = (password) => {
    // Kiểm tra xem mật khẩu có chứa ít nhất một chữ cái viết hoa, một chữ cái viết thường và một số hoặc ký tự đặc biệt không
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d|\W).*$/;
    return passwordRegex.test(password) && String(password).length >= 6
}

const validate = {
    validateEmail,
    validatePhoneNumber,
    validatePassword
}

export default validate
