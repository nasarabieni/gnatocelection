import {useState} from 'react';
import Header from '../components/Header';
import SearchCard from '../components/SearchCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ResultCard from '../components/ResultCard';
import {checkElectionRegister} from '../services/api';
import './Home.css';

const Home = () => {
    const [staffId, setStaffId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [inputError, setInputError] = useState(null);

    const isValidStaffId = /^\d{6,7}$/.test(staffId);

    const handleVerify = async () => {
        if (!staffId.trim()) {
            setInputError('Please enter a Staff ID');
            return;
        }

        if (!isValidStaffId) {
            setInputError('Staff ID must be 6-7 digits');
            return;
        }

        setInputError(null);
        setError(null);
        setResult(null);
        setIsLoading(true);

        try {
            const response = await checkElectionRegister(staffId.trim());

            if (response.data && response.data.found) {
                setResult({
                    name: response.data.fullname,
                    staff_id: response.data.staff_id,
                    level: response.data.level,
                });
            } else {
                setError('not_found');
            }
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setError('not_found');
            } else if (err.code === 'ECONNABORTED') {
                setError('timeout');
            } else if (!err.response) {
                setError('network');
            } else {
                setError('server');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const getErrorMessage = () => {
        switch (error) {
            case 'not_found':
                return null;
            case 'timeout':
                return 'Request timed out. Please try again.';
            case 'network':
                return 'Network error. Please check your connection.';
            case 'server':
                return 'Server error. Please try again later.';
            default:
                return 'An unexpected error occurred.';
        }
    };

    return (
        <div className="container">
            <Header/>
            <p className="subtitle">OFFICE OF THE ELECTORAL COMMISSION</p>
            <p className="subtitle2">VOTER EXHIBITION</p>

            <SearchCard
                staffId={staffId}
                setStaffId={setStaffId}
                onVerify={handleVerify}
                isLoading={isLoading}
                error={inputError}
                isValid={isValidStaffId}
            />

            {isLoading && <LoadingSpinner/>}

            {inputError && (
                <div className="error-message">
                    <p>{inputError}</p>
                </div>
            )}

            {!isLoading && (result || error) && (
                <ResultCard result={result} error={error === 'not_found' ? error : null}/>
            )}

            {!isLoading && error && error !== 'not_found' && (
                <div className="error-message">
                    <p>{getErrorMessage()}</p>
                </div>
            )}
        </div>
    );
};

export default Home;
