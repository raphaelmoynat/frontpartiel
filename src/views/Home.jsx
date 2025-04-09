import React, {useRef, useState, useEffect, useContext,} from 'react'
import jsQR from 'jsqr'
import {CartContext} from "../context/CartContext.jsx";


function Home() {
    const videoRef = useRef(null)
    const canvasRef = useRef(null)
    const [result, setResult] = useState("")
    const [scanning, setScanning] = useState(false)
    const [cameraActive, setCameraActive] = useState(false)
    const [product, setProduct] = useState(null)
    const { addToCart } = useContext(CartContext)

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "environment" }
            })
            videoRef.current.srcObject = stream
            videoRef.current.onloadedmetadata = () => {
                videoRef.current.play()
                setScanning(true)
                setCameraActive(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop())
            videoRef.current.srcObject = null
            setScanning(false)
            setCameraActive(false)
        }
    }

    useEffect(() => {
        return () => {
            stopCamera()
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

                const context = canvas.getContext('2d')
                context.drawImage(video, 0, 0, canvas.width, canvas.height)
                const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
                const code = jsQR(imageData.data, imageData.width, imageData.height)
                if (code) {
                    setResult(code.data)
                    const parsedData = JSON.parse(code.data)
                    setProduct(parsedData)

                    startCamera();

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

    const handleAddToCart = () => {
        if (product) {
            addToCart(product)
            alert(`${product.name} ajouté au panier`)

            startCamera();

        }
    }

    return (
        <div className="container my-4">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow mb-4">
                        <div className="card-header text-center d-flex justify-content-center align-items-center">
                            <h4 className="mb-0">Scanner QR Code</h4>
                        </div>

                        <div className="card-body">
                            <div className="text-center mb-3">
                                <div className="position-relative d-inline-block">
                                    <video ref={videoRef}
                                           playsInline
                                           muted
                                           autoPlay
                                           className="rounded border" style={{ width: "100%", maxWidth: "400px", background: "black" }}/>
                                    <canvas ref={canvasRef} style={{ display: "none" }}/>
                                </div>
                            </div>

                            <div className="d-grid">
                                <button className={`btn ${cameraActive ? 'btn-danger' : 'btn-success'} btn-lg`} onClick={cameraActive ? stopCamera : startCamera}>
                                    {cameraActive ? 'Eteindre' : 'Allumer '}
                                </button>
                            </div>
                        </div>
                    </div>
                    {product && (
                        <div className="card ">
                            <div className="card-header text-center">
                                <h5>Produit scanné</h5>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title text-center">{product.name}</h3>
                                <h4 className="text-success text-center">{product.price} €</h4>
                            </div>
                            <div className="card-footer">
                                <div className="d-grid">
                                    <button className="btn btn-primary" onClick={handleAddToCart}>Ajouter au panier</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home
