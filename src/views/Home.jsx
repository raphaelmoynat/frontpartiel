import React, { useState, useRef, useEffect } from 'react';

const CameraComponent = () => {
    const [cameraActive, setCameraActive] = useState(false)
    const [useBackCamera, setUseBackCamera] = useState(true)
    const videoRef = useRef(null)

    useEffect(() => {
        return () => stopCamera();
    }, [])

    const startCamera = async () => {

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: useBackCamera ? 'environment' : 'user' }
            })

            if (videoRef.current) {
                videoRef.current.srcObject = stream
                videoRef.current.onloadedmetadata = () => {
                    videoRef.current.play()
                }
            }

            setCameraActive(true)
        } catch (error) {
            console.error(error)
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks()
            tracks.forEach(track => track.stop())
            videoRef.current.srcObject = null
        }
        setCameraActive(false)
    }

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h1>Scanner</h1>

            <div style={{
                maxWidth: '500px',
                margin: '0 auto',
                border: '1px solid #ccc',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: '#000',
                minHeight: '300px',
            }}>
                <video
                    ref={videoRef}
                    style={{
                        width: '100%',
                        height: 'auto',
                        display: cameraActive ? 'block' : 'none',
                    }}
                    autoPlay
                    playsInline
                    muted
                />
                {!cameraActive && (
                    <div style={{
                        color: '#fff',
                        padding: '20px',
                        textAlign: 'center',
                        fontSize: '16px',
                    }}>
                        La caméra est désactivée.
                    </div>
                )}
            </div>

            <div style={{ marginTop: '20px' }}>
                {cameraActive ? (
                    <button
                        style={{
                            padding: '10px 20px',
                            backgroundColor: 'red',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                        onClick={stopCamera}
                    >
                        Arrêter la caméra
                    </button>
                ) : (
                    <>
                        <button
                            style={{
                                padding: '10px 20px',
                                backgroundColor: 'blue',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                marginRight: '10px',
                            }}
                            onClick={startCamera}
                        >
                            Activer la caméra
                        </button>
                        <button
                            style={{
                                padding: '10px 20px',
                                backgroundColor: 'grey',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                            onClick={() => setUseBackCamera(!useBackCamera)}
                        >
                            Utiliser la caméra {useBackCamera ? 'frontale' : 'arrière'}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default CameraComponent;
