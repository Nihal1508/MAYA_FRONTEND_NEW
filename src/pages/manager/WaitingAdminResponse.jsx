import React from 'react'
import logo from "../../assets/images/maya-logo.png";
import { useEffect, useState } from 'react';
import { MdStarBorderPurple500 } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { checkRole } from '../../api/manager/role';
import { toast } from 'react-toastify';

function WaitingAdminResponse() {
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(async () => {
            await checkRole({
                onSuccess: (data) => {
                    if (data.role === 'manager') {
                        toast.success('Welcome to Maya');
                        navigate('/managerdashboard');
                    }
                },
                onError: (error) => {
                    console.error(error);
                }
            });
        }, 10000);

        return () => clearInterval(interval);
    }, [navigate]);
    return (
        <div className="bg-black text-white flex flex-col items-center p-44 gap-5 overflow-hidden">
            <img className='w-36' src={logo} alt="" />
            <h1 className='text-2xl mt-10'>Waiting for the approval of admin....</h1>
            <RandomStars />
        </div>
    )
}

export default WaitingAdminResponse

function RandomStars() {
    const [stars, setStars] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newStar = {
                id: Math.random(),
                top: Math.random() * 100 + 'vh',
                left: Math.random() * 100 + 'vw',
                size: Math.random() * 20 + 5 + 'px',
            };
            setStars((prevStars) => [...prevStars, newStar]);

            setTimeout(() => {
                setStars((prevStars) => prevStars.filter((star) => star.id !== newStar.id));
            }, Math.random() * 2000 + 1000);
        }, Math.random() * 1000 + 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {stars.map((star) => (
                <MdStarBorderPurple500
                    key={star.id}
                    style={{
                        position: 'absolute',
                        top: star.top,
                        left: star.left,
                        width: star.size,
                        height: star.size,
                        color: 'white',
                        animation: 'fade 1s ease-in-out',
                    }}
                />
            ))}
            <style>
                {`
                                @keyframes fade {
                                    0% { opacity: 0; }
                                    50% { opacity: 1; }
                                    100% { opacity: 0; }
                                }
                            `}
            </style>
        </>
    );
}
