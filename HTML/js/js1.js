function isMobile() {
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
if (isMobile() == true){
    window.location.replace("HTML/mobile_loading.html")
}
else{
    window.location.replace("HTML/loading.html")    
}

