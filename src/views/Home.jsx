import React, { useRef, useState, useEffect } from 'react'
import jsQR from 'jsqr'

function QRCodeScanner() {
    const videoRef = useRef(null)
    const canvasRef = useRef(null)
    const [result, setResult] = useState("")
    const [scanning, setScanning] = useState(false)

    useEffect(() => {
        async function startCamera() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: "environment" }
                })

                videoRef.current.srcObject = stream
                videoRef.current.onloadedmetadata = () => {
                    videoRef.current.play()
                    setScanning(true)
                }
            } catch (error) {
                console.log(error)
            }
        }

        startCamera()

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop())
            }
        }
    }, [])

    useEffect(() => {
        let frameId

        function scanQR() {
            if (!scanning) return

            if (videoRef.current && canvasRef.current) {
                const video = videoRef.current
                const canvas = canvasRef.current

                canvas.width = video.videoWidth
                canvas.height = video.videoHeight

                const ctx = canvas.getContext('2d')
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

                const code = jsQR(imageData.data, imageData.width, imageData.height)
                if (code) {
                    setResult(code.data)
                }
            }

            frameId = requestAnimationFrame(scanQR)
        }

        if (scanning) {
            frameId = requestAnimationFrame(scanQR)
        }

        return () => {
            if (frameId) {
                cancelAnimationFrame(frameId)
            }
        }
    }, [scanning])


    return (
        <div>
            <div style={{ position: "relative" }}>
                <video
                    ref={videoRef}
                    style={{ width: "100%", maxWidth: "400px" }}
                    playsInline
                />
                <canvas
                    ref={canvasRef}
                    style={{ display: "none" }}
                />
            </div>

            <div style={{ marginTop: "20px" }}>
                <h3>QR Code Result:</h3>
                {result ? (
                    <p>{result}</p>
                ) : (
                    <p>QR code</p>
                )}
            </div>
        </div>
    )
}

export default QRCodeScanner
