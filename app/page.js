// import Image from "next/image";
// import styles from "./page.module.css";
// import Link from "next/link";


// export default function Home() {
//   console.log("hi")
//   return (
//    <main>
//     <h1>welcome to this react course</h1>
//     <p>let &apos; s get started</p>
//     <p><Link href="/about">About Us</Link></p> {/* way to create a link same page mah basera arko page mah jani technique jasley page refresh handaina*/}
//    </main>
//   );
// }



//project-03
import Link from 'next/link';
import classes from './page.module.css'
import ImageSlideshow from '@/components/images/image-slideshow';

export default function Home() {
  return (
    <>
      <header className={classes.header}>
        <div className={classes.slideshow}>
          <ImageSlideshow />
        </div>
        <div>
          <div className={classes.hero}>
            <h1>Discover, Cook & Share Amazing Recipes</h1>
            <p>Explore thousands of delicious recipes from around the world, save your favorites, and share your culinary creations with our vibrant community</p>
          </div>
          <div className={classes.cta}>
            <Link href="/meals" className={classes.ctaPrimary}>
              🔍 Explore Recipes
            </Link>
            <Link href="/community" className={classes.ctaSecondary}>
              👥 Join Community
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* How It Works Section */}
        <section className={classes.section}>
          <div className={classes.sectionHeader}>
            <h2>🍳 How It Works</h2>
            <p className={classes.sectionSubtitle}>Your journey to becoming a master chef starts here</p>
          </div>
          
          <div className={classes.featuresGrid}>
            <div className={classes.featureCard}>
              <div className={classes.featureIcon}>🔍</div>
              <h3>Search & Discover</h3>
              <p>Browse through thousands of recipes from cuisines around the world. Use our smart search to find exactly what you're craving, filter by ingredients, cooking time, or dietary preferences.</p>
            </div>

            <div className={classes.featureCard}>
              <div className={classes.featureIcon}>📖</div>
              <h3>Cook with Confidence</h3>
              <p>Follow step-by-step instructions with our interactive cooking mode. Set timers for each step, check off ingredients as you go, and never lose your place in the recipe.</p>
            </div>

            <div className={classes.featureCard}>
              <div className={classes.featureIcon}>💾</div>
              <h3>Save Your Favorites</h3>
              <p>Create your personal recipe collection by saving dishes you love. Build custom meal plans, generate shopping lists, and access your favorites anytime, anywhere.</p>
            </div>

            <div className={classes.featureCard}>
              <div className={classes.featureIcon}>🛒</div>
              <h3>Smart Shopping Lists</h3>
              <p>Automatically generate shopping lists from recipes. Check off items as you shop, and never forget an ingredient again. Perfect for meal planning and grocery trips.</p>
            </div>

            <div className={classes.featureCard}>
              <div className={classes.featureIcon}>⭐</div>
              <h3>Rate & Review</h3>
              <p>Share your cooking experience with the community. Rate recipes, leave helpful tips, and read reviews from other home cooks to find the best dishes.</p>
            </div>

            <div className={classes.featureCard}>
              <div className={classes.featureIcon}>👨‍🍳</div>
              <h3>Share Your Recipes</h3>
              <p>Got a family secret or creative invention? Share your own recipes with the community and inspire others with your culinary creations.</p>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className={classes.section}>
          <div className={classes.sectionHeader}>
            <h2>🌟 Why Choose Our Recipe Platform</h2>
            <p className={classes.sectionSubtitle}>More than just recipes - it's your complete cooking companion</p>
          </div>

          <div className={classes.benefitsGrid}>
            <div className={classes.benefitItem}>
              <span className={classes.benefitNumber}>01</span>
              <div>
                <h3>Cooking Mode</h3>
                <p>Hands-free cooking with voice-activated timers and large, easy-to-read instructions. Perfect for keeping your device clean while you cook!</p>
              </div>
            </div>

            <div className={classes.benefitItem}>
              <span className={classes.benefitNumber}>02</span>
              <div>
                <h3>Nutritional Information</h3>
                <p>Make informed choices with detailed nutrition facts for every recipe. Track calories, protein, carbs, and more to support your health goals.</p>
              </div>
            </div>

            <div className={classes.benefitItem}>
              <span className={classes.benefitNumber}>03</span>
              <div>
                <h3>Global Cuisine</h3>
                <p>From Italian pasta to Thai curries, Mexican tacos to Japanese sushi - explore authentic recipes from every corner of the world.</p>
              </div>
            </div>

            <div className={classes.benefitItem}>
              <span className={classes.benefitNumber}>04</span>
              <div>
                <h3>Time-Saving Filters</h3>
                <p>Short on time? Filter recipes by preparation time, from quick 15-minute meals to elaborate weekend projects. Find exactly what fits your schedule.</p>
              </div>
            </div>

            <div className={classes.benefitItem}>
              <span className={classes.benefitNumber}>05</span>
              <div>
                <h3>Dietary Preferences</h3>
                <p>Whether you're vegetarian, vegan, gluten-free, or following any special diet, easily find recipes that match your lifestyle and preferences.</p>
              </div>
            </div>

            <div className={classes.benefitItem}>
              <span className={classes.benefitNumber}>06</span>
              <div>
                <h3>Community Driven</h3>
                <p>Join thousands of passionate home cooks sharing tips, variations, and success stories. Learn from each other and grow your culinary skills together.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
