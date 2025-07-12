import styles from "./TestimonialsSection.module.css";

const testimonials = [
  {
    quote:
      "“Solid tools at a fair price. I've been using their wrenches and sockets daily, and they've held up better than most big brands.”",
    author: "— Marcos D., Automotive Technician",
  },
  {
    quote:
      "“Great customer service and fast delivery. I had a minor issue with one item, and they resolved it within hours.”",
    author: "— Lucia P., Construction Manager",
  },
  {
    quote:
      "“Their team really knows what they're selling. The support I got before choosing my toolset was excellent.”",
    author: "— Sebastián M., Independent Contractor",
  },
];

export default function TestimonialsSection() {
  return (
    <section className={styles.testimonials}>
      <div className={styles.container}>
        <h2 className={styles.heading}>What Our Customers Say</h2>
        <div className={styles.cards}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={styles.card}>
              <p className={styles.quote}>{testimonial.quote}</p>
              <p className={styles.author}>{testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
