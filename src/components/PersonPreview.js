import React from 'react';

const PersonPreview = ({ personData, header }) => {
  if (!personData) return null;

  return (
    <div className="people__info">
      <h6>{header}</h6>
      <img className="people__avatar" src={personData.avatar} alt="Avatar" />
      <p>{personData.name}</p>
      {personData.company && <p className="people__company">{personData.company.name}</p>}
    </div>
  );
};

export default PersonPreview;
