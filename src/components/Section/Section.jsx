import './Section.scss';
import PropTypes from 'prop-types';

export const Section = ({ title, children }) => {
  return (
    <>
      <h2 className="Title">{title}</h2>
      {children}
    </>
  );
};

Section.protoType = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};
