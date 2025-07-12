import styles from "./BenefitsSection.module.css";
import {
  FaShippingFast,
  FaToolbox,
  FaUndoAlt,
  FaHeadset,
} from "react-icons/fa";

export default function BenefitsSection() {
  const benefits = [
    {
      icon: <FaToolbox className={styles.icon} />,
      title: "Built to Last",
      description: "Industrial-grade tools engineered for endurance.",
    },
    {
      icon: <FaShippingFast className={styles.icon} />,
      title: "Fast Shipping",
      description: "Reliable delivery with full tracking across the country.",
    },
    {
      icon: <FaUndoAlt className={styles.icon} />,
      title: "Easy Returns",
      description: "Straightforward return policy with no hidden conditions.",
    },
    {
      icon: <FaHeadset className={styles.icon} />,
      title: "Expert Support",
      description: "Talk to people who actually use the tools we sell.",
    },
  ];

  return (
    <section className={styles.benefits}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Why Choose Lumen Tools?</h2>
        <div className={styles.items}>
          {benefits.map((benefit, index) => (
            <div key={index} className={styles.item}>
              {benefit.icon}
              <h3 className={styles.title}>{benefit.title}</h3>
              <p className={styles.description}>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
