import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './CreditCardValidator.css';

const banks = [
  'State Bank of India',
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'Punjab National Bank',
  'Bank of Baroda',
  'Canara Bank',
  'Kotak Mahindra Bank',
  'IndusInd Bank',
  'Yes Bank'
];

const CreditCardValidator = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [bankName, setBankName] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [isValidCardNumber, setIsValidCardNumber] = useState(null);

  const formatCardNumber = (number) => {
    return number.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  const validateCardNumber = (number) => {
    let nCheck = 0, nDigit = 0, bEven = false;
    number = number.replace(/\D/g, '');

    for (let n = number.length - 1; n >= 0; n--) {
      const cDigit = number.charAt(n);
      nDigit = parseInt(cDigit, 10);

      if (bEven && (nDigit *= 2) > 9) nDigit -= 9;
      nCheck += nDigit;
      bEven = !bEven;
    }

    return (nCheck % 10) === 0;
  };

  const handleCardNumberChange = (e) => {
    let { value } = e.target;
    value = value.replace(/\D/g, '').slice(0, 16); // Remove non-digits and limit to 16 digits
    setCardNumber(formatCardNumber(value));

    if (value.length === 16) {
      setIsValidCardNumber(validateCardNumber(value));
    } else {
      setIsValidCardNumber(null);
    }
  };

  const handleExpiryChange = (e) => {
    let { value } = e.target;
    value = value.replace(/\D/g, '').slice(0, 4); // Remove non-digits and limit to 4 digits
    if (value.length === 4) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    setExpiry(value);
  };

  const handleCvvChange = (e) => {
    let { value } = e.target;
    value = value.replace(/\D/g, '').slice(0, 3); // Remove non-digits and limit to 3 digits
    setCvv(value);
  };

  const handleBankNameChange = (e) => {
    setBankName(e.target.value);
  };

  const handleCardHolderChange = (e) => {
    setCardHolder(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform additional validation if needed

    // Show confirmation alert using SweetAlert2
    Swal.fire({
      icon: 'success',
      title: 'Card Verified Successfully!',
      showConfirmButton: false,
      timer: 1500
    });

    // Reset form fields
    setCardNumber('');
    setExpiry('');
    setCvv('');
    setBankName('');
    setCardHolder('');
    setIsValidCardNumber(null);
  };

  return (
    <div className="container">
      <h2>Credit Card Validator</h2>
      <div className="card-preview">
        <div className="card">
          <div className="card-bank">{bankName || 'Bank Name'}</div>
          <div className="card-number">{cardNumber.padEnd(19, '•')}</div>
          <div className="card-details">
            <div className="card-holder">{cardHolder || 'Card Holder'}</div>
            <div className="card-expiry">{expiry || 'MM/YY'}</div>
            <div className="card-cvv">{cvv.padEnd(3, '•')}</div>
          </div>
        </div>
      </div>
      <div className="form-container">
        <form className="credit-card-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Bank Name</label>
            <select
              value={bankName}
              onChange={handleBankNameChange}
              className="card-input"
              required
            >
              <option value="" disabled>Select Bank</option>
              {banks.map((bank) => (
                <option key={bank} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Card Number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="Enter credit card number"
              maxLength="19"
              className="card-input"
              required
            />
            {isValidCardNumber === false && (
              <div className="error-message">Invalid card number. Please type correct.</div>
            )}
          </div>
          <div className="form-group">
            <label>Expiry Date</label>
            <input
              type="text"
              value={expiry}
              onChange={handleExpiryChange}
              placeholder="MMYY"
              maxLength="5"
              className="card-input"
              required
            />
          </div>
          <div className="form-group">
            <label>CVV</label>
            <input
              type="password"
              value={cvv}
              onChange={handleCvvChange}
              placeholder="CVV"
              maxLength="3"
              className="card-input"
              required
            />
          </div>
          <div className="form-group">
            <label>Card Holder Name</label>
            <input
              type="text"
              value={cardHolder}
              onChange={handleCardHolderChange}
              placeholder="Card Holder Name"
              className="card-input"
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreditCardValidator;
