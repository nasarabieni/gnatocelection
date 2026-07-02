import {useState} from 'react';
import {uploadElectionRegister} from '../services/api';
import './ImportData.css';

const ImportData = () => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState(null);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
            setSummary(null);
            setError('');
        }
    };

    const handleImport = async () => {
        if (!file) {
            setError('Please select a file to import');
            return;
        }

        setLoading(true);
        setError('');
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await uploadElectionRegister(formData);

            setSummary(response.data);
            setFile(null);
            setFileName('');
        } catch (err) {
            const errorMsg = err.response?.data?.error || 'Failed to import data';
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <p>Election Register Import</p>
            <div className="form-section">
                <label>Select Excel File:</label>
                <div className="file-upload-wrapper">
                    <input
                        type="file"
                        accept=".xlsx,.xls"
                        onChange={handleFileChange}
                        disabled={loading}
                        className="file-input"
                        id="file-upload"
                    />
                    <label htmlFor="file-upload" className="file-upload-label">
                        {fileName || 'Choose File'}
                    </label>
                </div>
                <button
                    onClick={handleImport}
                    disabled={loading || !file}
                >
                    {loading ? 'Importing...' : 'Import Data'}
                </button>
            </div>

            {error && (
                <div className="error-message">
                    <p>{error}</p>
                </div>
            )}

            {summary && (
                <div className="result-card">
                    <h3>Import Summary</h3>
                    <div className="summary-table">
                        <div className="summary-row">
                            <span className="summary-label">Total Processed:</span>
                            <span className="summary-value">{summary.total_processed}</span>
                        </div>
                        <div className="summary-row">
                            <span className="summary-label">Created:</span>
                            <span className="summary-value">{summary.created}</span>
                        </div>
                        <div className="summary-row">
                            <span className="summary-label">Updated:</span>
                            <span className="summary-value">{summary.updated}</span>
                        </div>
                        <div className="summary-row">
                            <span className="summary-label">Skipped:</span>
                            <span className="summary-value">{summary.skipped}</span>
                        </div>
                    </div>
                    {summary.errors && summary.errors.length > 0 && (
                        <div className="errors-section">
                            <h4>Errors ({summary.errors.length}):</h4>
                            <ul className="errors-list">
                                {summary.errors.slice(0, 10).map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                                {summary.errors.length > 10 && (
                                    <li>...and {summary.errors.length - 10} more errors</li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ImportData;
