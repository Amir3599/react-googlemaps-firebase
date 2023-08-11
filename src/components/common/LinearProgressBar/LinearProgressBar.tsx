import React, { useEffect, useState } from 'react';

const LinearProgressBar: React.FC = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate progress update for demonstration purposes
        const interval = setInterval(() => {
            setProgress((prevProgress) => (prevProgress < 100 ? prevProgress + 10 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-gray-200 w-full h-4 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full" style={{ width: `${progress}%` }}></div>
        </div>
    );
};

export default LinearProgressBar;
