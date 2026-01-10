// 存储输入内容的数组
let user_input_txt = [];

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 获取输入框和按钮元素
    const userInput = document.querySelector('.user_input');
    const confirmButton = document.querySelector('.button.confirm');
    
    // 为确认按钮添加点击事件
    confirmButton.addEventListener('click', function() {
        // 获取输入框的值
        
        const inputValue = userInput.value.trim();
        
        // 如果有输入内容，则追加到数组
        if (inputValue) {
            user_input_txt.push(inputValue);
            console.log('已添加到数组:', user_input_txt);
        }
        
        // 清空输入框
        userInput.value = '';
        
        // 可选：重新聚焦到输入框
        userInput.focus();
    });
    
    // 可选：按回车键也可以触发确认
    userInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            confirmButton.click();
        }
    });
});



