import React from "react";
import Search from "../../components/home/search";
import { isEmpty } from 'lodash';
import Layout from "../../components/layout";
import HomeBanner from "../../components/home/banner";
import HomeFeature from "../../components/home/featured";
import HomePlan from "../../components/home/plan";
import Subscribe from "../../components/home/subscribe";
import SEO from "../../components/seo";
import { getOgImage } from "../../utils/functions";

const FrontPage = ( props ) => {

	const {
		      pageContext: {
			    //   page: { title, seo, uri },
			      categories,
			      categoryName,
			      postSearchData: { products, options }
		      }
	      } = props;


		
		  
		  
	return (
		<Layout>
			{
				! isEmpty( props.pageContext ) ? (
					<>
					    
						{/* <SEO
							title={ title }
							seoData={ seo }
							uri={ uri }
							header={ { siteTitle: 'Sergio Marketplace' } }
							openGraphImage={ getOgImage( seo ) }
						/> */}
						{/* <Carousel categories={ categories }/> */}
					
						<HomeBanner data={props.pageContext ? props.pageContext.page.wpHomeQuery : null}/>

						<HomeFeature data={props.pageContext ? props.pageContext.page.wpHomeQuery : null}/>

						<HomePlan data={props.pageContext ? props.pageContext.page.wpHomeQuery : null}/>

						 <Search
						 	data={props.pageContext ? props.pageContext.page.wpHomeQuery : null}
							products={ products }
							initialProducts={ products }
							engine={ options }
							category={ categoryName }
							categories={ categories }
						/>


						<Subscribe data={props.pageContext ? props.pageContext.page.wpHomeQuery : null}/>
					</>
				) : (
					<div>Something went wrong</div>
				)
			}
		</Layout>
	)
};
export default FrontPage;

