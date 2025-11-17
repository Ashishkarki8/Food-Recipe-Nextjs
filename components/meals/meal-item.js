import Image from 'next/image';
import Link from 'next/link';

import classes from './meal-item.module.css';


export default function MealItem({ title, slug, image, summary, creator }) {
  // console.log(slug);
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>  {/* width={} height={} noneed */}
          <Image src={image} alt={title} fill />  {/* fill ko satta height width dina milcha */}
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link> {/* it is joined to [mealslug] */}
        </div>
      </div>
    </article>
  );
}
