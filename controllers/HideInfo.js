const hideEmail = (email) => {
    // Lấy phần trước và sau ký tự @ của địa chỉ email
    const [prefix, suffix] = email.split('@');

    // Thay thế các ký tự trong phần trước email bằng dấu sao
    const hiddenPrefix = replaceChars(prefix);

    // Trả về địa chỉ email đã được ẩn
    return `${hiddenPrefix}@${suffix}`;
}

const hidePhoneNumber = (phoneNumber) => {
    // Lấy 2 số cuối cùng của số điện thoại
    const lastTwoDigits = phoneNumber.slice(-2);

    // Thay thế các số còn lại bằng dấu sao
    const hiddenDigits = phoneNumber.slice(0, -2).replace(/./g, '*');

    // Trả về số điện thoại đã được ẩn và chỉ hiển thị 2 số cuối cùng
    return `${hiddenDigits}${lastTwoDigits}`;
}

const replaceChars = (str) => {
    // Lấy các phần của chuỗi
    const start = str.slice(0, 1);
    const end = str.slice(-1);
    const middle = str.slice(1, -1);

    // Thay thế các ký tự trong phần giữa bằng dấu sao
    const replacedMiddle = middle.replace(/./g, '*');

    // Trả về chuỗi đã được thay thế
    return start + replacedMiddle + end;
}


const hideInformation = {
    hideEmail,
    hidePhoneNumber
}

export default hideInformation