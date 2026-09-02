import type { Metadata } from "next";
import { BrandAtmosphere } from "@/components/BrandAtmosphere";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { EMAIL } from "@/lib/site";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact | Execution Labs",
  description:
    "Start a project with Execution Labs. Tell us what you want to build and we will make the first version real.",
};

export default function ContactPage() {
  return (
    <section className={`section-flow section-flow--fade relative overflow-hidden ${styles.page}`}>
      <BrandAtmosphere intensity="section" tone="fade" focus="right" />
      <Container className={`relative z-10 ${styles.container}`}>
        <div className={styles.layout}>
          <div className={styles.intro}>
            <Reveal>
              <span className={styles.eyebrow}>
                Contact
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className={styles.title}>
                Start a project
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className={styles.lede}>Tell us what you’re building and where the bottleneck is.</p>
            </Reveal>

            <Reveal delay={0.15}>
              <a href={`mailto:${EMAIL}`} className={styles.email}>
                {EMAIL}
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.1} className={styles.formReveal}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
