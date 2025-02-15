import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.propTypes = {
  title: "Welcome To techShop",
  description: "Discover top-quality products at unbeatable prices!",
  keywords: "electronics, buy electronics, cheap electronics",
};

export default Meta;
