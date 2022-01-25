import { useState } from 'react';

const useFirebaseFetch = () => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    const resetState = () => {
        setLoading(true);
        setStatus('pending');
        setError(null);
    };

    const fetchData = async (queryFirebase, callback) => {
        resetState();
        try {
            const response = await queryFirebase;

            callback && callback(response);
            setStatus('success');
        } catch (err) {
            console.log(err);
            setError(err);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return { loading, status, error, fetchData, setError };
};

export default useFirebaseFetch;
