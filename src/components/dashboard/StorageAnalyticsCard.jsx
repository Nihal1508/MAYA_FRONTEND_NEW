import React, { useEffect, useRef } from 'react';

function StorageAnalyticsCard() {

    return (
        <div className="bg-[#0B0B0B] relative rounded-2xl p-9 w-80 overflow-clip">
            <div className='z-10 absolute left-9 flex flex-col items-start text-left'>
                <h3 className="text-lg font-semibold mb-5">Storage</h3>
                <p className='font-light text-sm'>Total<br /> <strong className='text-lg font-semibold'>10 GB</strong> used</p>
                <p className='font-light text-sm'>Clustered<br /> <strong className='text-lg font-semibold'>32434</strong> images</p>
            </div>
            <SmoothWaveAnimation />
        </div>

    )
}

const SmoothWaveAnimation = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let time = 0;

        // Set canvas dimensions
        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Animation function
        const render = () => {
            time += 0.007;

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Create gradient
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, '#BB92FF');
            gradient.addColorStop(1, '#6158992f');

            // Draw wave
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(0, canvas.height * 0.4); // Start position

            for (let x = 0; x < canvas.width; x++) {
                // Create multiple overlapping sine waves for more natural movement
                const y1 = Math.sin(x * 0.01 + time) * canvas.height * 0.05;
                const y2 = Math.sin(x * 0.02 - time * 1.5) * canvas.height * 0.025;
                const y3 = Math.sin(x * 0.005 + time * 0.8) * canvas.height * 0.03;

                const y = canvas.height * 0.4 + y1 + y2 + y3;
                ctx.lineTo(x, y);
            }

            // Complete the shape
            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(0, canvas.height);
            ctx.closePath();
            ctx.fill();

            animationFrameId = window.requestAnimationFrame(render);
        };

        render();

        return () => {
            window.cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <div className="w-full h-10/12 z-0 absolute left-0 bottom-0 bg-transparent flex items-center justify-center overflow-hidden">
            <canvas
                ref={canvasRef}
                className="w-full h-full"
            />
        </div>
    );
};


export default StorageAnalyticsCard
