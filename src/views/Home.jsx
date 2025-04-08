import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
    const { currentUser } = useContext(AuthContext);
    const isLoggedIn = !!currentUser;

    const [hasPermission, setHasPermission] = useState(null);
    const [cameraActive, setCameraActive] = useState(false);
    const [useBackCamera, setUseBackCamera] = useState(true);
    const videoRef = useRef(null);

    useEffect(() => {
        console.log("État de la caméra:", cameraActive);
        console.log("Référence vidéo:", videoRef.current);
        if (videoRef.current) {
            console.log("Source vidéo:", videoRef.current.srcObject);
        }
    }, [cameraActive]);

    const requestCameraPermission = async () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            console.error(error);
            setHasPermission(false);
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: useBackCamera ? 'environment' : 'user' }
            });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.onloadedmetadata = () => {
                    videoRef.current.play();
                };
            }

            setHasPermission(true);
            setCameraActive(true);
        } catch (err) {
            console.error("Erreur lors de l'accès à la caméra:", err);
            setHasPermission(false);
        }
    };

    const stopCamera = () => {
        console.log("Arrêt");
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
            setCameraActive(false);
        }
    };

    const userDisplayName = currentUser?.email || currentUser?.displayName || currentUser;

    return (
        <div className="container mt-5">
            <div className="jumbotron">
                <h1 className="text-center mb-4">Welcome to my app</h1>
                {!isLoggedIn ? (
                    <div className="text-center">
                        <p>Please log in</p>
                        <Link to="/login" className="btn btn-primary">Login</Link>
                        <Link to="/register" className="btn btn-secondary ms-2">Register</Link>
                    </div>
                ) : (
                    <div className="text-center">
                        <p>You are logged in as {userDisplayName}</p>

                        <div className="mt-4">
                            <h1>Scanner</h1>

                            {hasPermission === false && (
                                <div className="alert alert-danger">
                                    Accès refusé
                                </div>
                            )}

                            <div className="camera-container" style={{ maxWidth: '500px', margin: '0 auto' }}>
                                {cameraActive && (
                                    <div className="video-wrapper" style={{
                                        border: '1px solid #ccc',
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        marginBottom: '15px',
                                        backgroundColor: '#f0f0f0',
                                        minHeight: '300px'
                                    }}>
                                        <video
                                            ref={videoRef}
                                            style={{
                                                width: '100%',
                                                height: 'auto',
                                                display: 'block',
                                                backgroundColor: '#000'
                                            }}
                                            autoPlay
                                            playsInline
                                            muted
                                        />
                                    </div>
                                )}

                                {cameraActive ? (
                                    <button
                                        className="btn btn-danger mt-3"
                                        onClick={stopCamera}
                                    >
                                        Arrêter la caméra
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            className="btn btn-primary"
                                            onClick={requestCameraPermission}
                                        >
                                            Activer la caméra
                                        </button>
                                        <button
                                            className="btn btn-secondary ms-2"
                                            onClick={() => setUseBackCamera(!useBackCamera)}
                                        >
                                            Utiliser la caméra {useBackCamera ? 'frontale' : 'arrière'}
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
