import React from 'react';
import PropTypes from 'prop-types';
import './Filter.scss';

export const Filter = ({ value, onChange }) => (
  <label className="Filter__label">
    Фильтр по имени
    <input
      className="Filter__input"
      type="text"
      value={value}
      onChange={onChange}
    />
  </label>
);

Filter.protoType = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
