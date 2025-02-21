import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome To TechShop",
  description: "Discover top-quality products at unbeatable prices!",
  keywords: "electronics, buy electronics, cheap electronics",
};

// Type checking
Meta.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
};

export default Meta;
