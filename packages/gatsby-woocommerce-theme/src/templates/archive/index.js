import React from "react";
import Search from "../../components/home/search";
import { isEmpty } from "lodash";
import Layout from "../../components/layout";
import Carousel from "../../components/home/carousel";
import SEO from "../../components/seo";
import { getOgImage } from "../../utils/functions";
import Aside from "../../components/aside";
import "./style.scss"
const ArchivePage = (props) => {
  const {
    pageContext: {
      categories,
      category,
      category: { name, seo, uri },
      postSearchData: { products, options },
    },
  } = props;

  return (
    <Layout>
      <div className="page-container container py-5 products-ary">
        {!isEmpty(name) ? <h2>{name}</h2> : null}
        <div className="row">
          <main className="page-content col-md-9">
            {!isEmpty(props.pageContext) && category.products.nodes.length ? (
              <>
                {/* <SEO
							title={ name }
							seoData={ seo }
							uri={ uri }
							header={ { siteTitle: 'Gatsby WooCommerce Theme' } }
							openGraphImage={ getOgImage( seo ) }
						/> */}
                {/* <Carousel categories={ categories }/> */}

                <Search
				  classes="col-lg-4 col-md-6 mb-5"
                  searchdisable={true}
                  products={products}
                  initialProducts={category.products.nodes}
                  engine={options}
                  category={category}
                  categories={categories}
                />
              </>
            ) : (
              <div>No data found</div>
            )}
          </main>
		   <Aside categories={ categories.nodes }/>
        </div>
      </div>
    </Layout>
  );
};
export default ArchivePage;
