import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

const Meta = ({
  title = "Welcome To techShop",
  description = "Discover top-quality products at unbeatable prices!",
  keywords = "electronics, buy electronics, cheap electronics",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

// Type checking
Meta.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
};

export default Meta;
