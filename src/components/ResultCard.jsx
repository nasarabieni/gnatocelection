import React from 'react';
import './ResultCard.css';

const ResultCard = ({ result, error }) => {
  if (error) {
    return (
      <div className="result-card error-card">
        <p>Your Staff ID was not found in the official GNATOC Election Register.
            If you you believe this is an error please visit the GNATOC Office from <span className="thank-you">Monday,
                6th July</span>, with your payslip and GNATOC receipt to have
            your name added to the register. Please note that failure to complete this
            process within the stipulated period will render you ineligible to participate in
            the upcoming GNATOC elections. Kindly treat this as an official notice
            and act promptly.<br /><span className="thank-you">Thank You.</span></p>
      </div>
    );
  }

  if (result) {
    return (
      <div className="result-card">
        <h3>Voter Found</h3>
        <p><strong>Name:</strong> {result.name}</p>
        <p><strong>Staff ID:</strong> {result.staff_id}</p>
        <p><strong>Level:</strong> {result.level}</p>
        <div className="success-message">
          You are registered in the election register!
        </div>
      </div>
    );
  }

  return null;
};

export default ResultCard;
