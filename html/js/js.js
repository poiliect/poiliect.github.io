let animationId = null;
let animationRunning = false;
let canvas, c, cfg, stars, cx, cy;
	let mx = 0, my = 0;
// 初始化函数
function initAnimation() {
    canvas = document.getElementById("space");
    c = canvas.getContext("2d");
    cfg = {
        numStars: 3000,
        focalLength: canvas.width * 2,
        mouseInfluence: 2,  // 设为0禁用鼠标交互
        maxStarSize: 3,
        fadeStartZ: 200,
        fadeEndZ: 100,
        speed: 5,
    };
	canvas.addEventListener('mousemove', (e) => {
    mx = e.clientX - cx;
    my = e.clientY - cy;
});
    
    // 初始化画布大小
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cx = canvas.width / 2;
    cy = canvas.height / 2;
    
    // 初始化星星
    stars = Array.from({ length: cfg.numStars }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * canvas.width * 6,
        o: '0.' + Math.floor(Math.random() * 99) + 1,
        px: 0,
        py: 0,
        pz: 0
	
    }));
}

// 简化版动画循环
function loop() {

    if (!animationRunning) return;
    
    // 更新星星位置
    stars.forEach(star => {
        star.px = star.x;
        star.py = star.y;
        star.pz = star.z;
        star.z -= cfg.speed;
    if (typeof mx !== 'undefined' && typeof my !== 'undefined') {
        star.x += mx * cfg.mouseInfluence / star.z;
        star.y += my * cfg.mouseInfluence / star.z;
    }
        
        // 重置星星位置
        if (star.z <= cfg.fadeEndZ) {
				star.z = canvas.width;
				star.x = Math.random() * canvas.width;
				star.y = Math.random() * canvas.height;
				[star.px,star.py,star.pz] = [star.x,star.y,star.z];
        }
    });
    
    // 清空画布
    c.clearRect(0, 0, canvas.width, canvas.height);
    
    // 绘制星星
    stars.forEach(star => {
        const scale = cfg.focalLength / star.z;
        const x = (star.x - cx) * scale + cx;
        const y = (star.y - cy) * scale + cy;
        const size = Math.min(cfg.maxStarSize, scale);
        const a = star.z <= cfg.fadeStartZ ? 
            Math.max(0, Math.min(1, (star.z - cfg.fadeEndZ) / (cfg.fadeStartZ - cfg.fadeEndZ))) : 1;
        
        // 绘制圆形星星
        c.beginPath();
        c.arc(x, y, size, 0, Math.PI * 2);
        c.fillStyle = `rgba(255, 255, 255, ${parseFloat(star.o) * a})`;
        c.fill();
        
        // 当速度较快时绘制轨迹
        if (cfg.speed > 10) {
            const prevScale = cfg.focalLength / star.pz;
            const prevX = (star.px - cx) * prevScale + cx;
            const prevY = (star.py - cy) * prevScale + cy;
            
            c.beginPath();
            c.moveTo(prevX, prevY);
            c.lineTo(x, y);
            c.strokeStyle = `rgba(255, 255, 255, ${0.3 * a})`;
            c.lineWidth = size;
            c.stroke();
        }
    });
    
    animationId = requestAnimationFrame(loop);
}

// 主开关函数
function kaishi() {
    if (animationRunning) {
        // 停止动画
        cancelAnimationFrame(animationId);
        animationRunning = false;
        animationId = null;
        
        // 清空画布
        if (c) {
            c.clearRect(0, 0, canvas.width, canvas.height);
        }
        console.log("动画已停止");
    } else {
        // 启动动画
        animationRunning = true;
        console.log("动画已启动");
        
        // 如果是第一次运行，初始化
        if (!canvas) {
            initAnimation();
            
            // 窗口大小变化时重置

                window.addEventListener('resize', () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                cx = canvas.width / 2;
                cy = canvas.height / 2;
            });

        }
        
        // 开始动画循环
        loop();
    }
}

