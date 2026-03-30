"use client";
import HeroCarousel from '@/components/HeroCarousel';
import ProgramsSection from '@/components/ProgramsSection';
import VolunteerCTA from '@/components/VolunteerCTA';
import HallOfFame from '@/components/HallOfFame';
import GalleryPreview from '@/components/GalleryPreview';
import PartnersCarousel from '@/components/PartnersCarousel';
import ContactForm from '@/components/ContactForm';

export default function Home() {
  return (
    <>
    <HeroCarousel />
      <ProgramsSection />
      <VolunteerCTA />
      <HallOfFame />
      <GalleryPreview />
      <PartnersCarousel />
      <ContactForm />
    </>
  );
}
