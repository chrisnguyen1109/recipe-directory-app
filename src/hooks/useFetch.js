import { useEffect, useState } from 'react';

const useFetch = () => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    const controller = new AbortController();

    const resetState = () => {
        setLoading(true);
        setStatus('pending');
        setError(null);
    };

    const fetchData = async ({ url, method = 'GET', ...configs }, callback) => {
        resetState();
        try {
            const response = await fetch(url, {
                method,
                ...configs,
                signal: controller.signal,
            });

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();

            callback(data);
            setStatus('success');
        } catch (err) {
            console.error(err);
            setError(err);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        return () => {
            controller.abort();
        };
    }, []);

    return { loading, status, error, fetchData };
};

export default useFetch;
