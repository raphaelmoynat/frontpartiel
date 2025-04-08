import React, { useRef, useEffect, useState } from 'react';
import jsQR from 'jsqr';

const QRCodeScanner = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [qrContent, setQRContent] = useState(null);

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: 'environment',
                        width: { ideal: 640 },
                        height: { ideal: 480 },
                        frameRate: { ideal: 15 },
                    },
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error(error);
            }
        };

        startCamera();

        const interval = setInterval(() => {
            scanQRCode();
        }, 500);

        return () => clearInterval(interval);
    }, []);

    const scanQRCode = () => {
        if (canvasRef.current && videoRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            if (context) {
                context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, imageData.width, imageData.height);
                if (code) {
                    setQRContent(code.data);
                    console.log(code.data);
                } else {
                    setQRContent(null);
                }
            }
        }
    };

    return (
        <div>
            <div style={{ width: '320px', height: '240px' }}>
                <video ref={videoRef} width="320" height="240" autoPlay />
                <canvas ref={canvasRef} width="320" height="240" />
            </div>
            {qrContent && (
                <div>
                    <p>{qrContent}</p>
                </div>
            )}
        </div>
    );
};

export default QRCodeScanner;
